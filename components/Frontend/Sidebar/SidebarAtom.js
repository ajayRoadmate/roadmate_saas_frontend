import { atom } from 'jotai';

var initalSidebarState = {
    lockIsActive:false,
    isOpen: false,
    subElements: []
};


export const sidebarAtom = atom(initalSidebarState);




