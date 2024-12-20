import { useAtom } from 'jotai';
import { DialogueBoxAtom } from './SharedAtoms/DialogueBoxAtom';


export default function DialogueModule(){

    const [DialogueBoxState, setDialogueBoxState] = useAtom(DialogueBoxAtom);

    function openDialogue({title, description}){

        setDialogueBoxState((currentState)=>{
            return{ isActive: true, title: title, description: description}
        });
    }

    function closeDialogue(){

        setDialogueBoxState((currentState)=>{
            return{ isActive: false, title: '', description: ''}
        });
    }

    

    return {
        DialogueBoxState, openDialogue, closeDialogue
    }



}


