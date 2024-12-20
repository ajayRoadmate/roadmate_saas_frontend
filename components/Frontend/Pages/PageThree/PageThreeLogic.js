

import { useAtom } from "jotai";
import {TableStateAtom} from "./PageThreeAtoms";
import Config from "@/components/Config/Config";

export default function PageThreeLogic(){

    const [TableState, setTableState] = useAtom(TableStateAtom);

    var columnList = [
        {type:'text', name:'product_id'},
        {type:'text', name:'product_name'},
        {type:'text', name:'brand_id'},
        {type: 'actions', name: 'actions', 
            actions:[
                {method: viewMethod, name:'Test Action'}
            ]
        }
    ];


    var baseUrl = Config.URL.apiBaseUrl;


    var tableOptions = { 
        id: 'table_id',
        endPoint: baseUrl+'testFetchProductsTable',
        columnList: columnList,
        filterInfo: {
            filterIsActive: true,
            filterColumn: '',
            filterState:''
        },
        rowsCount: 10
    }

    function viewMethod(){
        console.log("hello view method");
    }

    return {
        states: {TableState,tableOptions},
        tasks: {setTableState}
    }



}


