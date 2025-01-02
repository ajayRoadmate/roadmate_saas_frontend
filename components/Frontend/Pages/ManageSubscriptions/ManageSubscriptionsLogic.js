
import AddModalModule from "@/components/Frontend/SharedModules/AddModalModule";
import UpdateModalModule from "@/components/Frontend/SharedModules/UpdateModalModule";
import DeleteModalModule from "@/components/Frontend/SharedModules/DeleteModalModule";
import TableModule from "@/components/Frontend/SharedModules/TableModule";
import {TableStateAtom} from "./ManageSubscriptionsAtom"

export default function ManageSubscriptionsLogic(){

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
                {method: action_update, name:'Update'},
                {method: action_delete, name:'Delete'}
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

    function action_update(selectedItem){

        var itemId = selectedItem.subscription_id.value;
        var item = {itemKey: 'saas_subscriptions.id',itemValue: itemId};

        updateModalTasks.openModal(item);

    }
    
    function action_delete(selectedItem){

        var itemId = selectedItem.subscription_id.value;
        var item = {itemKey: "saas_subscriptions.id", itemValue: itemId};
        var ModalOptions = {endpoint: 'admin_deleteSubscription', item: item,modalTitle: "Delete Subscription", modalDescription: "Are you sure you want to delete this subscription ?"};
        
        deleteModalTasks.openModal(ModalOptions);
        
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


