import {Request, Response, NextFunction} from "express";
import {SummarizeService} from "../services/summarize.service";
import {summarizeSchema} from "../schemas/summarize.schema";

const summarizeService = new SummarizeService();

export async function summarizeController(req: Request, res: Response, next: NextFunction) {
    try {
        const body = summarizeSchema.parse(req.body);

        const result = await summarizeService.execute(body.provider, body.text);
        res.json({ summary: result });
    } catch (error) {
        next(error);
    }
}