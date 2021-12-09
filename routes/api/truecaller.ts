const express = require("express");
const router = express.Router();
const axios = require("axios");

/**
 * Test API
 */
router.get("/", (req: any, res: any) => {
  res.json({ message: "API Is Working Fine" });
});

/**
 * Auth URL
 */
router.post("/auth", async (req: any, res: any) => {
  console.log(req.query, req.body);
  const { requestId, accessToken, endpoint } = req.body;

  if (!requestId || !accessToken || !endpoint) {
    res.json({ message: "Verification Failed" });
  }

  const response = await axios.get(endpoint, {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  const { status, data } = response;

  if (status !== 200) {
    res.json({ message: "Unauthorized" });
  }

  console.log(data);

  // .then((r: any) => {
  //   console.log(r.data);
  //   res.json({ message: "Verification Success" });
  // })
  // .catch((e: any) => {
  //   res.json({ message: "Verification Failed" });
  // });
});

module.exports = router;
