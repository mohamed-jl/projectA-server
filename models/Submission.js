import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    data: {
        type: Object,
        default: {},
    },
});

export default mongoose.model("Submission", submissionSchema);
