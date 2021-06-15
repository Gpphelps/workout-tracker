// Configures user-side routes
const router = require("express").Router();
const path = require("path");

// Sets the users view to the exercise.html when /exercise is called
router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

// Sets the users view to the stats.html when /stats is called
router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
});

// Sets the users view to index.html when / is called 
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;
