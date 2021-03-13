export interface Question {
    name: string;
    type: "nps" | "textarea";
    label: string;
    required: boolean;
}