import ProblemStruct from "../Models/problem.js";

export const updateProblemCode = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, SampleInput, SampleOutput, constraints, tags, difficulty } = req.body;

        if (!(title.trim() && description.trim() && difficulty.trim())) {
            return res.status(400).send("Please provide all required fields.");
        }
        try {
            const updatedProblem = await ProblemStruct.findByIdAndUpdate(id, {
            title,
            description,
            SampleInput,
            SampleOutput,
            constraints,
            tags,
            difficulty
        }, { new: true, runValidators: true });
        if (!updatedProblem) {
            return res.status(404).send("Problem not found");
        }
        res.status(200).json({ message: "Problem updated successfully", problem: updatedProblem });
            
        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).send("Validation error: " + error.message);
            }
            console.error("Error validating problem data:", error);
            return res.status(500).send("Internal Server Error");
            
        }
    } catch (error) {
        console.error("Error updating problem:", error);
        if (error.name === 'CastError') {
            return res.status(400).send("Invalid problem ID format");
        }
        res.status(500).send("Internal Server Error");
    }
}