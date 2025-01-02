
import Config from "@/components/Config/Config";
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

    var baseUrl = Config.URL.apiBaseUrl;

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
        endPoint: baseUrl+'admin_fetchExecutiveTableData',
        columnList: columnList,
        filterInfo: {
            filterIsActive: true,
            filterColumn: '',
            filterState:''
        },
        rowsCount: 10
    }

    function action_update(item){

        var distributorId = item.distributor_id.value;
        var updateItem = {itemKey: 'distributors.id',itemValue: distributorId};

        updateModalTasks.openModal(updateItem);

    }
    
    function action_delete(item){

        var deleteItem = {itemKey: "distributors.id", itemValue: item.distributor_id.value};
        var ModalOptions = {endpoint: 'deleteDistributor', item: deleteItem,modalTitle: "Delete Executive", modalDescription: "Are you sure you want to delete this executive ?"};
        
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


