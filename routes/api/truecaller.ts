const express = require("express");
const router = express.Router();
const axios = require("axios");
const models: { User: any; AuthAttempt: any } = require("./../../models");

/**
 * Test API
 */
router.get("/", (req: any, res: any) => {
  res.json({ message: "API Is Working Fine" });
});

/**
 * Auth Call Back URL
 */
router.post("/auth", async (req: any, res: any) => {
  console.log(req.query, req.body);
  const { requestId, accessToken, endpoint } = req.body;

  if (!requestId || !accessToken || !endpoint) {
    res.json({ message: "Verification Failed" });
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
    res.json({ message: "Unauthorized" });
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
  res.json(AuthAttempt);
});

module.exports = router;
