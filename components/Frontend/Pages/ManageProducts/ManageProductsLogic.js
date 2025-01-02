
import AddModalModule from "@/components/Frontend/SharedModules/AddModalModule";
import UpdateModalModule from "@/components/Frontend/SharedModules/UpdateModalModule";
import DeleteModalModule from "@/components/Frontend/SharedModules/DeleteModalModule";
import TableModule from "@/components/Frontend/SharedModules/TableModule";
import {TableStateAtom} from "./ManageProductsAtom"

export default function ManageProductsLogic(){

    const {addModalStates, addModalTasks} = AddModalModule();
    const {updateModalStates, updateModalTasks} = UpdateModalModule();
    const {deleteModalStates, deleteModalTasks} = DeleteModalModule();
    const { tableStates, tableTasks } = TableModule({ TableStateAtom });

    var columnList = [
        {type:'text', name:'subscription_id'},
        {type:'text', name:'subscription_name'},
        {type:'text', name:'description'},
        {type:'text', name:'validity'},
        {type:'text', name:'subscription_price'},
        {type: 'actions', name: 'actions', 
            actions:[
                {method: action_details, name:'Details'}
            ]
        }
    ];

    var tableOptions = { 
        id: 'subscriptionTable',
        endPoint: 'admin_fetchSubscriptionTableData',
        columnList: columnList,
        filterInfo: {
            filterIsActive: true,
            filterColumn: '',
            filterState:''
        },
        rowsCount: 10
    }

    function action_details(selectedItem){

        var itemId = selectedItem.product_id.value;
        router.push('manageProductDetails?productId='+itemId);

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


