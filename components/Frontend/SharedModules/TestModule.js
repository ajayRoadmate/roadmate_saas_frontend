import { useAtom } from 'jotai';
import { DialogueBoxAtom } from '@/app/(dashboard)/DialogueBoxAtom';


export default function TestModule(){

    const [DialogueBoxState, setDialogueBoxState] = useAtom(DialogueBoxAtom);

    function openDialogue(customTitle, customDescription){

        setDialogueBoxState((currentState)=>{
            return{ isActive: true, title: "test", description: "test"}
        });
    }


    return {
        testModuleTasks : {openDialogue},
        testModuleStates: {DialogueBoxState}
    }

}


