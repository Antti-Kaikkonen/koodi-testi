import { PageAnswer } from "./page-answer";

export interface SurveyAnswer {
    [pageId: string]: PageAnswer;
}