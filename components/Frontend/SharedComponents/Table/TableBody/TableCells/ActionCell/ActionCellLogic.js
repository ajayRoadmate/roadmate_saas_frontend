import { useState } from "react";


export default function ActionCellLogic(){

    const [isActionsActive, setIsActionsActive] = useState(false);

    function toggleActionSelect(pageIndex){

        setIsActionsActive((currentState)=>{
            return !currentState;
        })
    }
    
    function onMouseLeave(id){

        if(isActionsActive){

            setIsActionsActive(false);
        }
    }

    return {isActionsActive, toggleActionSelect, onMouseLeave}


}


