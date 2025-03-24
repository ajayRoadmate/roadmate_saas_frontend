"use client";

import { useRouter } from 'next/router';
import AddModalModule from "@/components/Frontend/SharedModules/AddModalModule";
import UpdateModalModule from "@/components/Frontend/SharedModules/UpdateModalModule";
import DeleteModalModule from "@/components/Frontend/SharedModules/DeleteModalModule";
import TableModule from "@/components/Frontend/SharedModules/TableModule";
import {TableStateAtom} from "./ManageOrderDetailsAtom"
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function ManageOrderDetailsLogic(){

    const INITIAL_CANCEL_MODAL_STATE = {
        endpoint: "",
        item: {},
        modalTitle: "",
        modalDescription: "",
        isOpen: false,
        isInitialized: false
    };

    const {addModalStates, addModalTasks} = AddModalModule();
    const {updateModalStates, updateModalTasks} = UpdateModalModule();
    const {deleteModalStates, deleteModalTasks} = DeleteModalModule();
    const { tableStates, tableTasks } = TableModule({ TableStateAtom });
    const [CancelModalState, setCancelModalState] = useState(INITIAL_CANCEL_MODAL_STATE);

    var columnList = [
        {type:'text', name:'order_details_id'},
        {type:'text', name:'order_id'},
        {type:'text', name:'product_name'},
        {type:'text', name:'b2b_selling_price'},
        {type:'text', name:'purchase_price'},
        {type: 'actions', name: 'actions', 
            actions:[
                {method: action_cancel, name:'Cancel'}
            ]
        }
    ];

    const searchParams = useSearchParams();
    const orderId = searchParams.get('order_id');


    var tableOptions = { 
        id: 'orderDetailsTable',
        endPoint: 'distributor_fetchOrderDetailsTableData',
        columnList: columnList,
        filterInfo: {
            filterIsActive: true,
            filterColumn: '',
            filterState:''
        },
        rowsCount: 10,
        itemKey: 'order_id',
        itemValue: orderId
    }


    function action_cancel(selectedItem){

        var itemId = selectedItem.order_details_id.value;
        var item = {itemKey: 'b2b_order_details.id',itemValue: itemId};

        setCancelModalState((currentState)=>{

            return {...currentState, isOpen: true, endpoint: 'distributor_cancelOrderProduct',item: item, modalTitle: "Cancel Product", modalDescription: "Are you sure you want to cancel this product ?"}
        });
        
    }


    return {
        pageStates:{
            tableStates, tableOptions, addModalStates, updateModalStates, deleteModalStates, CancelModalState
        },
        pageTasks:{
            tableTasks, addModalTasks, updateModalTasks, deleteModalTasks,
            openAddModal: addModalTasks.openModal, openUpdateModal: updateModalTasks.openModal,
            setCancelModalState
        }
    }

}


