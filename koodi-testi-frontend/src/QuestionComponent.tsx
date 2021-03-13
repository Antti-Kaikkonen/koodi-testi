import { NPSQuestion } from "./models/nps-question";
import { Question } from "./models/question";
import { TextAreaQuestion } from "./models/text-area-question";
import { NPSQuestionComponent } from "./NPSQuestionComponent";
import { TextAreaQuestionComponent } from "./TextAreaQuestionComponent";

export function QuestionComponent(props: { question: Question, onChange: (value: any) => any }) {

    if (props.question.type === "nps") {
        return <NPSQuestionComponent question={props.question as NPSQuestion} onChange={props.onChange} />
    } else if (props.question.type === "textarea") {
        return <TextAreaQuestionComponent question={props.question as TextAreaQuestion} onChange={props.onChange} />;
    } else {
        return <div>Unsupported question type: {props.question.type}</div>
    }
}