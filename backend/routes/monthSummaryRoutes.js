const express = require("express");
const {
  getMonthSummary,
} = require("../controllers/monthSummaryController");

const router = express.Router();

// GET /api/summary/:userId/:year/:month
router.get("/:userId/:year/:month", getMonthSummary);

module.exports = router;
