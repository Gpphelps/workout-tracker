// Defines the api routes
const router = require("express").Router();
const Workout = require("../../models/workout");

// Creates a new workout
router.post("/workouts", (req, res) => {
    let newWorkout = new Workout(req.body);

    newWorkout.save((err, workout) => {
        if (err) {
            throw res.json(err);
        } else {
            res.json(workout);
        }
    });
});

// Adds a new workout to the database 
router.put("/workouts/:id", async (req, res) => {
    let currentWorkout = await Workout.findOne({ _id: req.params.id });

    if (!currentWorkout) {
        return res.json({message: "Workout not found"});
    }

    const { exercise } = currentWorkout.push(req.body);

    const updatedWorkout = await currentWorkout.save(
        { exercises: exercise}
    );

    if (!updatedWorkout) {
        res.json({message: "Could not update workout"});
    } else {
        res.json(updatedWorkout);
    }
});

// Gets all of the workouts that have been completed and complies there duration
router.get("/workouts", async (req, res) => {
    let getDuration = await Workout.aggregate([
        {
            $project: {
                day: 1,
                exercises: 1,
                totalDuration: { $sum: "$exercises.duration" }
            }
        }
    ]);
    res.json(getDuration);
});

// Gets all of the workouts from the last 7 days and complies their duration
router.get("/workouts/range", async (req, res) => {
    let getDuration = await Workout.aggregate([
        {
            $project: {
                day: 1,
                exercises: 1,
                totalDuration: { $sum: "$exercises.duration" }
            }
        }
    ]).sort({ _id: "desc" }).limit(7);
    res.json(getDuration);
});


module.exports = router;
