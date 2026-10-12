import {RegisterPage} from './components/RegisterPage';
import {MessangerPage} from './components/MessangerPage';
import {useState} from 'react';

export default function App () {
    const [isRegistered, setIsRegistered] = useState(
        () => localStorage.getItem('demoLoggedIn') === 'true'
    );
    
    return (
        <div>
            {isRegistered ? <MessangerPage/> : <RegisterPage onRegisterSuccess = {() => {
                localStorage.setItem('demoLoggedIn', 'true');
                setIsRegistered(true);
            }}/>}
        </div>
    );
}