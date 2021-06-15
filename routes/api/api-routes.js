// Defines the api routes
const router = require("express").Router();
const Workout = require("../../models/workout");
// const path = require("path");

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

router.put("/workouts/:id", async (req, res) => {
    let currentWorkout = await Workout.findOne({ _id: req.params.id });

    if (!currentWorkout) {
        return res.json({message: "Workout not found"});
    }

    const { exercises } = currentWorkout;
    exercises.push(req.body);

    const updatedWorkout = await currentWorkout.save(
        { exercises: exercises}
    );

    if (!updatedWorkout) {
        res.json({message: "Could not update workout"});
    } else {
        res.json(updatedWorkout);
    }
});

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
