import {RegisterPage} from './components/RegisterPage';
import {MessangerPage} from './components/MessangerPage';
import {useState} from 'react';
import { ChatArea } from './components/ChatArea';

export default function App () {
    const [isRegistered, setIsRegistered] = useState<boolean>(false);
    
    return (
        <div>
            {isRegistered ? <MessangerPage/> : <RegisterPage onRegisterSuccess = {() => setIsRegistered(true)}/>}
        </div>
    );
}