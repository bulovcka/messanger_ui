import styles from './RegisterPage.module.css';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';


interface RegisterPageProps{
    onRegisterSuccess: () => void;
}


export const RegisterPage: React.FC<RegisterPageProps> = ({
    onRegisterSuccess
}) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [usernameError, setUsernameError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [passwordConfirmError, setPasswordConfirmError] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');


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
        <div className={styles.pageWrapper}>
            <div className={styles.registrationContainer}>
                <form className={styles.registrationForm} onSubmit={(event) => handleSubmit(event)} noValidate>
                    <div className={styles.headerInfo}>
                        <h1 className={styles.header}>Create your account</h1>
                        <span className={styles.info}>Sign up to start chatting</span>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text" 
                            id="username"
                            name ="username"
                            placeholder="Enter your username"
                            value = {formData.username}
                            onChange={(event) => handleChange('username', event?.target.value)}
                            required
                            disabled={isSubmitting}
                            
                        />
                        {
                            usernameError !== '' && (
                                <div className={styles.warning}>{usernameError}</div>
                            )
                        }
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email" 
                            id="email"
                            name ="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(event) => handleChange('email', event?.target.value)}
                            required
                            disabled={isSubmitting}
                        />
                        {
                            (emailError !== '') && (
                                <div className={styles.warning}>{emailError}</div>
                            )
                        }
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <div className={styles.passwordForm}>
                            <input
                                type={showPassword ? 'text' : 'password'} 
                                id="password"
                                name ="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange = {(event) => handleChange('password', event?.target.value)}
                                required
                                disabled={isSubmitting}
                            />
                            
                            <button type='button' className={styles.viewButton} onClick={() => setShowPassword(previous => !previous)}>
                                {
                                    !showPassword ? <Eye size={15}/> : <EyeOff size={15}/>
                                }
                            </button>
                        </div>
                        {
                            passwordError !== '' && (
                                <div className={styles.warning}>{passwordError}</div>
                            )
                        }
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="confirm-password">Confirm password</label>
                        <div className={styles.passwordForm}>
                            <input
                                type={showConfirmPassword ? 'text' : 'password'} 
                                id="confirm-password"
                                name ="confirm-password"
                                placeholder="Enter your password"
                                value={formData.confirmPassword}
                                onChange = {(event) => handleChange('confirmPassword', event?.target.value)}
                                required
                                disabled={isSubmitting}
                            />
                            
                            <button type='button' className={styles.viewButton} onClick={() => setShowConfirmPassword(previous => !previous)}>
                                {
                                    !showConfirmPassword ? <Eye size={15}/> : <EyeOff size={15}/>
                                }
                            </button>
                        </div>
                        {
                            passwordConfirmError !== '' && (
                                <div className={styles.warning}>{passwordConfirmError}</div>
                            )
                        }
                    </div>
                    <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                        {!isSubmitting ? 'Submit' : 'Creating account...'}
                    </button>
                </form>
                <div className={styles.loginPrompt}>
                    <span>Already have an account?</span>
                    <button type="button" className={styles.logInButton}>Log in</button>
                </div>
            </div>
        </div>
    );
}

