import styles from './WelcomePage.module.css'
import { AuthLayout } from './AuthLayout';


interface WelcomePageProps{
    onGoToLogin: () => void;
    onGoToRegister: () => void;
}


export const WelcomePage: React.FC<WelcomePageProps> = ({
    onGoToLogin,
    onGoToRegister
}) => {
    return (
        <AuthLayout>
            <div className={styles.header}>
                    <h1>Welcome to Olegity</h1>
                    <span>Stay connected. Start a conversation</span>
                </div>
                <div className={styles.buttonSection}>
                    <button type='button' className={styles.forwardButton} onClick={onGoToRegister}>Register</button>
                    <button type='button' className={styles.forwardButton} onClick={onGoToLogin}>Log In</button>
                </div>
        </AuthLayout>
    );
}