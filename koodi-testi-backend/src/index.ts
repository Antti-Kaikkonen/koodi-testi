import schema from './schema.json';
import express from 'express';
import { PageAnswer } from './models/page-answer';
import { SurveyAnswer } from './models/survey-answer';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.API_PORT || 4000;
const survey_answers_directory = process.env.SURVEY_ANSWERS_DIRECTORY || ".";//Defaults to the working directory

const app = express();
app.use(express.json({ limit: '100kb' }));

app.get('/survey', (request, response) => {//Return first page
    console.log("Returning first page questions");
    response.json({ pageId: schema.pages[0].id, questions: schema.pages[0].questions });
});

app.post('/survey', (request, response) => {
    let survey: SurveyAnswer = request.body;
    console.log("RECEIVED", survey);
    let questionToAnswer = new Map<string, any>();
    for (let schemaPage of schema.pages) {
        const conditionsMatch: boolean = schemaPage.conditions === undefined ? true : schemaPage.conditions.every(condition => {
            const answer = questionToAnswer.get(condition.question);
            if (answer === undefined) return false;
            if (condition.test === "lessthan") {
                return answer < condition.value;
            } else if (condition.test === "greaterthan") {
                return answer > condition.value;
            }
        });
        if (!conditionsMatch) continue;//Skip pages with unmatched conditions
        const answeredPage: PageAnswer = survey[schemaPage.id];
        if (answeredPage === undefined || answeredPage === null) {
            response.json({ pageId: schemaPage.id, questions: schemaPage.questions });//Return unsanswered page
            return;
        }
        for (let [questionId, answer] of Object.entries(answeredPage)) {
            questionToAnswer.set(questionId, answer);
        }
        const requiredQuestionsAnswered: boolean = schemaPage.questions
            .filter(question => question.required)
            .every(requiredQuestion => questionToAnswer.has(requiredQuestion.name));
        if (!requiredQuestionsAnswered) {
            response.status(400).send({ error: "Answer all required questions" });
            return;
        }
    }
    let res: any = {};
    questionToAnswer.forEach((value, key) => { res[key] = value });
    fs.writeFile(survey_answers_directory + "/result" + new Date().getTime() + ".json", JSON.stringify(res), (err) => {
        if (err) throw err;
    });
    response.send({ thank_you_text: schema.thank_you_text });
});

app.listen(port, () => {
    console.log(`koodi-testi app listening at http://localhost:${port}`)
});