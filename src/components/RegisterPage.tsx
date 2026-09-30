import styles from './RegisterPage.module.css';
import { useState } from 'react';


export const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (field: keyof typeof formData, value: string) =>{
        setFormData((previousData) => ({
            ...previousData,
            [field]: value
        }));
    }

    const isPasswordMismatch = formData.confirmPassword.length > 0 && formData.confirmPassword !== formData.password;

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.registrationContainer}>
                <form className={styles.registrationForm}>
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
                            placeholder="enter your username"
                            value = {formData.username}
                            onChange={(event) => handleChange('username', event?.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email" 
                            id="email"
                            name ="email"
                            placeholder="enter your email"
                            value={formData.email}
                            onChange={(event) => handleChange('email', event?.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password" 
                            id="password"
                            name ="password"
                            placeholder="enter your password"
                            value={formData.password}
                            onChange = {(event) => handleChange('password', event?.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="confirm-password">Confirm password</label>
                        <input
                            type="password" 
                            id="confirm-password"
                            name ="confirm-password"
                            placeholder="enter your password again"
                            value={formData.confirmPassword}
                            onChange={(event) => handleChange('confirmPassword', event?.target.value)}
                        />
                    </div>
                    <button type="submit" className={styles.submitButton}>Submit</button>
                    (isPasswordMismatch && (
                        <span className={styles.mismatch}>Your passwords do not match</span>
                    ))
                </form>
                <div className={styles.loginPrompt}>
                    <span>Already have an account?</span>
                    <button type="button" className={styles.logInButton}>Log in</button>
                </div>
            </div>
        </div>
    );
}

