import Groq from "groq-sdk";
import { env } from "@/config/env.config";
import httpStatus from "http-status";
const groq = env.GROQ_API_KEY ? new Groq({ apiKey: env.GROQ_API_KEY }) : null;
const summarizeText = async (req, res) => {
    const { text, summaryLength } = req.body;
    const normalizedText = typeof text === "string" ? text.trim() : "";
    const lengthNumber = typeof summaryLength === "number" ? summaryLength : Number(summaryLength);
    if (!normalizedText || !Number.isFinite(lengthNumber)) {
        res.status(httpStatus.BAD_REQUEST).json({ error: "text and summary length are required" });
        return;
    }
    const lengthInt = Math.floor(lengthNumber);
    if (lengthInt <= 0) {
        res.status(httpStatus.BAD_REQUEST).json({ error: "summary length must be greater than 0" });
        return;
    }
    try {
        if (!groq) {
            res
                .status(httpStatus.INTERNAL_SERVER_ERROR)
                .json({ error: "ANTHROPIC_API_KEY is not configured" });
            return;
        }
        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            max_tokens: 300,
            messages: [
                {
                    role: "system",
                    content: 'You are a text summarizer. When asked to summarize a text, send back the summary of it. Please only send back the summary without prefixing it with things like "Summary" or telling where the text is from. Also give me the summary as if the original author wrote it and without using a third person voice.',
                },
                {
                    role: "user",
                    content: `Summarize this text. Limit the length to ${lengthInt} words: ${normalizedText}`,
                },
            ],
        });
        const summary = response.choices[0]?.message?.content ?? "";
        if (!summary.trim()) {
            res
                .status(httpStatus.BAD_GATEWAY)
                .json({ error: "Summarization service returned an empty response" });
            return;
        }
        res.status(httpStatus.OK).json({ summary });
    }
    catch (error) {
        const err = error;
        res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ error: `There was an error processing the text: ${err.message}` });
    }
};
export default summarizeText;
//# sourceMappingURL=summarize.controller.js.map