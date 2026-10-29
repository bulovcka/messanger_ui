import styles from './LoginPage.module.css';
import { useState } from 'react';
import {Eye, EyeOff} from 'lucide-react';
import { AuthLayout } from './AuthLayout';

interface LoginPageProps{
    onLoginSuccess: () => void;
    onGoToRegister: () => void;
}


export const LoginPage: React.FC<LoginPageProps> = ({
    onLoginSuccess,
    onGoToRegister
}) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [usernameErr, setUsernameErr] = useState<string>('');
    const [passwordErr, setPasswordErr] = useState<string>('');

    const handleChange = (field: keyof typeof formData, value: string) => {
        if (field === 'username'){
            setUsernameErr('');
        } 
        if (field === 'password'){
            setPasswordErr('');
        }

        setFormData((previousData) => ({
            ...previousData,
            [field]: value
        }))
    }

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isSubmitting === true){
            return;
        }
        if (formData.username.trim() === ""){
            setUsernameErr('Enter your username');
            return;
        }
        if (formData.username.length > 25){
            setUsernameErr('Username is too long');
            return;
        }
        if (formData.username.length < 3){
            setUsernameErr('Username is too short');
            return;
        }
        if (!/^[a-zA-Z0-9_]+$/.test(formData.username.trim())){
            setUsernameErr('Username can contain only latin symbols or numbers');
            return;
        }
        if (formData.password === ""){
            setPasswordErr("Password cannot be empty");
            return;
        }
        if (formData.password !== "123"){
            setPasswordErr("Incorrect username or password");
            return;
        }
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            onLoginSuccess();
        }, 1500);
    }
    return (
        <AuthLayout>
            <form className={styles.loginForm} onSubmit={(event) => handleLogin(event)} noValidate>
                    <div className={styles.headerInfo}>
                        <h1 className={styles.header}>Log in your account</h1>
                        <span className={styles.info}>Welcome to your comfortable messanger</span>
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
                            usernameErr !== "" && (
                                <div className={styles.warning}>{usernameErr}</div>
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
                                onChange={(event) => handleChange('password', event?.target.value)}
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
                            passwordErr !== "" && (
                                <div className={styles.warning}>{passwordErr}</div>
                            )
                        }
                    </div>
                    <button type="submit" className={styles.loginButton} disabled={isSubmitting}>
                        {!isSubmitting ? 'Log in' : 'Logging in...'}
                    </button>
                </form>
                <div className={styles.registerPrompt}>
                    <span>Do you have an account</span>
                    <button type="button" className={styles.registerButton} disabled={isSubmitting} onClick={() => onGoToRegister()}>Create it right now</button>
                </div>
        </AuthLayout>
                
    );
}

