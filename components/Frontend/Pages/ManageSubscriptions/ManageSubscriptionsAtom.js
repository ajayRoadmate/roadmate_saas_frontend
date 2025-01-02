import { atom } from "jotai";

const initialTableState = {
    id:"",
    status: "loading",
    endPoint:"",
    columns: [],
    rows: [],
    rowsCount: 0,
    paginationInfo: {},
    filterInfo: {},
    search:"",
}

export const TableStateAtom = atom(initialTableState);
