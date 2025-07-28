import Submission from "../models/Submission.js";

export const createSubmission = async (req, res) => {
    try {
        const { userId, data } = req.body;
        const submission = new Submission({ userId, data });
        await submission.save();
        res.status(201).json(submission);
    } catch (error) {
        console.error("Error creating submission:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getSubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find(req.query).populate("userId", "username email");
        res.status(200).json(submissions);
    } catch (error) {
        console.error("Error fetching submissions:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getSubmissionById = async (req, res) => {
    try {
        const { id } = req.params;
        const submission = await Submission.findById(id).populate("userId", "username email");
        if (!submission) {
            return res.status(404).json({ message: "Submission not found" });
        }
        res.status(200).json(submission);
    } catch (error) {
        console.error("Error fetching submission:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}