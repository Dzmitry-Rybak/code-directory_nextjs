'use client'
import { useState } from 'react';
import { Formik, Form, ErrorMessage} from 'formik';
import { useRouter } from 'next/navigation'

import { TextInput, Checkbox } from './inputForm';
import { validSchemaSignIn, validSchemaSignUp } from './validSchema';
import { fetchUser } from '../lib/data';
import { setCookies } from '../lib/cookies';


import { postQuestion } from '../lib/actions';

import styles from '@/app/components/styles/form.module.scss';
import buttonsStyles from '@/app/components/styles/buttons.module.scss';



export const SignInForm = () => {
    const [invalidPassword, setInvalidPassword] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const router = useRouter();

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                terms: false
            }}
            validationSchema={validSchemaSignIn}
            onSubmit={async (values, {setSubmitting})  => {
                try {
                    const data = await fetchUser('signin', values);
                    
                    console.log(data)
                    if (data.message === 'sign in succesfull') {
                        await setCookies(data.user.name, data.token, 'login', 'token')
                        router.push('/');
                    } else if (data.message === 'Password incorrect') {
                        setInvalidPassword(true);
                        setTimeout(() => {
                            setInvalidPassword(false);
                        }, 3000)
                    } else if (data.message === 'There is no users with this email') {
                        setInvalidEmail(true);
                        setTimeout(() => {
                            setInvalidEmail(false);
                        }, 3000)
                    }
                } catch(error) {
                    console.log('Error while submitting:', error)
                } finally {
                    setSubmitting(false)
                }
            }}
            >
            <Form className={styles.form}>
                <h2 className={styles.form__title}>SIGN IN</h2>

                <div className={styles.form__input}>
                    <TextInput
                        name="email" 
                        type="email"
                        placeholder={'EMAIL'}
                    />
                    {invalidEmail ? <span className={styles.error__style}>No account associated with the email address</span> : null}
                </div>
                <div className={styles.form__input}>
                    <TextInput
                        name="password" 
                        type="password"
                        placeholder={'PASSWORD'}
                    />
                    {invalidPassword ? <span className={styles.error__style}>Incorrect password. please try again</span> : null}
                </div>
                <Checkbox
                    name='terms'>AGREE TO TERMS AND CONDITIONS</Checkbox>
                <button type="submit" className={buttonsStyles.submit__button}>SIGN IN</button>
            </Form>
        </Formik>
    )
}

export const SignUpForm = () => {
    //const _APIURL = config.apiUrl;
    const [emailExists, setEmailExists] = useState(false);
    const router = useRouter()

    // const [showModal, setShowModal] = useState(false);

    return (
        <Formik 
                initialValues={{
                    login: '',
                    email: '',
                    emailConfirm: '',
                    password: '',
                    passwordConfirm: '',
                    terms: false
                }}
                validationSchema={validSchemaSignUp}
                onSubmit={async (values, {setSubmitting})  => {
                    try {
                        const data = await fetchUser('signup', values);
                        console.log(data)
                        if(data.message === 'Email is already exists') {
                            setEmailExists(true);
                        } else {
                            await setCookies(data.user.name, data.token, 'login', 'token')
                            setEmailExists(false);
                            router.push('/');
                            // setShowModal(true);
                            // setTimeout(() => {
                            //     setShowModal(false);
                            //     navigate('/');
                            // }, 5000)
                        }
                    } catch(error) {
                        console.log('Error while submitting:', error)
                    } finally {
                        setSubmitting(false)
                    }
                }}
            >
                <Form className={styles.form} >
                    <h2 className={styles.form__title}>SIGN UP</h2>
                    <div className={styles.form__input}>
                        <TextInput
                            name="login" 
                            type="text"
                            placeholder={'LOGIN'}
                        />
                    </div>
                    <div className={styles.form__input}>
                        <TextInput
                            name="email" 
                            type="email"
                            placeholder={'EMAIL'}
                        />
                        {emailExists ? <span className={styles.error__style}> Email is already exists, you can try logging</span> : null}
                    </div>
                    <div className={styles.form__input}>
                        <TextInput
                            name="emailConfirm" 
                            type="email"
                            placeholder={'CONFIRM EMAIL'}
                        />
                    </div>
                    <div className={styles.form__input}>
                        <TextInput
                            name="password" 
                            type="password"
                            placeholder={'PASSWORD'}
                        />
                    </div>
                    <div className={styles.form__input}>
                        <TextInput
                            name="passwordConfirm" 
                            type="password"
                            placeholder={'CONFIRM PASSWORD'}
                        /> 
                    </div>
                    <Checkbox
                        name='terms'>AGREE TO TERMS AND CONDITIONS</Checkbox>
                    <button type="submit" className={buttonsStyles.submit__button}>SIGN UP</button>
                    <ErrorMessage className={styles.error} name='text' component="div"/>
                </Form>
            </Formik>
    )
}

export const AddQuestionForm = () => {
    const [stack, setStack] = useState('');
    const [language, setLanguage] = useState('');
    const [question, setQuesion] = useState('');
    const [answer, setAnswer] = useState('');
    return (
        <form
            action={postQuestion}
            className={styles.form}>
            <h2 className={styles.form__title}>ADD QUESTION</h2>
                <div className={styles.form__input}>
                    <textarea
                        required
                        maxLength={500}
                        name="question" 
                        onChange={e => setQuesion(e.target.value)}
                        value={question}
                        placeholder={'type your questions...'}>
                    </textarea>
                </div>
                <div className={styles.form__input}>
                    <textarea
                        maxLength={3000}
                        required
                        name="answer" 
                        onChange={e => setAnswer(e.target.value)}
                        value={answer}
                        placeholder={'type answer...'}>
                    </textarea>
                </div>
                <div className={styles.form__input}>
                <select 
                    required
                    onChange={e => setStack(e.target.value)}
                    value={stack}
                    name='stack'
                    >
                    <option value="">Select programming stack</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="React">React</option>
                </select>
                </div>
                <div className={styles.form__input}>
                    <select 
                        required
                        onChange={e => setLanguage(e.target.value)}
                        value={language}
                        name='language'
                        >
                        <option value="">Select language</option>
                        <option value="English">English</option>
                        <option value="Russian">Russian</option>
                        <option value="Polish">Polish</option>
                    </select>
                </div>
                <button type="submit" className={buttonsStyles.submit__button}>ADD</button>
        </form>
    )
}