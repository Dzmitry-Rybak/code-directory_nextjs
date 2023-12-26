'use client'
import { useState } from "react";

import { QuestionsOverview } from "../quesitons/questionsOverview";
import { QuestionsView } from "../quesitons/questionsView";
import Answers from "../answers/answers";
import styles from '@/app/components/styles/home.module.scss'

const MainPage = ({stack, questionId, questionsData, answerById}) => {
    const [repeatQuestion, setRepeatQuestion] = useState([]);
    const [memorizedQuestions, setMemorizedQuestions] = useState([]);

    const onRepeatQuestion = id => {
        let updatedRepeatQuestions = [];
        if (repeatQuestion.includes(id)) {
            updatedRepeatQuestions = repeatQuestion.filter(questionId => questionId !== id);
        } else {
            updatedRepeatQuestions = [...repeatQuestion.filter(questionId => !memorizedQuestions.includes(questionId)), id];
        }
        
        const updatedMemorizedQuestions = memorizedQuestions.filter(questionId => !updatedRepeatQuestions.includes(questionId))
        setRepeatQuestion(updatedRepeatQuestions);
        setMemorizedQuestions(updatedMemorizedQuestions);

        // sendUpdateFiltersRequest('repeat', updatedRepeatQuestions)
        // sendUpdateFiltersRequest('memorized', updatedMemorizedQuestions)
    }
      
    const onMemorizedQuestion = id => {
        let updatedMemorizedQuestions = [];
        if (memorizedQuestions.includes(id)) {
            updatedMemorizedQuestions = memorizedQuestions.filter(questionId => questionId !== id);
        } else {
            updatedMemorizedQuestions = [...memorizedQuestions.filter(questionId => !repeatQuestion.includes(questionId)), id];
        }

        const updatedRepeatQuestions = repeatQuestion.filter(questionId => !updatedMemorizedQuestions.includes(questionId))
        setMemorizedQuestions(updatedMemorizedQuestions);
        setRepeatQuestion(updatedRepeatQuestions);

        // sendUpdateFiltersRequest('memorized', updatedMemorizedQuestions)
        // sendUpdateFiltersRequest('repeat', updatedRepeatQuestions)
    }

    return (
        <div className="container">
            <QuestionsOverview stack={stack} questionsCount={questionsData.length} memorizedQuestionsLength={memorizedQuestions.length}/>
            <div className={styles.home__wrapper}>
                <QuestionsView 
                    questionData={questionsData}
                    repeatQuestion={repeatQuestion}
                    memorizedQuestions={memorizedQuestions}/>
            

                <Answers
                    answerById={answerById}
                    questionId={questionId} 
                    onRepeatQuestion={onRepeatQuestion}
                    onMemorizedQuestion={onMemorizedQuestion}/>                           
           </div>
        </div>
    )
}

export default MainPage