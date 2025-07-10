import ProblemStruct from "../Models/Problem.js";

export const deleteProblemCode = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProblem = await ProblemStruct.findByIdAndDelete(id);
        if (!deletedProblem) {
            return res.status(404).send("Problem not found");
        }
        res.status(200).json({ message: "Problem deleted successfully", problem: deletedProblem });
    } catch (error) {
        console.error("Error deleting problem:", error);
        if (error.name === 'CastError') {
            return res.status(400).send("Invalid problem ID format");
        }
        res.status(500).send("Internal Server Error");
    }
}