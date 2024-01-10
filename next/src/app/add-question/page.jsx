import { AddQuestionForm } from "@/app/components/form/add-question-form";
import styles from '@/app/styles/form.module.scss';

// export const metadata = {
//     title: 'Add question',
// };

const QuestionAddFormPage = () => {
    return (
        <div className="center-container">
                <div className={styles.form__wrapper}>
                    <div className={styles.form}>
                        <h2 className={styles.form__title}>YOU CAN HELP</h2>
                        <p>
                            "Welcome! Ready to contribute? Please sign in first. Our community thrives on sharing knowledge and supporting each other with questions and insights on various programming languages.<br/><br/>
                            <br/>
                            Here’s how you can make an impact:
                            <br/>
                            · Pose your programming puzzles or share your knowledge by submitting questions.<br/><br/>
                            · Offer your expertise by providing comprehensive answers.<br/><br/>
                            · Enhance understanding by accompanying your queries and explanations with illustrative images.<br/><br/>
                            · We appreciate your commitment to enriching this knowledge hub for developers!"
                        </p>
                    </div>

                    <hr/>
                    <AddQuestionForm/>                    
                </div>
        </div>
    )
}

export default QuestionAddFormPage