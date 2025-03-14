import Config from "@/components/Config/Config";
import ApiModule from "../../SharedModules/ApiModule";
import FrontendCookies from "../../SharedModules/FrontendCookies";
import { useRouter } from 'next/navigation';
import { decodeJwt } from 'jose';

export default function LoginLogic(){

    const {frontendCookiesTasks} = FrontendCookies();
    const {apiTasks} = ApiModule();
    const router = useRouter();

    function login(event){

        event.preventDefault();

        var form = document.getElementById('loginForm');
        var formData = new FormData(form);

        var apiBaseUrl = Config.URL.apiBaseUrl;
        var endPoint = apiBaseUrl + 'Login';

        var isFormValid = form.checkValidity();
        form.classList.add('was-validated');

        if (isFormValid){

            apiTasks.sendFormData(endPoint,formData)
            .then((response)=>{

                var userType = getUserType(response.user_token);
                onLoginSuccess(userType, response.user_token);

            })
            .catch((message)=>{
    
                alert(message);
            });

        }
        else{

            alert('Form is not valid');
        }

    }

    function onLoginSuccess(userType, userToken){

        if(userType == 1){

            const isSetCookie = frontendCookiesTasks.setCookie("userCookie", {userToken: userToken}, 10);

            if(isSetCookie){

                window.location.replace('/dashboard/manageDistributors');

            }
            else{
                alert("Login failed,cookie not set");
            }

        }
        else if(userType == 2){

            alert("Login disabled for this user.");

        }
        else if(userType == 3){

            const isSetCookie = frontendCookiesTasks.setCookie("userCookie", {userToken: userToken}, 10);

            if(isSetCookie){

                window.location.replace('/distributor/info');

            }
            else{
                alert("Login failed,cookie not set");
            }

        }
        else if(userType == 4){

            const isSetCookie = frontendCookiesTasks.setCookie("userCookie", {userToken: userToken}, 10);

            if(isSetCookie){

                window.location.replace('channelPartner/info');

            }
            else{
                alert("Login failed,cookie not set");
            }
        }
        else{

            alert("Failed to login user.");
        }

    }

    function getUserType(userToken){

        const userInfo = decodeJwt(userToken);
        return userInfo.userType;
    }


    
    return {
        pageTasks:{
            login:login
        },
        pageState:{}
    }

}


