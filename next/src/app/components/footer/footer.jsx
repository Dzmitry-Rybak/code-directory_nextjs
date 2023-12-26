// import insta from '../../resources/icons/instagram.png';
// import telega from '../../resources/icons/telegram.svg';
// import donate from '../../resources/icons/donate.png';
import Link from 'next/link';
import Image from 'next/image';
import styles from  '@/app/components/footer/footer.module.scss';

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.footer__wrapper}>
                <div className={styles.footer__socialmedia}>
                    <Link href="https://www.instagram.com/dymitr.rybak" target='_blank' rel="noopener noreferrer">
                        <Image 
                            src='/icons/instagram.png' 
                            alt="instagram" 
                            className={styles.footer__icon}
                            width='30'
                            height='30'/>
                    </Link>
                    <Link href="https://t.me/dzmitryrybak" target='_blank' rel="noopener noreferrer">
                        <Image 
                            src='/icons/telegram.svg' 
                            alt="telegram" 
                            className={styles.footer__icon}
                            width='30'
                            height='30'/>
                    </Link>
                    <Link href="https://patreon.com/" target='_blank' rel="noopener noreferrer">
                        <Image 
                            src='/icons/donate.png'
                            alt="donate" 
                            className={styles.footer__icon}
                            width='30'
                            height='30'/>
                    </Link>
                    <a href="mailto:codedirectoryapp@gmail.com" className={styles.footer__mail}>CodeDirectoryApp@gmail.com</a>
                </div>
            </div>
        </div>
    )
}

export default Footer;