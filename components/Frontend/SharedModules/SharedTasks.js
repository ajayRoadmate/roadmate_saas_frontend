import FrontendCookies from './FrontendCookies';
import { useRouter } from 'next/navigation';


export default function SharedTasks(){

    const {frontendCookiesTasks} = FrontendCookies();
    const router = useRouter();

    function logout(){

        frontendCookiesTasks.clearCookie('userCookie');
        window.location.replace('/login');
    }

    return {
        sharedTasks : {logout}
    }

}


