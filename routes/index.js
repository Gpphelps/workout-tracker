const router = require("express").Router();

// Imports the routes
const frontEnd = require("./front-end.js");
const apiRoutes = require("./api/api-routes.js");

// Defines the routes that are used by teh router
router.use("/", frontEnd);
router.use("/api/", apiRoutes);

module.exports = router;