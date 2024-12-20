import { atom } from "jotai";

const initialTableState = {
    status: "loading",
    endPoint:"",
    columns: [],
    rows: [],
    rowsCount: 0,
    paginationInfo: {},
    filterInfo: {}
}

export const TableStateAtom = atom(initialTableState);


