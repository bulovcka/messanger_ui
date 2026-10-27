import type { ReactNode } from "react";
import styles from "./AuthLayout.module.css"

interface AuthLayoutProps {
    children: ReactNode
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
    children
}) => {
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.pageCard}>
                {children}
            </div>
        </div>
    );
}