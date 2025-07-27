import { generateAIReview } from "../Utils/GenerateReview.js";
import rateLimit, { ipKeyGenerator } from 'express-rate-limit';

export const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 1, // Limit each IP to 1 requests per windowMs
    keyGenerator: (req) => {
        if (req.user && req.user.id) {
            return req.user.id;
        }
        // Use the official helper for IP fallback
        return ipKeyGenerator(req);
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    // Custom message for rate limit exceeded
    message: {
        success: false,
        error: "Please try again later."
    }
});


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