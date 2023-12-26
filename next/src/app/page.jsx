import MainPage from "./components/main/mainPage";
import { Suspense } from "react";
import { notFound } from 'next/navigation';

import { fetchQuestionsData, fetchAnswer } from "./components/lib/data";

import { HomeSkeleton } from "./components/skeletons/skeletons";

export default async function Home({searchParams}) {

    const stack = searchParams?.stack || 'react';
    const language = searchParams?.language || 'russian';
    const questionId = searchParams?.id || 128;

    const [questionsData, answerData] = await Promise.all([
        fetchQuestionsData(stack, language),
        fetchAnswer(questionId, stack, language)
    ])

    const answerById = answerData.data[0]

    if(!answerById){
        // Если по заданному id нет такого вопросы - вернем страницу not-found
        notFound();
    }

    return (
        <Suspense fallback={<HomeSkeleton/>}>
                <MainPage
                    questionsData={questionsData.data}
                    stack={stack}
                    questionId={questionId}
                    answerById={answerById}/>
        </Suspense>
    )
}