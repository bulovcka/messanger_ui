import styles from "./ProfileSetup.module.css";

interface ProfileSetupProps{
    displayName: string;
    displayNameError: string;
    isSubmitting: boolean;
    handleChange: (field: 'displayName', value: string) => void; 
}

export const ProfileSetup: React.FC<ProfileSetupProps> = ({
    displayName,
    displayNameError,
    isSubmitting,
    handleChange
}) => {
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.displayNameForm}>
                <input
                    type="text" 
                    id="displayName"
                    name ="DisplayName"
                    placeholder="Enter your nickname"
                    value = {displayName}
                    onChange={(event) => handleChange('displayName', event?.target.value)}
                    required
                    disabled={isSubmitting}
                />
                </div>
                {
                    displayNameError !=='' && (
                        <div className={styles.warning}>{displayNameError}</div>
                    )
                }
        </div>
    ); 
}
