"use client";

import { useEffect } from "react";
import { sidebarAtom } from "./SidebarAtom";
import { useAtom } from 'jotai';
import SidebarConfig from "@/components/Config/SidebarConfig";
import FrontendCookies from "../SharedModules/FrontendCookies";
import Config from "@/components/Config/Config";
import { decodeJwt } from 'jose';
import { usePathname } from 'next/navigation';



export default function SidebarLogic(){


    const [sidebarState,setSidebarState] = useAtom(sidebarAtom);
    const pathname = usePathname();

    useEffect(initializeSidbar,[]);
    useEffect(onPathChange, [pathname]);
    

    function initializeSidbar(){

        loadSidebarData();

        var sidebarWrapperDiv = document.getElementById('sidebar_wrapper');
        
        sidebarWrapperDiv.addEventListener('mouseenter',openSidebar);
        sidebarWrapperDiv.addEventListener('mouseleave', closeSidebar);
    }

    function openSidebar(){

        setSidebarState((sidebarState)=>{ return {...sidebarState, isOpen: true}});
    }

    function closeSidebar(){

        setSidebarState((sidebarState)=>{ return {...sidebarState, isOpen: false}});
    }

    function toggleState(){

        setSidebarState((sidebarState)=>{ return {...sidebarState, isOpen: !sidebarState.isOpen}});
    }

    function toggleSidebarLock(){

        setSidebarState((sidebarState)=>{ return {...sidebarState, lockIsActive: !sidebarState.lockIsActive}});
    }

    async function loadSidebarData(){


        try{

            let sidebarSubElements = [];
            const userInfo = await getUserInfo();

            if(userInfo){

                let userType = userInfo.userType;

                if(userType == Config.USER_TYPES.admin){
    
                    sidebarSubElements = getInitialSubElements(SidebarConfig.ADMIN);
                }
                else if(userType == Config.USER_TYPES.bdm){
    
                    sidebarSubElements = getInitialSubElements(SidebarConfig.BDM);
                }
                else if(userType == Config.USER_TYPES.distributor){
    
                    sidebarSubElements = getInitialSubElements(SidebarConfig.DISTRIBUTOR);
                }
                else if(userType == Config.USER_TYPES.channelPartner){
    
                    sidebarSubElements = getInitialSubElements(SidebarConfig.CHANNEL_PARTNER);
                }
            }

            setSidebarState((currentState)=>{
                return {...currentState, subElements: sidebarSubElements}
            });

        }
        catch(error){

            const sidebarLoadingError = error;
        }

    }

    async function  getUserInfo(){ 
    
        try {

            const TOKEN_ISSUER = 'roadMate';
            const {frontendCookiesTasks} = FrontendCookies();
            const userCookie = frontendCookiesTasks.getCookie('userCookie');

            if(userCookie){
    
                const userToken  = userCookie.userToken

                const payload = decodeJwt(userToken);

                if(payload.iss == TOKEN_ISSUER){
        
                    return payload;
        
                }
                else{
                    return false;
                }
    
            }
            else{
                return false;
            }
    
        } 
        catch (error) {

            return false;
        }
    
    }

    function onPathChange(){


        setSidebarState((currentState)=>{

            var newSubElements = currentState.subElements.map((subElement)=>{

                var newItems = subElement.items.map((item)=>{

                    if(item.pathname == pathname){

                        return {...item, isActive: true};
                    }
                    else{
                        return {...item, isActive: false};
                    }
                });

                return {...subElement, items: newItems};

            });

            return {...currentState, subElements: newSubElements};

        })

        // console.log("path changed");
        // console.log('Navigated to:', pathname);
    }

    function getInitialSubElements(subElements){

        return subElements.map((subElement)=>{

            var newItems = subElement.items.map((item)=>{

                if(item.pathname == pathname){

                    return {...item, isActive: true};
                }
                else{
                    return {...item, isActive: false};
                }
            });

            return {...subElement, items: newItems};

        });

    }
     


    return {toggleState, sidebarState, toggleSidebarLock};


}


