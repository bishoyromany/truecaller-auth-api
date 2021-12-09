const express = require("express");
const router = express.Router();

/**
 * Test API
 */
router.get("/", (req: any, res: any) => {
  res.json({ message: "API Is Working Fine" });
});

/**
 * Auth URL
 */
router.get("/auth", (req: any, res: any) => {
  console.log(req.query);
  res.json({ message: "API Is Working Fine" });
});

/**
 * Auth URL
 */
router.post("/auth", (req: any, res: any) => {
  console.log(req.query);
  res.json({ message: "API Is Working Fine" });
});

module.exports = router;
