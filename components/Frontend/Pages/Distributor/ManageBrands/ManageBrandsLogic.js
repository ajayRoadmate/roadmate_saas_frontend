
import AddModalModule from "@/components/Frontend/SharedModules/AddModalModule";
import UpdateModalModule from "@/components/Frontend/SharedModules/UpdateModalModule";
import DeleteModalModule from "@/components/Frontend/SharedModules/DeleteModalModule";
import TableModule from "@/components/Frontend/SharedModules/TableModule";
import {TableStateAtom} from "./ManageBrandsAtom"

export default function ManageBrandsLogic(){

    const {addModalStates, addModalTasks} = AddModalModule();
    const {updateModalStates, updateModalTasks} = UpdateModalModule();
    const {deleteModalStates, deleteModalTasks} = DeleteModalModule();
    const { tableStates, tableTasks } = TableModule({ TableStateAtom });

    var columnList = [
        {type:'text', name:'brand_id'},
        {type:'text', name:'brand_name'},
        {type: 'actions', name: 'actions', 
            actions:[
                {method: action_update, name:'Update'},
                {method: action_delete, name:'Delete'}
            ]
        }
    ];

    var tableOptions = { 
        id: 'BrandTable',
        endPoint: 'distributor_fetchBrandTableData',
        columnList: columnList,
        filterInfo: {
            filterIsActive: true,
            filterColumn: '',
            filterState:''
        },
        rowsCount: 10
    }

    function action_update(selectedItem){

        var itemId = selectedItem.brand_id.value;
        var item = {itemKey: 'brands.id',itemValue: itemId};

        updateModalTasks.openModal(item);

    }
    
    function action_delete(selectedItem){

        var itemId = selectedItem.brand_id.value;
        var item = {itemKey: "brands.id", itemValue: itemId};
        var ModalOptions = {endpoint: 'distributor_deleteBrand', item: item,modalTitle: "Delete Brand", modalDescription: "Are you sure you want to delete this brand ?"};
        
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


