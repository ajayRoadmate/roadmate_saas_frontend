
import AddModalModule from "@/components/Frontend/SharedModules/AddModalModule";
import UpdateModalModule from "@/components/Frontend/SharedModules/UpdateModalModule";
import DeleteModalModule from "@/components/Frontend/SharedModules/DeleteModalModule";
import TableModule from "@/components/Frontend/SharedModules/TableModule";
import {TableStateAtom} from "./ViewProductsAtom"
import { useRouter } from 'next/navigation';

export default function ViewProductsLogic(){

    const {addModalStates, addModalTasks} = AddModalModule();
    const {updateModalStates, updateModalTasks} = UpdateModalModule();
    const {deleteModalStates, deleteModalTasks} = DeleteModalModule();
    const { tableStates, tableTasks } = TableModule({ TableStateAtom });
    const router = useRouter();

    var columnList = [
        {type:'text', name:'product_id'},
        {type:'text', name:'product_name'},
        {type:'text', name:'category_name'},
        {type:'text', name:'brand_name'},
        {type:'text', name:'distributor_name'},
        {type: 'actions', name: 'actions', 
            actions:[
                {method: action_details, name:'Details'},
                {method: action_update, name:'Update'}
            ]
        }
    ];

    var tableOptions = { 
        id: 'subscriptionTable',
        endPoint: 'distributor_fetchProductTableData',
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
        router.push('viewProductDetails?product_id='+itemId);

    }

    function goToAddProductPage(){

        router.push('addProduct');
    }

    function action_update(selectedItem){

        var itemId = selectedItem.product_id.value;
        router.push('updateProduct?product_id='+itemId);
    }
    


    return {
        pageStates:{
            tableStates, tableOptions, addModalStates, updateModalStates, deleteModalStates
        },
        pageTasks:{
            tableTasks, addModalTasks, updateModalTasks, deleteModalTasks,goToAddProductPage
        }
    }

}


