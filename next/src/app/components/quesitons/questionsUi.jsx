'use client'
import { CSSTransition } from 'react-transition-group';
import clsx from 'clsx';
import { useAppState } from '@/app/context';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

import { QuestionsFilter } from './questionsFilter';

import stylesQuestions from './questions.module.scss';
import stylesUi from './questionsUi.module.scss';


export const QuestionsVisible = ({questions, repeatQuestion, memorizedQuestions, onFilterQuestions}) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    // Проверяем доступен ли объект window
    const handleId = typeof window !== 'undefined' ? parseInt(window.localStorage.getItem('id')) : null; 
    
    const onSelectQuestionsId = (id) => {
        window.localStorage.setItem('id', JSON.stringify(id))
        const params = new URLSearchParams(searchParams);
        params.set('id', id);
        
        replace(`${pathname}?${params.toString()}`);
    }



    return (
        <div style={{width: '50%'}}>
            <QuestionsFilter 
                onFilterQuestions={onFilterQuestions}
            />
            <div className={stylesQuestions.questions__list}>
                <ol>
                    {questions.length === 0 ? (
                        <p>No questions added yet. To start revising, add the questions you're interested in, and they will appear here.</p>
                    ) :                     
                    questions.map(item => {
                        const itemId = item.question_id;                  
                        return <li 
                                    key={itemId}
                                    className= {clsx(
                                        [stylesQuestions.questions__item],
                                        {
                                            [stylesQuestions.questions__item_selected]: handleId === itemId,
                                            [stylesQuestions.repeat]: repeatQuestion.includes(String(itemId)),
                                            [stylesQuestions.memorized]: memorizedQuestions.includes(String(itemId))
                                        }
                                    )}
                                    onClick={() => onSelectQuestionsId(itemId)}>{item.question}</li>
                    })}
                </ol>
            </div>
        </div>
)};

export const QuestionsHidden = ({ answers, questions }) => {
    const { burgerToggle, onToggleBurger } = useAppState();
    return (
        <>
            {answers}
            <CSSTransition
                in={burgerToggle}
                timeout={300}
                classNames={{
                    enter: stylesUi.menu_enter,
                    enterDone: stylesUi.menu_enter_done,
                    exit: stylesUi.menu_exit,
                    exitDone: stylesUi.menu_exit_done,
                  }}>
                    <div className={stylesUi.menu} onClick={onToggleBurger}>
                        <div className={stylesUi.blur}/>
                        <div className={stylesUi.menu__content} onClick={e => e.stopPropagation()}>
                            <QuestionsFilter 
                                // onFilterQuestions={onFilterQuestions}
                                // filter={filter}
                            />
                            {/* ${stylesUi.burger_hight}  - не помню зачем еще доп этот класс был ниже прописан*/}
                            <div className={stylesQuestions.questions__list}>
                            <ol>                                
                                {questions.map(item => {
                                    return <li 
                                                key={item.question_id}
                                                className={stylesQuestions.questions__item}>{item.question}
                                            </li>
                                })}
                            </ol>
                        </div>
                        </div>
                    </div>
            </CSSTransition>
        </>
    )
}