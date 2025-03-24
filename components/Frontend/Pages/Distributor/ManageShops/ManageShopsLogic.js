
import AddModalModule from "@/components/Frontend/SharedModules/AddModalModule";
import UpdateModalModule from "@/components/Frontend/SharedModules/UpdateModalModule";
import DeleteModalModule from "@/components/Frontend/SharedModules/DeleteModalModule";
import TableModule from "@/components/Frontend/SharedModules/TableModule";
import { TableStateAtom } from "./ManageShopsAtom";

export default function ManageShopssLogic(){

    const {addModalStates, addModalTasks} = AddModalModule();
    const {updateModalStates, updateModalTasks} = UpdateModalModule();
    const {deleteModalStates, deleteModalTasks} = DeleteModalModule();
    const { tableStates, tableTasks } = TableModule({ TableStateAtom });

    var columnList = [
        {type:'text', name:'shop_id'},
        {type:'text', name:'executive_name'},
        {type:'text', name:'executive_phone'},
        {type:'text', name:'shop_name'},
        {type:'text', name:'address'},
        {type:'text', name:'phone_primary'},
        {type: 'actions', name: 'actions', 
            actions:[
                {method: action_update, name:'Update'}
            ]
        }
    ];

    var tableOptions = { 
        id: 'shopTable',
        endPoint: 'distributor_fetchShopTableData',
        columnList: columnList,
        filterInfo: {
            filterIsActive: true,
            filterColumn: '',
            filterState:''
        },
        rowsCount: 10
    }

    function action_update(item){

        var updateItem = {itemKey: "shops.id", itemValue: item.shop_id.value};
        updateModalTasks.openModal(updateItem);
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


