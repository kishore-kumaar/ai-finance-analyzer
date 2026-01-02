const express = require("express");
const { getInsights } = require("../controllers/insightController");

const router = express.Router();

router.get("/:userId", getInsights);

module.exports = router;
