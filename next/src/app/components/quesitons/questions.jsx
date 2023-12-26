'use client'
import { useState, useEffect } from "react";
import { QuestionsVisible, QuestionsHidden } from "./questionsUi";

const Questions = ({questions, repeatQuestion, memorizedQuestions, onFilterQuestions}) => {
        const [isSmallScreen, setIsSmallScreen] = useState(false);
        
        const handleResize = () => {
            //  Настройки высоты видимой области экрана, без панелей управления
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
    
            // hide questions in burger-menu if screen less then 992px
            if(window.innerWidth <= 992) {
                setIsSmallScreen(false);
            } else {
                setIsSmallScreen(true);
            }
        } 
    
        useEffect(() => {
            handleResize();
            window.addEventListener('resize', handleResize) 
            return () => window.removeEventListener('resize', handleResize)
            
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])
        
        return <QuestionsVisible 
                    questions={questions}
                    repeatQuestion={repeatQuestion}
                    memorizedQuestions={memorizedQuestions}
                    onFilterQuestions={onFilterQuestions}/>
        // return  !isSmallScreen ? <QuestionsHidden questions={questions}/> : <QuestionsVisible questions={questions}/>
}

export default Questions;