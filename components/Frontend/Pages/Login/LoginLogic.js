import Config from "@/components/Config/Config";
import ApiModule from "../../SharedModules/ApiModule";
import FrontendCookies from "../../SharedModules/FrontendCookies";
import { useRouter } from 'next/navigation';


export default function LoginLogic(){

    const {frontendCookiesTasks} = FrontendCookies();
    const {apiTasks} = ApiModule();
    const router = useRouter();

    
    var baseUrl = Config.URL.apiBaseUrl;


    function login(){

        var endpoint = baseUrl+'testAdminLogin';

        var payload = {
            email:"testemail",
            password:"testPassord"
        };

        apiTasks.sendPostRequest(endpoint,payload)
        .then((response)=>{

            const isSetCookie = frontendCookiesTasks.setCookie("userCookie", {userToken: response.payload.userToken}, 10);

            if(isSetCookie){

                alert("Cookie is set");
                window.location.replace('/dashboard/pageThree');
            }
            else{
                alert("cookie not set");
            }
    

        })
        .catch(alert);
    }

    function distributorLogin(){

        var endpoint = baseUrl+'testDistributorLogin';

        var payload = {
            email:"testemail",
            password:"testPassord"
        };

        apiTasks.sendPostRequest(endpoint,payload)
        .then((response)=>{

            const isSetCookie = frontendCookiesTasks.setCookie("userCookie", {userToken: response.payload.userToken}, 10);

            if(isSetCookie){

                alert("Cookie is set");
                window.location.replace('/distributor/manageShops');
            }
            else{
                alert("cookie not set");
            }
    

        })
        .catch(alert);
    }

    function adminLogin(){

        var endpoint = baseUrl+'testAdminLogin';

        var payload = {
            email:"testemail",
            password:"testPassord"
        };

        apiTasks.sendPostRequest(endpoint,payload)
        .then((response)=>{

            const isSetCookie = frontendCookiesTasks.setCookie("userCookie", {userToken: response.payload.userToken}, 10);

            if(isSetCookie){

                alert("Cookie is set");
                window.location.replace('/dashboard/manageShops');
            }
            else{
                alert("cookie not set");
            }
    

        })
        .catch(alert);
    }

    function showCookie(){

        const cookie = frontendCookiesTasks.getCookie('userCookie');


        console.log("hello cookie");
        console.log(cookie);

    }

    function logout(){

        frontendCookiesTasks.clearCookie('userCookie');

        history.replaceState(null, '', window.location.href);
        router.push('/login');
    }

    
    return {distributorLogin, adminLogin, login,showCookie, logout}


}


