import MainPage from "./components/main/main-page";
import { Suspense } from "react";
import { notFound } from 'next/navigation';

import { fetchQuestionsData, fetchAnswer, getFilteredQuestions } from "./lib/data";

import { HomeSkeleton } from "./components/skeletons/skeletons";

// export const metadata = {
//     generator: 'Next.js',
//     applicationName: 'Code-Directory.com',
//     authors: [{ name: 'Dzmitry Rybak', url: 'https://code-directory.com' }],
//     creator: 'Dzmitry Rybak',
//     publisher: 'Dzmitry Rybak',
//     title: {
//         template: '%s | Code Directory',
//         default: 'Code Directory',
//     },
//     description: 'Explore questions on popular programming languages, find detailed answers, and access code examples for interview preparation. Contribute by adding your own questions and sharing experiences, creating a comprehensive reference for programmers.',
//     metadataBase: new URL('https://code-directory.com'), // исправить
//     keywords: ['Python', 'React', 'JavaScript', 'Interview'],
//     referrer: 'origin-when-cross-origin',
//     alternates: {
//         canonical: '/',
//         languages: {
//           'en-US': '/?language=English',
//           'ru-RU': '/?language=Russian',
//           'pl-PL': '/?language=Polish',
//         },
//     },
//     openGraph: {
//         images: 'Add!',
//     },
//     robots: {
//         index: true,
//         follow: true,
//         nocache: true,
//         googleBot: {
//           index: true,
//           follow: true,
//           noimageindex: true,
//           'max-video-preview': -1,
//           'max-image-preview': 'large',
//           'max-snippet': -1,
//         },
//       },
// };

export default async function Home({searchParams}) {

    const stack = searchParams?.stack?.toLowerCase() || 'react';
    const language = searchParams?.language?.toLowerCase() || 'russian';
    
    const questionId = parseInt(searchParams?.id) || 1;

    const [questionsData, answerData] = await Promise.all([
        fetchQuestionsData(stack, language),
        fetchAnswer(questionId, stack, language),
    ])

    const filtersRequest = await getFilteredQuestions(stack, language);

    let repeat = [];
    let memorized = [];
    
    if (filtersRequest.message === 'Data received successfully' && filtersRequest.data) {
        const { data: { repeat: repeatData, memorized: memorizedData } } = filtersRequest;
        repeat = repeatData;
        memorized = memorizedData;
    }

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
                    repeat={repeat}
                    memorized={memorized}
                    language={language}
                    questionId={questionId}
                    answerById={answerById}/>
        </Suspense>
    )
}