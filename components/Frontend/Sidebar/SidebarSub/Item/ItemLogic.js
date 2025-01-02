import { useAtom } from "jotai"
import { sidebarAtom } from "../../SidebarAtom"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ItemLogic(itemState){


    const [sidebarState,setSidebarState] = useAtom(sidebarAtom);
    const router = useRouter();
    const [isItemActive, setIsItemActive] = useState(false);

    var ItemIdArr = itemState.id.split('-');
    var sidebarSubElementId = ItemIdArr[0];

    // useEffect(()=>{

    //     const currentPath = window.location.pathname;
    //     const itemPath = '/dashboard/'+itemState.page;

    //     if(currentPath == itemPath){
    //         setIsItemActive(true);
    //     }
       
    // },[]);

    var sidebarSubElementState = sidebarState.subElements.find((item)=>{

        return item.id == sidebarSubElementId;
    });

    function goTo(){

        router.push(itemState.pathname);

    }
    
    return {sidebarState, sidebarSubElementState, itemState, goTo, isItemActive}


}


