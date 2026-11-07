import styles from './RegisterPage.module.css';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordStepProps {
    password: string,
    confirmPassword: string,
    passwordError: string,
    confirmPasswordError: string,
    isSubmitting: boolean;
    handleChange: (field: 'password' | 'confirmPassword', value: string) => void
}

export const PasswordStep: React.FC<PasswordStepProps> =({
    password,
    confirmPassword,
    passwordError,
    confirmPasswordError,
    isSubmitting,
    handleChange
}) => {
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);


    return (
        <div className={styles.pageWrapper}>
            <div className={styles.formGroup}>
                <label htmlFor="username">Password</label>
                <div className={styles.passwordForm}>
                    <input
                    type={!showPassword ? "password" : "text"}
                    id="password"
                    name ="password"
                    placeholder="Enter your password"
                    value = {password}
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
                    passwordError !== '' && (
                        <div className={styles.warning}>{passwordError}</div>
                    )
                }
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="confirmPassword">Confirm your password</label>
                <div className={styles.passwordForm}> 
                    <input
                        type={!showConfirmPassword ? "password" : 'text'} 
                        id="confirmPassword"
                        name ="confirmPassword"
                        placeholder="Confirm your password"
                        value = {confirmPassword}
                        onChange={(event) => handleChange('confirmPassword', event?.target.value)}
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
                    confirmPasswordError !== '' && (
                        <div className={styles.warning}>{confirmPasswordError}</div>
                    )
                }
            </div>
        </div>
    )
}