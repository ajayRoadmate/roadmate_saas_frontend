
import AddModalModule from "@/components/Frontend/SharedModules/AddModalModule";
import UpdateModalModule from "@/components/Frontend/SharedModules/UpdateModalModule";
import DeleteModalModule from "@/components/Frontend/SharedModules/DeleteModalModule";
import TableModule from "@/components/Frontend/SharedModules/TableModule";
import {TableStateAtom} from "./ViewProductDetailsAtom"
import { useSearchParams } from 'next/navigation';

export default function ViewProductDetailsLogic(){

    const {addModalStates, addModalTasks} = AddModalModule();
    const {updateModalStates, updateModalTasks} = UpdateModalModule();
    const {deleteModalStates, deleteModalTasks} = DeleteModalModule();
    const { tableStates, tableTasks } = TableModule({ TableStateAtom });
    const searchParams = useSearchParams();
    const productId = searchParams.get('product_id');

    var columnList = [
        {type:'text', name:'variant_id'},
        {type:'text', name:'product_id'},
        {type:'text', name:'purchase_price'},
        {type:'text', name:'mrp'},
        {type:'text', name:'b2b_selling_price'},
        {type:'text', name:'b2c_selling_price'}
    ];

    var tableOptions = { 
        id: 'productDetailsTable',
        endPoint: 'admin_fetchProductDetailsTableData',
        columnList: columnList,
        filterInfo: {
            filterIsActive: true,
            filterColumn: '',
            filterState:''
        },
        rowsCount: 10,
        itemKey: 'product_id',
        itemValue: productId
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


