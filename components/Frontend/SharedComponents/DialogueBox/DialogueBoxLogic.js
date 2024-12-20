import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { DialogueBoxAtom } from '../../SharedModules/SharedAtoms/DialogueBoxAtom';



export default function DialogueBoxLogic(){


    const [mounted, setMounted] = useState(false);
    const [DialogueBoxState, setDialogueBoxState] = useAtom(DialogueBoxAtom);


    function onClose(){

        setDialogueBoxState((currentState)=>{
  
            return{...currentState, isActive: false, title: "", description: ""}
        })
    }
  
    
    useEffect(() => {
  
      setMounted(true);
      return () => setMounted(false);
      
    }, []);

    
    return {mounted, DialogueBoxState, onClose}


}


