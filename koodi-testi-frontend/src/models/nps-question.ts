import { Question } from "./question";

export interface NPSQuestion extends Question {
    type: "nps";
    range_min: number;
    range_max: number;
}