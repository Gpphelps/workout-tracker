const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    exercises: {
            type: {
                type: String,
                enum: ["resistance", "cardio"],
                required: "Please enter exercise's type."
            },
            name: {
                type: String,
                trim: true,
                required: "Please enter exercise's name."
            },
            duration: {
                type: Number,
                required: "Please enter exercise's duration"
            },
            weight: {
                type: Number
            },
            reps: {
                type: Number
            },
            sets: {
                type: Number
            },
            distance: {
                type: Number
            }

        },
    day: {
        type: Date,
        default: Date.now
    }
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;