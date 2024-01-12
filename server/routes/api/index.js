let router = require("express").Router();

router.use("/user", require("./user"));
router.use("/verify", require("./verification"));
router.use("/upload", require("./upload"));
router.use("/notification", require("./notification"));
router.use("/public", require("./public"));

module.exports = router;
