
import { atom } from "jotai";

const initalLayoutState = {
    dialogueBox: {
        isActive: false,
        Title: "dialogue title",
        description: "dialogue description"
    }
}

export const LayoutAtom = atom(initalLayoutState);


