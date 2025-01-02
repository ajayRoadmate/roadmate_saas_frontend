
export default function DeleteModalLogic(deleteModalTasks, tableTasks){


    
    async function onDelete(){

        await deleteModalTasks.deleteItem();

        tableTasks.reloadTable();

    }
    
    return {onDelete}


}


