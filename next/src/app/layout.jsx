import './styles/globals.css';
import { Montserrat } from 'next/font/google';
import Header from '@/app/components/header-nav/header-nav.jsx';
import Footer from '@/app/components/footer/footer.jsx';
 
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

import { AppStateProvider } from './context.jsx';

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })


export default function RootLayout({ children }) {
  return (
    <AppStateProvider>
        <html lang="en" className={montserrat.variable}>
            <body>
            <Header/>
                <main className='flexGrow'>
                    {children}
                </main>
            <Footer/>  
            </body>
        </html>
    </AppStateProvider>
    )
}
