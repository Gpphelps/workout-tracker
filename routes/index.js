const router = require("express").Router();

const frontEnd = require("./front-end.js");
const apiRoutes = require("./api/api-routes.js");

router.use("/", frontEnd);
router.use("/api/", apiRoutes);

module.exports = router;