
import { atom } from "jotai";

const initalPageOneState = {
    tableState: {
        status: "loading",
        data:{
            columns: [],
            columnNames: [],
            rows:[]
        }
    }
}

export const PageOneAtom = atom(initalPageOneState);








