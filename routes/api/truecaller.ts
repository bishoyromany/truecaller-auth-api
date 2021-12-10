const express = require("express");
const router = express.Router();
const axios = require("axios");
const models: { User: any; AuthAttempt: any } = require("./../../models");

/**
 * Test API
 */
router.get("/", (req: any, res: any) => {
  res.json({
    message: "Truecaller API Is Working Fine",
    usefulURLs: {
      auth: {
        url:
          "https://" +
          req.headers.host +
          "/api/truecaller/auth?token=" +
          process.env.API_KEY,
        method: "POST",
      },
      user: {
        url: "https://" + req.headers.host + "/api/truecaller/user/:requestId",
        method: "GET",
      },
      truecallerDev: "https://developer.truecaller.com/",
      apiRepo: "https://github.com/bishoyromany/truecaller-auth-api",
    },
  });
});

/**
 * Auth Call Back URL
 */
router.post("/auth", async (req: any, res: any) => {
  const { requestId, accessToken, endpoint } = req.body;

  if (!requestId || !accessToken || !endpoint) {
    return res.json({ message: "Verification Failed" });
  }

  /**
   * Get User Info
   */
  const response = await axios.get(endpoint, {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  const { status, data } = response;

  if (status !== 200) {
    return res.json({ message: "Unauthorized" });
  }

  /**
   * Store User Auth Attempt Information
   */
  const saveData = {
    body: req.body,
    user: data,
    requestId,
    isUsed: false,
    phoneNumber: data?.phoneNumbers[0],
  };

  const AuthAttempt = await models.AuthAttempt.create(saveData);
  res.status(201).json(AuthAttempt);
});

/**
 * Get User Info
 */
router.get("/user/:requestId", async (req: any, res: any) => {
  const { requestId } = req.params;

  /**
   * Get Login Attempt Information
   */
  const AuthAttempt = await models.AuthAttempt.findOne({
    requestId,
    isUsed: false,
  });

  /**
   * Mark Attempt As Used If Found Esle Return Unauthorized
   */
  if (AuthAttempt) {
    AuthAttempt.isUsed = true;
    AuthAttempt.save();
  } else {
    return res.status(400).json({ message: "Verification Failed" });
  }

  /** Get User Information Using Phone Number */
  const { phoneNumber } = AuthAttempt;
  const user = await models.User.findOne({
    phoneNumber: "+" + phoneNumber,
  });

  /** User Not Found */
  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }

  res.status(200).json(user);
});

module.exports = router;
