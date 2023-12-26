'use client'
import { useEffect, useState, memo } from 'react';
import Questions from './questions';

export const QuestionsView = memo(function QuestionsView({repeatQuestion, memorizedQuestions, questionData}) {
    const [questions, setQuestions] = useState([]);
    const [filter, setFilter] = useState('all');
    const filterQuestions = (items, filter) => {
        if(repeatQuestion.length === 0 && filter === 'repeat') {
            return ([])

        }
        switch (filter) {
            case 'repeat':
                return items.filter((item, i) => repeatQuestion.includes(String(item.question_id)));
            case 'remaining':
                return items.filter((item, i) => !memorizedQuestions.includes(String(item.question_id)));
            case 'all':
                return items
            default:
                return items
        }
    }

    const onFilterQuestions = (newFilter) => {
        setFilter(newFilter);
    }
    
    useEffect(() => {        
        setQuestions(filterQuestions(questionData, filter))
    }, [filter, questionData])

    return (
        <Questions 
                questions={questions} 
                repeatQuestion={repeatQuestion}
                memorizedQuestions={memorizedQuestions}
                onFilterQuestions={onFilterQuestions}/> 
    ) 
});