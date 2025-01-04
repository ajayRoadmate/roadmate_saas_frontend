"use client";

import { useRouter } from 'next/router';
import AddModalModule from "@/components/Frontend/SharedModules/AddModalModule";
import UpdateModalModule from "@/components/Frontend/SharedModules/UpdateModalModule";
import DeleteModalModule from "@/components/Frontend/SharedModules/DeleteModalModule";
import TableModule from "@/components/Frontend/SharedModules/TableModule";
import {TableStateAtom} from "./ManageOrderDetailsAtom"
import { useSearchParams } from 'next/navigation';

export default function ManageOrderDetailsLogic(){

    const {addModalStates, addModalTasks} = AddModalModule();
    const {updateModalStates, updateModalTasks} = UpdateModalModule();
    const {deleteModalStates, deleteModalTasks} = DeleteModalModule();
    const { tableStates, tableTasks } = TableModule({ TableStateAtom });

    var columnList = [
        {type:'text', name:'order_details_id'},
        {type:'text', name:'order_id'},
        {type:'text', name:'product_name'},
        {type:'text', name:'b2b_selling_price'},
        {type:'text', name:'purchase_price'}
    ];

    const searchParams = useSearchParams();
    const orderId = searchParams.get('order_id');

    var tableOptions = { 
        id: 'orderDetailsTable',
        endPoint: 'admin_fetchOrderDetailsTableData',
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


    return {
        pageStates:{
            tableStates, tableOptions, addModalStates, updateModalStates, deleteModalStates
        },
        pageTasks:{
            tableTasks, addModalTasks, updateModalTasks, deleteModalTasks,
            openAddModal: addModalTasks.openModal, openUpdateModal: updateModalTasks.openModal
        }
    }

}


