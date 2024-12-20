import { useAtom } from 'jotai';
import { sidebarAtom } from "../SidebarAtom";

export default function SidebarSubLogic(data){

    const [sidebarState,setSidebarState] = useAtom(sidebarAtom);
    


    function selectSubSection(){
        
        setSidebarState((currentState)=>{


            var newSubElementsList =  currentState.subElements.map((subElement)=>{

                if(subElement.id == data.id){
                    return {...subElement, isExpand: !subElement.isExpand}
                }
                else{
                    return {...subElement, isExpand: false}
                }
                
            });

            return {...currentState, isOpen: true, subElements: newSubElementsList}
        })
    }

    
    return {selectSubSection, sidebarState, setSidebarState}


}


