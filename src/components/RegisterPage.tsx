import styles from './RegisterPage.module.css';
import { useState } from 'react';
import { AuthLayout } from './AuthLayout';
import { AccountDetailsStep} from './AccountDetailsStep';
import { PasswordStep } from './PasswordStep';
import { EmailVerificationStep } from './EmailVerificationStep';
import { ProfileSetup } from './ProfileSetup';


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
        displayName: '',
    })
    
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [usernameError, setUsernameError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [passwordConfirmError, setPasswordConfirmError] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [codeError, setCodeError] = useState<string>('');
    const [registerStep, setRegisterStep] = useState<'account' | 'verification' | 'password' | 'displayName'>('account');
    const [displayNameError, setDisplayNameError] = useState<string>('');

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
        if (field === 'code'){
            setCodeError('');
        }
        if (field === 'displayName'){
            setDisplayNameError('');
        }
        setFormData((previousData) => ({
            ...previousData,
            [field]: value
        }));
    }

    const handleReturn = () => {
        if (registerStep === 'password'){
            setRegisterStep('account');
        }
        if (registerStep === 'verification'){
            setRegisterStep('password');
        }
    };


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isSubmitting === true){
            return;
        }
        if (registerStep === 'account') {
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
            if (formData.username === 'taken'){
                setUsernameError('This username is taken');
                return;
            }
            setRegisterStep('password');
            return;
        }
        if (registerStep ==='password') {
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
            setRegisterStep('verification');
            return;
        }
        if (registerStep === 'verification'){
            if (formData.code.trim() === ''){
                setCodeError('Code cannot be empty');
                return;
            }
            if (formData.code.length !== 6){
                setCodeError('Incorrect code');
                return;
            }
            setRegisterStep('displayName');
        }
        if (registerStep === "displayName") {
            if (formData.displayName.trim() === '') {
                setDisplayNameError('Nickname cannot be empty');
                return;
            }
            if (formData.displayName.length < 3){
                setDisplayNameError('Nickname is too short');
                return;
            }
            if (formData.displayName.length > 25) {
                setDisplayNameError('Nickname is too long');
                return;
            }
            setIsSubmitting(true);
            setTimeout(() => {
                onRegisterSuccess();
                setIsSubmitting(false);
            },1500)
            return;
        }
    }

    const isPasswordMismatch = formData.confirmPassword.trim() !== "" && formData.password.trim() !== "" && formData.confirmPassword !== formData.password;

    return (
        <AuthLayout>
            <form className={styles.registrationForm} onSubmit={(event) => handleSubmit(event)} noValidate>
                    <div className={styles.headerInfo}>
                        <h1 className={styles.header}>
                            {
                                registerStep === 'account' ? 'Create your account'
                                : registerStep === 'password' ? 'Create your password'
                                : registerStep === 'verification' ? 'Verify your email'
                                : 'Enter yor nickname'
                            }
                        </h1>
                        <span className={styles.info}>
                            {
                                registerStep === 'account' ? 'Enter your username and email'
                                : registerStep === 'password' ? 'Choose and confirm your password'
                                : registerStep === 'verification' ? `We've sent a code to your email: ${formData.email}`
                                : 'poka niche ne pridumal'
                            }
                        </span>
                    </div>
                    {
                        (registerStep === 'account') && (
                            <AccountDetailsStep
                            username={formData.username} email={formData.email}
                            usernameError={usernameError} emailError={emailError} 
                            isSubmitting = {isSubmitting}
                            handleChange = {handleChange}
                            />
                        )
                    }
                    {
                        registerStep === 'password' && (
                            <div className={styles.passwordForm}>
                                <PasswordStep
                                password ={formData.password} confirmPassword={formData.confirmPassword}
                                passwordError={passwordError} confirmPasswordError={passwordConfirmError}
                                isSubmitting = {isSubmitting} handleChange={handleChange}
                                />
                            </div>
                        )
                    }
                    {
                        registerStep === "verification" && (
                            <div className={styles.emailVerification}>
                                <EmailVerificationStep code={formData.code} codeError={codeError}
                                isSubmitting={isSubmitting} handleChange={handleChange}
                                />
                            </div>
                        )
                    }
                    {
                        registerStep === 'displayName' && (
                            <div className={styles.displayNameForm}>
                                <ProfileSetup displayName={formData.displayName} displayNameError={displayNameError}
                                isSubmitting={isSubmitting} handleChange={handleChange}
                                />
                            </div>
                        )
                    }
                    <div className={styles.navButtons}>
                        {
                            (registerStep !== 'account' && registerStep !== 'displayName') && (
                                <button type="button" onClick={handleReturn}>Return</button>
                            )
                        }
                        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                            {!isSubmitting ? 'Next' : 'Creating account...'}
                        </button>
                    </div>
                </form>
                <div className={styles.loginPrompt}>
                    <span>Already have an account?</span>
                    <button type="button" className={styles.logInButton} disabled={isSubmitting} onClick={() => onGoToLogin()}>Log in</button>
                </div>
        </AuthLayout>
                
    );
}

