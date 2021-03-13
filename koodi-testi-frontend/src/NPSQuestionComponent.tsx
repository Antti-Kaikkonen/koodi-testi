import { FormGroup, Typography } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { NPSQuestion } from "./models/nps-question";
import { useMemo, useState } from "react";

export function NPSQuestionComponent(props: { question: NPSQuestion, onChange: (value: number | undefined) => void }) {

    const [selectedRating, setSelectedRating] = useState<number>();

    const onChange = (event: React.MouseEvent<HTMLElement, MouseEvent>, newValue: number) => {
        setSelectedRating(newValue);
        props.onChange(newValue);
    };

    const buttons = useMemo(() => {
        const res: JSX.Element[] = [];
        for (let i = props.question.range_min; i <= props.question.range_max; i++) {
            res.push(<ToggleButton key={i} value={i}>{i}</ToggleButton>)
        }
        return res;
    }, [props.question]);

    return <FormGroup row className="center">
        <Typography gutterBottom className="center">
            {props.question.label}
        </Typography>
        <ToggleButtonGroup value={selectedRating} exclusive onChange={onChange} color="primary" className="center">
            {buttons}
        </ToggleButtonGroup>
    </FormGroup>
}