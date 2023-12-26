'use client'
import { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import clsx from 'clsx';

import FullscreenView from './fullScreen';

import styles from './answers.module.scss';
import stylesBtn from '@/app/components/styles/buttons.module.scss';

const Answers =  ({questionId, answerById, onMemorizedQuestion, onRepeatQuestion}) => {
    const {replace} = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [activeClass, setActiveClass] = useState(false);
    const [activeFullScreen, setActiveFullScreen] = useState(false);

    const {question, answer, example_path} = answerById;

    const buttonName = !activeClass ? 'Example' : 'Hide';

    const onToggleActive = (activeClass) => {
        setActiveClass(!activeClass)
    }

    const onFullScreenImg = (state) => { 
        setActiveFullScreen(!state)
    }

    const onChangeQuestion = async (e) => {
        let nextQuestionId;
        console.log(e.target.dataset)
        if(e.target.dataset.action === 'next' || e.target.dataset.action === 'Memorized') {
            nextQuestionId = ++questionId;
        } else if(e.target.dataset.action === 'prev') {
            nextQuestionId = --questionId;
        }

        window.localStorage.setItem('id', JSON.stringify(nextQuestionId))
        const params = new URLSearchParams(searchParams);
        params.set('id', nextQuestionId)
        replace(`${pathname}?${params.toString()}`);
    }

    const isAvailableImg = example_path !== 'not available' ? <img
                                                                    className={clsx(
                                                                        [styles.answers__image],
                                                                        {
                                                                            [styles.active]: activeClass
                                                                        }
                                                                    )}
                                                                    src={example_path} 
                                                                    alt="example"
                                                                    onClick={() => onFullScreenImg(activeFullScreen)}
                                                                    />
                                                                : <h4>Sorry, there is no example</h4>
    return (        
            <div className={styles.answers}>
                <div className={styles.answers__question}>
                    {question}
                </div>
                <hr/>
                <div className={styles.answers__text}>
                    <pre>{answer}</pre>
                </div>
                <div className={styles.answers__btn}>
                    <button 
                    className={`${stylesBtn.button__submit} ${stylesBtn.button}`}
                    // className={!disableNextButton ? "button" : "button button-disable"}
                    data-action="prev"
                    // disabled={disableNextButton}
                    onClick={onChangeQuestion}>Prev question</button>

                    <button 
                    className={`${stylesBtn.button__submit} ${stylesBtn.button}`}
                    data-action="Example"
                    onClick={() => onToggleActive(activeClass)}>{buttonName}</button>

                    <button 
                    className={`${stylesBtn.button__submit} ${stylesBtn.button}`}
                    data-action="Repeat"
                    onClick={() => onRepeatQuestion(questionId)}>Repeat</button>

                    <button 
                    className={`${stylesBtn.button__submit} ${stylesBtn.button}`}
                    data-action="Memorized"
                    onClick={(e) => {
                        onMemorizedQuestion(questionId);
                        onChangeQuestion(e)
                        }}>Memorized</button>

                    <button 
                    className={`${stylesBtn.button__submit} ${stylesBtn.button}`}
                    // className={!disableNextButton ? "button" : "button button-disable"}
                    data-action="next"
                    // disabled={disableNextButton}
                    onClick={onChangeQuestion}>Next question</button>
                </div>
                {!activeFullScreen ? 
                    <div className={styles.answers__example}>{isAvailableImg}</div> 
                : 
                    <FullscreenView isAvailableImg={isAvailableImg} onFullScreenImg={onFullScreenImg} activeFullScreen={activeFullScreen}/>}
            </div>
        )
}

export default Answers