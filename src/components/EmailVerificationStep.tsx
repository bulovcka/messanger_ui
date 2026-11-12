import styles  from './EmailVerificationStep.module.css';


interface EmailVerificationStepProps {
    code: string;
    codeError: string;
    isSubmitting: boolean;
    handleChange: (field: 'code', value: string) => void;
    onCodeResend: () => void;
    codeResetCooldown: number;
}


export const EmailVerificationStep: React.FC<EmailVerificationStepProps> = ({
    code,
    codeError,
    isSubmitting,
    handleChange,
    onCodeResend,
    codeResetCooldown
}) => {

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.codeForm}>
                <input
                    type="text" 
                    id="code"
                    name ="code"
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
                <div className={styles.buttonSection}>
                    <button type='button' className={styles.resendButton}
                    onClick={() => onCodeResend()}
                    disabled={isSubmitting || codeResetCooldown > 0}>
                        {
                            codeResetCooldown > 0 ? `Resend in ${codeResetCooldown}s` : "Resend code"
                        }
                    </button>
                </div>
        </div>
    );
}