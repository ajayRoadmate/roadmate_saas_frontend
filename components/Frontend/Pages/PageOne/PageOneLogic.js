'use client'

import { useAtom } from "jotai";
import TableModule from "../../SharedModules/TableModule";
import { PageOneAtom } from "./PageOneAtom";
import { useEffect } from "react";
import ApiModule from "../../SharedModules/ApiModule";

export default function PageOneLogic(){

    const {tableModuleTasks} = TableModule();
    const {sendPostRequest} = ApiModule();
    const [pageOneState, setPageOneState] = useAtom(PageOneAtom);


    useEffect(initializePage,[]);

    function initializePage(){

        var endPoint = 'http://192.168.0.141/office/RM-API/public/api/testEndpoint';
        var requestBody = {};

        sendPostRequest(endPoint, requestBody)
        .then(testEndpoint_onSuccess)
        .catch(testEndpoint_onFailure);

    }

    function testEndpoint_onSuccess(response){

        var data = response.data;

        var columnsList = [
            {type: 'text', name: 'full_name'},
            {type: 'text', name: 'address'},
            {type: 'text', name: 'pincode'},
            {type: 'actions', name: 'actions', 
                actions:[
                    {method: testAction, name:'Test Action'}, 
                    {method: testActionTwo, name:'testActionTwo'}
                ]
            }
        ];

        var newTableState = tableModuleTasks.getTableState(data, columnsList);

        setPageOneState((currentState)=>{
            return {...currentState, tableState: newTableState}
        });

    }

    function testEndpoint_onFailure(message){

        setPageOneState((currentState)=>{
            return {...currentState, tableState: {...currentState.tableState, status: 'inActive'}}
        })

    }

    function testAction(){

        console.log("hello testAction");
    }

    function testActionTwo(){

        console.log("hello testActionTwo");
    }


    return {pageOneState, testEndpoint_onSuccess}

}  


