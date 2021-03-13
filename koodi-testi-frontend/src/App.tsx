import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { Page } from './models/page';
import { QuestionComponent } from './QuestionComponent';
import { SurveyAnswer } from './models/survey-answer';

function App() {

    const [pages, setPages] = useState<Page[]>([]);

    const currentPage: Page = useMemo(() => {
        return pages[pages.length - 1];
    }, [pages]);

    const [message, setMessage] = useState<string>();


    const [surveyAnswer, surveyAnswerDispatcher] = useReducer((state: SurveyAnswer, action: { pageId: string, questionId: string, value: any }) => {
        const page = state[action.pageId];
        if (page === undefined) state[action.pageId] = {};
        state[action.pageId][action.questionId] = action.value;
        return { ...state } as SurveyAnswer;
    }, {});


    const requiredQuestionsAnswered: boolean = useMemo(() => {
        if (currentPage === undefined) {
            return false;
        } else {
            return currentPage.questions
                .filter(question => question.required === true)
                .every(question => {
                    const page = surveyAnswer[currentPage.pageId];
                    if (page === undefined) return false;
                    const answer = page[question.name];
                    return answer !== undefined;
                });
        }
    }, [currentPage, surveyAnswer]);


    useEffect(() => {//Load first page from backend
        fetch("/survey")
            .then((res) => res.json())
            .then((obj) => {
                setPages([obj]);
            });
    }, []);

    const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {//Submit current page and load next page
        fetch('/survey', {
            method: 'POST',
            headers: {
                'Accept': 'application/json', 'Content-Type': 'application/json'
            },
            body: JSON.stringify(surveyAnswer)
        })
            .then(res => res.json())
            .then(obj => {
                if (obj.pageId) {
                    setPages([...pages, obj]);
                } else if (obj.thank_you_text) {
                    setMessage(obj.thank_you_text);
                }
            });
        event.preventDefault();
    }, [pages, setPages, setMessage, surveyAnswer]);

    if (message) {
        return <h3 className="centered">{message}</h3>
    } else {
        return < form onSubmit={handleSubmit} >
            {currentPage && currentPage.questions.map(question => <div key={question.name}>
                <QuestionComponent
                    question={question}
                    onChange={(value: any) => {
                        surveyAnswerDispatcher({ pageId: currentPage.pageId, questionId: question.name, value: value })
                    }}
                />
            </div>)}
            <input type="submit" value="Submit" disabled={!requiredQuestionsAnswered} />
        </form >
    }
}

export default App;
