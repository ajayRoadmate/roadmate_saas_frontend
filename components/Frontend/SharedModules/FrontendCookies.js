

export default function FrontendCookies(){


    function setCookie(name, value, validityDaysCount) {

        try{

            if(name && value && validityDaysCount){

                
                const cookieValue = typeof value === 'object' ? JSON.stringify(value) : value;

                
                const date = new Date();
                date.setTime(date.getTime() + validityDaysCount * 24 * 60 * 60 * 1000);
                const expires = "; expires=" + date.toUTCString();

                
                document.cookie = name + "=" + cookieValue + expires + "; path=/";
                
                return true;

            }
            else{

                return false;
            }

        } catch (error) {

            console.log(error);
            
            return false; 
        }

    }
    
    function getCookie(name) {

        try {

            const nameEQ = name + "=";

            const cookies = document.cookie.split(';');

            for (let i = 0; i < cookies.length; i++) {

                let cookie = cookies[i].trim();

                if (cookie.indexOf(nameEQ) === 0) {

                    return JSON.parse(cookie.substring(nameEQ.length, cookie.length));
                }
            }

            return null; 

        } catch (error) 
        {
            
            return null; 
        }
    }

    function clearCookie(name) {

        try {

            if (name) {
                
                document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
                return true; 

            } else {

                return false;
            }

        } 
        catch (error) {

            return false; 
        }

    }
    
    // return {setCookie, getCookie, clearCookie}

    return {
        frontendCookiesTasks : {setCookie, getCookie, clearCookie}
    }


}


