

import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import Config from './components/Config/Config';

export async function middleware(request) {


    var isStaticFileRequest = check_isStaticFileRequest();
    var isLoginPath = check_isLoginPath();

    // if(!isStaticFileRequest && !isLoginPath){

    //     var userToken = getUserToken(); 

    //     if(userToken){

    //         var userInfo = await getUserInfo(userToken);

    //         if(userInfo){

    //             var isUserAuthorized = check_isUserAuthorized(userInfo);

    //             if(isUserAuthorized){

    //                 return NextResponse.next();
    //             }
    //             else{
    //                 return NextResponse.rewrite(new URL('/404', request.url));
    //             }

    //         }
    //         else{

    //             return NextResponse.redirect(new URL('/login', request.url));
    //         }
    //     }
    //     else{

    //         return NextResponse.redirect(new URL('/login', request.url));        
    //     }
    // }

    function check_isStaticFileRequest(){

        if(request.nextUrl.pathname.startsWith('/_next/static')){

            return true;
        }
        else if(request.nextUrl.pathname.startsWith('/favicon.ico')){
        
            return true;
        }
        else{
            return false;
        }
    }

    function check_isLoginPath(){

        if(request.nextUrl.pathname.startsWith('/login')){

            return true;
        }
        else{
            return false;
        }
    }

    function getUserToken(){

        var userCookie = request.cookies.get('userCookie');

        if( userCookie && userCookie.value){

            var cookieValue = JSON.parse(userCookie.value);
            var userToken = cookieValue.userToken;

            if(userToken){

                return userToken;
            }
            else{
                return false;
            } 
        }
        else{
            return false;
        }

    }

    async function  getUserInfo(userToken){ 

        const SECRET_KEY = 'testSecret'; 
        const TOKEN_ISSUER = 'roadMate';

        try {

            const { payload } = await jwtVerify(userToken, new TextEncoder().encode(SECRET_KEY), {
                algorithms: ['HS256'],
            });


            if(payload.iss == TOKEN_ISSUER){

                return payload;

            }
            else{
                return false;
            }

        } 
        catch (error) {

            return false;
        }

    }

    function check_isUserAuthorized(userInfo){

        var requestedPath = request.nextUrl.pathname;

        if(userInfo.userType == Config.USER_TYPES.admin){

            if (Config.ACCESS_PAGES.admin.includes(requestedPath)) {

                return true; 

            } else {

                return false; 
            }

        }
        else if(userInfo.userType == Config.USER_TYPES.bdm){

            if (Config.ACCESS_PAGES.bdm.includes(requestedPath)) {

                return true; 

            } else {

                return false; 
            }

        }
        else{

            return false; 
        }
        
    }
    
    
}

