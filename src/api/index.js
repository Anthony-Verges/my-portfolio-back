const express = require("express");

const emojis = require("./emojis");
const projet = require("./projet");
const skill = require("./skill");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/emojis", emojis);
router.use("/projet", projet);
router.use("/skill", skill);

module.exports = router;
