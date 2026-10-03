import styles from './RegisterPage.module.css';
import { useState } from 'react';


export const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const isPasswordMismatch = formData.confirmPassword.length > 0 && formData.confirmPassword !== formData.password;
    const [validateUsername, setValidateUsername] = useState<boolean>(true);
    const [validateEmail, setValidateEmail] = useState<boolean>(true);
    const [validatePassword, setValidatePassword] = useState<boolean>(true);
    const [validateConfirmPassword, setValidateConfirmPassword] = useState<boolean>(true);


    const handleChange = (field: keyof typeof formData, value: string) =>{
        if (field === "username"){
            setValidateUsername(true);
        }
        if (field === "email"){
            setValidateEmail(true);
        }
        if (field === "password"){
            setValidatePassword(true);
        }
        if (field === "confirmPassword"){
            setValidateConfirmPassword(true);
        }
        setFormData((previousData) => ({
            ...previousData,
            [field]: value
        }));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isPasswordMismatch === true){
            return;
        }
        if (formData.username.trim() === ""){
            setValidateUsername(false);
            return;
        }
        if (formData.email.trim() === ""){
            setValidateEmail(false);
            return;
        }
        if (formData.password.trim() === ""){
            setValidatePassword(false);
            return;
        }
        if (formData.confirmPassword.trim() === ""){
            setValidateConfirmPassword(false);
            return;
        }
        console.log('it works');
    }

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
                            
                        />
                        {
                            !validateUsername && (
                                <div className={styles.usernameWarning}>username is empty</div>
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
                            
                        />
                        {
                            !validateEmail && (
                                <div className={styles.usernameWarning}>email is empty</div>
                            )
                        }
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password" 
                            id="password"
                            name ="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange = {(event) => handleChange('password', event?.target.value)}
                            required
                            
                        />
                        {
                            !validatePassword && (
                                <div className={styles.usernameWarning}>password is empty</div>
                            )
                        }
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="confirm-password">Confirm password</label>
                        <input
                            type="password" 
                            id="confirm-password"
                            name ="confirm-password"
                            placeholder="Enter your password again"
                            value={formData.confirmPassword}
                            onChange={(event) => handleChange('confirmPassword', event?.target.value)}
                            required
                            
                        />
                        {
                            !validateConfirmPassword && (
                                <div className={styles.usernameWarning}>password is empty</div>
                            )
                        }
                    </div>
                    {
                        isPasswordMismatch && (
                            <span className={styles.mismatch}>Passwords do not match</span>
                        )
                    }
                    <button type="submit" className={styles.submitButton}>Submit</button>
                </form>
                <div className={styles.loginPrompt}>
                    <span>Already have an account?</span>
                    <button type="button" className={styles.logInButton}>Log in</button>
                </div>
            </div>
        </div>
    );
}

