import ProblemStruct from "../Models/Problem.js";

export const fetchproblemCode = async (req, res) => {
    try {
        const problemlist = await ProblemStruct.find({});
        res.status(200).json({ problemlist });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};