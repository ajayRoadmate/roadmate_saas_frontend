
import AddModalModule from "@/components/Frontend/SharedModules/AddModalModule";
import UpdateModalModule from "@/components/Frontend/SharedModules/UpdateModalModule";
import DeleteModalModule from "@/components/Frontend/SharedModules/DeleteModalModule";
import TableModule from "@/components/Frontend/SharedModules/TableModule";
import {TableStateAtom} from "./ManageChannelPartnersAtom"

export default function ManageChannelPartnersLogic(){

    const {addModalStates, addModalTasks} = AddModalModule();
    const {updateModalStates, updateModalTasks} = UpdateModalModule();
    const {deleteModalStates, deleteModalTasks} = DeleteModalModule();
    const { tableStates, tableTasks } = TableModule({ TableStateAtom });

    var columnList = [
        {type:'text', name:'channel_partner_id'},
        {type:'text', name:'channel_partner_name'},
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
        id: 'channelPartnerTable',
        endPoint: 'admin_fetchChannelPartnerTableData',
        columnList: columnList,
        filterInfo: {
            filterIsActive: true,
            filterColumn: '',
            filterState:''
        },
        rowsCount: 10
    }

    function action_update(item){

        var channelPartnerId = item.channel_partner_id.value;
        var updateItem = {itemKey: 'channel_partners.id',itemValue: channelPartnerId};

        updateModalTasks.openModal(updateItem);

    }
    
    function action_delete(item){

        var deleteItem = {itemKey: "channel_partners.id", itemValue: item.channel_partner_id.value};
        var ModalOptions = {endpoint: 'admin_deleteChannelPartner', item: deleteItem,modalTitle: "Delete Channel Partner", modalDescription: "Are you sure you want to delete this channel partner ?"};
        
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


