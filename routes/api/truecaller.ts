const express = require("express");
const router = express.Router();

/**
 * Test
 */
router.get("/", (req: any, res: any) => {
  res.json({ message: "API Is Working Fine" });
});

module.exports = router;
