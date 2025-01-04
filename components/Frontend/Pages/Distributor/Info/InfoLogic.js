import Config from "@/components/Config/Config";
import ApiModule from "@/components/Frontend/SharedModules/ApiModule";
import { useEffect, useState } from "react"
import FrontendCookies from "@/components/Frontend/SharedModules/FrontendCookies";


export default function InfoLogic(){

    const {apiTasks} = ApiModule();
    const [Info, setInfo] = useState({});

    useEffect(()=>{

        initialize();

    },[]);

    async function initialize(){

        var path = Config.URL.apiBaseUrl + 'distributor_info';
        var params = {};

        const userToken = await getUserToken();
        var headers = {};

        if(userToken){
            var headers = {
                'Content-Type': 'application/json',
                'user-token': userToken
            };
        }

        apiTasks.sendGetRequest(path, params, headers)
        .then((response)=>{

            setInfo(response.payload);
        })
        .catch(apiTasks.request_onFailure);

    }

    async function  getUserToken(){ 
    
        try {

            const TOKEN_ISSUER = 'roadMate';
            const {frontendCookiesTasks} = FrontendCookies();
            const userCookie = frontendCookiesTasks.getCookie('userCookie');



            if(userCookie){

                const userToken  = userCookie.userToken;
                return userToken;
    
            }
            else{

                return false;
            }
    
        } 
        catch (error) {

            return false;
        }
    
    }

    return {Info}


}


