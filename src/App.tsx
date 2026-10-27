import {RegisterPage} from './components/RegisterPage';
import {MessangerPage} from './components/MessangerPage';
import {LoginPage} from './components/LoginPage'
import {useState} from 'react';
import {WelcomePage} from './components/WelcomePage'

export default function App () {
    const [isRegistered, setIsRegistered] = useState(
        () => localStorage.getItem('demoLoggedIn') === 'true'
    );
    const [authPage, setAuthPage] = useState<'welcome' | 'login' | 'register'>('welcome');
    
    return (
        <div>
            {
                isRegistered ? (
                    <MessangerPage />
                ) : authPage === 'welcome' ? (
                    <WelcomePage onGoToLogin={() => setAuthPage('login')} onGoToRegister={() => setAuthPage('register')}/>
                ) : (
                    authPage === 'login' ? (
                        <LoginPage onLoginSuccess={() => {
                            localStorage.setItem('demoLoggedIn', 'true')
                            setIsRegistered(true)
                        }}
                        onGoToRegister={() => setAuthPage('register')}/>
                    ) : (
                        <RegisterPage onRegisterSuccess={() => {
                            localStorage.setItem('demoLoggedIn', 'true')
                            setIsRegistered(true)
                        }}
                        onGoToLogin={() => setAuthPage('login')}/>
                    )
                )
            }
            
            
        </div>

        
    );
}