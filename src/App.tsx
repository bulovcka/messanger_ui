import {RegisterPage} from './components/RegisterPage';
import {MessangerPage} from './components/MessangerPage';
import {LoginPage} from './components/LoginPage'
import {useState} from 'react';

export default function App () {
    const [isRegistered, setIsRegistered] = useState(
        () => localStorage.getItem('demoLoggedIn') === 'true'
    );
    const [authPage, setAuthPage] = useState<'login' | 'register'>('register');
    
    return (
        <div>
            {
                isRegistered ? (
                    <MessangerPage />
                ) : authPage === 'login' ? (
                    <LoginPage 
                    onLoginSuccess={() => {
                        localStorage.setItem('demoLoggedIn', 'true');
                        setIsRegistered(true);
                    }} 
                    onGoToRegister={() => setAuthPage('register')}/>
                ) : (
                    <RegisterPage 
                    onRegisterSuccess={() => {
                        localStorage.setItem('demoLoggedIn', 'true');
                        setIsRegistered(true);
                    }}
                    onGoToLogin={() => setAuthPage('login')}/>
                )
            }
            
            
        </div>

        
    );
}