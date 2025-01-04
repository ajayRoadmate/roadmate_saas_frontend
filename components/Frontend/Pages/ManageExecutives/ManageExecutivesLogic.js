
import AddModalModule from "@/components/Frontend/SharedModules/AddModalModule";
import UpdateModalModule from "@/components/Frontend/SharedModules/UpdateModalModule";
import DeleteModalModule from "@/components/Frontend/SharedModules/DeleteModalModule";
import TableModule from "@/components/Frontend/SharedModules/TableModule";
import {TableStateAtom} from "./ManageExecutivesAtom"

export default function ManageExecutivesLogic(){

    const {addModalStates, addModalTasks} = AddModalModule();
    const {updateModalStates, updateModalTasks} = UpdateModalModule();
    const {deleteModalStates, deleteModalTasks} = DeleteModalModule();


    const { tableStates, tableTasks } = TableModule({ TableStateAtom });

    var columnList = [
        {type:'text', name:'executive_id'},
        {type:'text', name:'executive_name'},
        {type:'text', name:'address'},
        {type:'text', name:'phone'},
        {type: 'actions', name: 'actions', 
            actions:[
                {method: action_update, name:'Update'},
                {method: action_delete, name:'Delete'}
            ]
        }
    ];

    var tableOptions = { 
        id: 'executivesTable',
        endPoint: 'distributor_fetchExecutiveTableData',
        columnList: columnList,
        filterInfo: {
            filterIsActive: true,
            filterColumn: '',
            filterState:''
        },
        rowsCount: 10
    }

    function action_update(item){

        var updateItem = {itemKey: "executives.id", itemValue: item.executive_id.value};
        updateModalTasks.openModal(updateItem);

    }
    
    function action_delete(item){

        var deleteItem = {itemKey: "executives.id", itemValue: item.executive_id.value};
        var ModalOptions = {endpoint: 'admin_deleteExecutive', item: deleteItem,modalTitle: "Delete Executive", modalDescription: "Are you sure you want to delete this executive ?"};
        
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


