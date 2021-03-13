import { TextField } from "@material-ui/core";
import { TextAreaQuestion } from "./models/text-area-question";

export function TextAreaQuestionComponent(props: { question: TextAreaQuestion, onChange: (value: string) => void }) {


    return <TextField
        label={props.question.label}
        multiline
        rows={4}
        rowsMax={8}
        required={props.question.required}
        variant="outlined"
        margin="normal"
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => { props.onChange(event.target.value) }}
    />
}