import styles from './RegisterPage.module.css';
import { useState } from 'react';
import { AuthLayout } from './AuthLayout';
import { AccountDetailsStep} from './AccountDetailsStep';
import { PasswordStep } from './PasswordStep';
import { EmailVerificationStep } from './EmailVerificationStep';


interface RegisterPageProps{
    onRegisterSuccess: () => void;
    onGoToLogin: () => void;
}


export const RegisterPage: React.FC<RegisterPageProps> = ({
    onRegisterSuccess,
    onGoToLogin
}) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        code: '',
    })
    
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [usernameError, setUsernameError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [passwordConfirmError, setPasswordConfirmError] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [codeError, setCodeError] = useState<string>('');

    const handleChange = (field: keyof typeof formData, value: string) =>{
        if (field === "username"){
            setUsernameError('');
        }
        if (field === "email"){
            setEmailError('');
        }
        if (field === "password"){
            setPasswordConfirmError('');
            setPasswordError('');
        }
        if (field === "confirmPassword"){
            setPasswordConfirmError('');
        }
        setFormData((previousData) => ({
            ...previousData,
            [field]: value
        }));
    }


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isSubmitting === true){
            return;
        }
        if (formData.username.trim() === ""){
            setUsernameError('Enter your username');
            return;
        }
        if (formData.username.length > 25){
            setUsernameError('Username is too long');
            return;
        }
        if (formData.username.length < 3){
            setUsernameError('Username is too short');
            return;
        }
        if (!/^[a-zA-Z0-9_]+$/.test(formData.username.trim())){
            setUsernameError('Username can contain only latin symbols or numbers');
            return;
        }
        if (formData.email.trim() === ""){
            setEmailError('Email is empty')
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())){
            setEmailError('Enter valid email');
            return;
        }
        if (formData.password.trim() === ""){
            setPasswordError('Password is empty');
            return;
        }
        if (formData.password.length < 5){
            setPasswordError('Password is too short');
            return;
        }
        if (formData.confirmPassword.trim() === ""){
            setPasswordConfirmError('This field is empty');
            return;
        }
        if (isPasswordMismatch){
            setPasswordConfirmError('Passwords do not match');
            return;
        }
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            if (formData.username === 'taken'){
                setUsernameError('This username is taken');
                return;
            }
            onRegisterSuccess();
        }, 1500);
    }

    const isPasswordMismatch = formData.confirmPassword.trim() !== "" && formData.password.trim() !== "" && formData.confirmPassword !== formData.password;

    return (
        <AuthLayout>
            <form className={styles.registrationForm} onSubmit={(event) => handleSubmit(event)} noValidate>
                    <div className={styles.headerInfo}>
                        <h1 className={styles.header}>Create your account</h1>
                        <span className={styles.info}>Sign up to start chatting</span>
                    </div>
                    <AccountDetailsStep
                    username={formData.username} email={formData.email}
                    usernameError={usernameError} emailError={emailError} 
                    isSubmitting = {isSubmitting}
                    handleChange = {handleChange}
                    />
                    <div className={styles.passwordForm}>
                        <PasswordStep
                        password ={formData.password} confirmPassword={formData.confirmPassword}
                        passwordError={passwordError} confirmPasswordError={passwordConfirmError}
                        isSubmitting = {isSubmitting} handleChange={handleChange}
                        />
                    </div>
                    <div className={styles.emailVerification}>
                        <EmailVerificationStep code={formData.code} codeError={codeError}
                        isSubmitting={isSubmitting} handleChange={handleChange}/>
                    </div>
                    <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                        {!isSubmitting ? 'Submit' : 'Creating account...'}
                    </button>
                </form>
                <div className={styles.loginPrompt}>
                    <span>Already have an account?</span>
                    <button type="button" className={styles.logInButton} disabled={isSubmitting} onClick={() => onGoToLogin()}>Log in</button>
                </div>
        </AuthLayout>
                
    );
}

