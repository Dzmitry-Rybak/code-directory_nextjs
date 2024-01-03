'use client'
import { useState, useEffect } from "react";
import { QuestionsVisible, QuestionsHidden } from "./questionsUi";

const Questions = ({questions, repeatQuestion, memorizedQuestions, onFilterQuestions, filter}) => {
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
        }, [])
        
        return  !isSmallScreen ? 
                    <QuestionsHidden 
                        questions={questions}
                        filter={filter}
                        repeatQuestion={repeatQuestion}
                        memorizedQuestions={memorizedQuestions}
                        onFilterQuestions={onFilterQuestions}/>
                : 
                    <QuestionsVisible
                        questions={questions}
                        filter={filter}
                        repeatQuestion={repeatQuestion}
                        memorizedQuestions={memorizedQuestions}
                        onFilterQuestions={onFilterQuestions}/>
}

export default Questions;