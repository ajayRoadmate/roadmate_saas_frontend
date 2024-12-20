
import { useAtom } from "jotai";
import {TableStateAtom} from "./ManageExecutivesAtoms";
import Config from "@/components/Config/Config";
import AddModalModule from "../../SharedModules/AddModalModule";
import UpdateModalModule from "../../SharedModules/UpdateModalModule";
import DeleteModalModule from "../../SharedModules/DeleteModalModule";

export default function ManageExecutivesLogic(){

    const [TableState, setTableState] = useAtom(TableStateAtom);
    const {addModalStates, addModalTasks} = AddModalModule();
    const {updateModalStates, updateModalTasks} = UpdateModalModule();
    const {deleteModalStates, deleteModalTasks} = DeleteModalModule();


    var columnList = [
        {type:'text', name:'product_id'},
        {type:'text', name:'product_name'},
        {type:'text', name:'brand_id'},
        {type: 'actions', name: 'actions', 
            actions:[
                {method: action_update, name:'Update'},
                {method: action_delete, name:'Delete'}
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

    function action_update(item){
            
        var productId = item.product_id.value;
        var updateModalOptions = {itemKey: 'tbl_brand_products.id',itemValue: productId};

        updateModalTasks.openModal(updateModalOptions);

    }
    
    function action_delete(item){

        var deleteItem = {itemKey: "tbl_brand_products.id", itemValue: item.product_id.value};
        var ModalOptions = {endpoint: 'fetchUpdateProductFormData', item: deleteItem,modalTitle: "Delete Executive", modalDescription: "Are you sure you want to delete this executive ?"};
        
        deleteModalTasks.openModal(ModalOptions);

        
    }

    return {
        states: {
            TableState,tableOptions, addModalStates, updateModalStates, deleteModalStates
        },
        tasks: {
            setTableState, addModalTasks, updateModalTasks, deleteModalTasks,
            openAddModal: addModalTasks.openModal, openUpdateModal: updateModalTasks.openModal
        }
    }

}


