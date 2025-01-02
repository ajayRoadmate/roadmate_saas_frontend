
import AddModalModule from "@/components/Frontend/SharedModules/AddModalModule";
import UpdateModalModule from "@/components/Frontend/SharedModules/UpdateModalModule";
import DeleteModalModule from "@/components/Frontend/SharedModules/DeleteModalModule";
import TableModule from "@/components/Frontend/SharedModules/TableModule";
import {TableStateAtom} from "./ManageOrdersAtom"
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function ManageOrdersLogic(){

    const INITIAL_CANCEL_MODAL_STATE = {
        endpoint: "",
        item: {},
        modalTitle: "",
        modalDescription: "",
        isOpen: false,
        isInitialized: false
    }

    const {addModalStates, addModalTasks} = AddModalModule();
    const {updateModalStates, updateModalTasks} = UpdateModalModule();
    const {deleteModalStates, deleteModalTasks} = DeleteModalModule();
    const { tableStates, tableTasks } = TableModule({ TableStateAtom });
    const [CancelModalState, setCancelModalState] = useState(INITIAL_CANCEL_MODAL_STATE);
    const router = useRouter();


    var columnList = [
        {type:'text', name:'order_id'},
        {type:'text', name:'order_date'},
        {type:'text', name:'shop_name'},
        {type:'text', name:'distributor_name'},
        {type:'text', name:'executive_name'},
        {type:'text', name:'total_amount'},
        {type:'text', name:'discount'},
        {type:'text', name:'order_status'},
        {type: 'actions', name: 'actions', 
            actions:[
                {method: action_update, name:'Update'},
                {method: action_cancel, name:'Cancel'},
                {method: action_details, name:'Details'}
            ]
        }
    ];

    var tableOptions = { 
        id: 'orderTable',
        endPoint: 'admin_fetchAllOrderTableData',
        columnList: columnList,
        filterInfo: {
            filterIsActive: true,
            filterColumn: '',
            filterState:''
        },
        rowsCount: 10
    }

    function action_update(selectedItem){

        var itemId = selectedItem.order_id.value;
        var item = {itemKey: 'b2b_orders.id',itemValue: itemId};

        updateModalTasks.openModal(item);

    }
    
    function action_cancel(selectedItem){

        var itemId = selectedItem.order_id.value;
        var item = {itemKey: 'b2b_orders.id',itemValue: itemId};
        
        setCancelModalState((currentState)=>{

            return {...currentState, isOpen: true, endpoint: 'admin_cancelOrder',item: item, modalTitle: "Cancel Order", modalDescription: "Are you sure you want to cancel this order ?"}
        });
        
    }

    function action_details(selectedItem){

        var itemId = selectedItem.order_id.value;
        router.push('manageOrderDetails?order_id='+itemId);
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


