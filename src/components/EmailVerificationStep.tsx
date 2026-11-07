import styles  from './EmailVerificationStep.module.css';


interface EmailVerificationStepProps {
    code: string;
    codeError: string;
    isSubmitting: boolean;
    handleChange: (field: 'code', value: string) => void;
}


export const EmailVerificationStep: React.FC<EmailVerificationStepProps> = ({
    code,
    codeError,
    isSubmitting,
    handleChange
}) => {

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.codeForm}>
                <div className={styles.emailVerfifcationInfo}>
                    <h1>Verify your email</h1>
                    <p>We have send you code</p>
                </div>
                <input
                    type="text" 
                    id="username"
                    name ="username"
                    placeholder="Enter code..."
                    value = {code}
                    onChange={(event) => handleChange('code', event?.target.value)}
                    required
                    disabled={isSubmitting}
                />
                </div>
                {
                    codeError !=='' && (
                        <div className={styles.warning}>{codeError}</div>
                    )
                }
        </div>
        
        
    );
}