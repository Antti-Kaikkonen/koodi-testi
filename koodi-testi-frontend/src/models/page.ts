import { Question } from "./question";

export interface Page {
    pageId: string;
    questions: Question[];
}