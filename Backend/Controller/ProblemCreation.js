import ProblemStruct from "../Models/Problem.js";

// Create Problem
export const createProblemCode = async (req, res) => {
    try {
        const { title, description, SampleInput, SampleOutput, constraints, tags, difficulty, createdBy} = req.body;
        if (!(title && description && difficulty)) {
            return res.status(400).send("Please provide all required fields.");
        }
        try {
            const newProblem = await ProblemStruct.create({
                title,
                description,
                SampleInput,
                SampleOutput,
                constraints,
                tags,
                difficulty,
                createdBy,
                createdAt: new Date()
            });
            res.status(201).json({ message: "Problem created successfully", problem: newProblem });
        } catch (err) {
            console.error("Error creating problem:", err);
            return res.status(400).send("Error in creating problem: " + err.message);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}