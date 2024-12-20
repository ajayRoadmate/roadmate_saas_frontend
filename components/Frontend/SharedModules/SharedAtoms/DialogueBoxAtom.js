
import { atom } from "jotai";

const initalDialogueBoxState = {
    isActive: false,
    title: "",
    description: ""
}

export const DialogueBoxAtom = atom(initalDialogueBoxState);

