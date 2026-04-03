import summarizeText from "@/controller/summarize.controller";
import { Router } from "express";
const summarizeRoutes = Router();
summarizeRoutes.post("/summarize", summarizeText);
export default summarizeRoutes;
//# sourceMappingURL=summarize.routes.js.map