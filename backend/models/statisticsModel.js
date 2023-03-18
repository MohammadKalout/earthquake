import mongoose from "mongoose";

const statSchema = new mongoose.Schema({
    location: {type: String, required: true},
    time: {type: Date, required: true},
    latitude: {type: Number, required: true},
    depth: {type: Number, required: true},
},
{
    timestamps: true,
}
);

const Statistics = mongoose.model("Statistics", statSchema);

export default Statistics;