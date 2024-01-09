"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Modal } from '../modal/modal';
import { signout, deleteAccount } from '../../lib/data';

import styles from './dashboard.module.scss';
import buttonStyles from '@/app/styles/buttons.module.scss';

const Dashboard = () => {
    const [showModal, setShowModal] = useState(false);

    const router = useRouter();

    const handleLogout = () => {
        signout();
        setShowModal(true)
        setTimeout(() => {
            setShowModal(false);
            router.push('/');
        }, 6000)
    }

    const handleDelete = () => {
        deleteAccount();
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
            router.push('/')
        }, 6000)
    }

    return (
        <div className='center-container'>
            <div className={styles.logout__wrapper}>
                <h2>Hi</h2>
                <p>Your journey of discovery awaits! Don't miss a beat—keep nurturing your curiosity and expanding your horizons with us. 🧠✨
                <br/><br/> 
                If you're looking to switch lanes, 'Change Account is your gateway. Ready to wrap up? 'Log Out' and take a well-earned rest. Keep soaring high with your studies!"</p>
                <div className={styles.logout__buttons}>
                        <button
                        className={buttonStyles.submit__button}
                        onClick = {handleDelete}>Delete Account</button>
                    <button
                        className={buttonStyles.submit__button}
                        onClick = {handleLogout}>Sign Out</button>
                </div>
                <br/><br/> 
                <p>You can contact us for more information:</p>
                <a href="mailto:codedirectoryapp@gmail.com" className='footer__mail'>CodeDirectoryApp@gmail.com</a>
            </div>
            <Modal show={showModal}>
                    <h2>Come back when you're ready</h2>
                    <br />
                    <p>"Logout was successful. Thank you for using our service. We'll be waiting for you again. Until we meet again!"</p>
            </Modal>
        </div>
    )
}

export default Dashboard