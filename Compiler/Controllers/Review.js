import { generateAIReview } from "../Utils/GenerateReview.js";
export const reviewCode = async (req, res) => {
    const { code, description } = req.body;
    if (code === undefined || code.trim() === "") {
        return res.status(400).json({ success: false, error: "Code is required" });
    }

    try {
        const aiReviewResponse = await generateAIReview(code, description);
        res.json({
            success: true,
            aiReviewResponse
        });
    } catch (error) {
        console.error("Error in AI review:", error.message);
        return res.status(500).json({ success: false, error: "An error occurred while reviewing the code" });
    }
}