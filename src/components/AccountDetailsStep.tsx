import styles from "./RegisterPage.module.css"



interface AccountDetailsStepProps {
    username: string;
    email: string;
    usernameError: string;
    emailError: string;
    isSubmitting: boolean;
    handleChange: (field: 'username' | 'email', value: string) => void;
}

export const AccountDetailsStep: React.FC<AccountDetailsStepProps> = ({
    username,
    email,
    usernameError,
    emailError,
    isSubmitting,
    handleChange
}) => {


    
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.formGroup}>
                <label htmlFor="username">Username</label>
                <input
                    type="text" 
                    id="username"
                    name ="username"
                    placeholder="Enter your username"
                    value = {username}
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
                    value={email}
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
        </div>
        

    ); 
    }
    


    

