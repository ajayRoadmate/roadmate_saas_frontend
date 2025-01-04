
import AddModalModule from "@/components/Frontend/SharedModules/AddModalModule";
import UpdateModalModule from "@/components/Frontend/SharedModules/UpdateModalModule";
import DeleteModalModule from "@/components/Frontend/SharedModules/DeleteModalModule";
import TableModule from "@/components/Frontend/SharedModules/TableModule";
import {TableStateAtom} from "./ManageDistributorsAtom"

export default function ManageDistributorsLogic(){

    const {addModalStates, addModalTasks} = AddModalModule();
    const {updateModalStates, updateModalTasks} = UpdateModalModule();
    const {deleteModalStates, deleteModalTasks} = DeleteModalModule();
    const { tableStates, tableTasks } = TableModule({ TableStateAtom });


    var columnList = [
        {type:'text', name:'distributor_id'},
        {type:'text', name:'distributor_name'},
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
        id: 'distributorsTable',
        endPoint: 'channelPartner_fetchDistributorTableData',
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
        var ModalOptions = {endpoint: 'deleteDistributor', item: deleteItem,modalTitle: "Delete Distributor", modalDescription: "Are you sure you want to delete this distributor ?"};
        
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


