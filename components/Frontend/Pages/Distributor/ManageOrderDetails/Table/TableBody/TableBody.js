import TextCell from "./TableCells/TextCell/TextCell";
import LinkCell from "./TableCells/LinkCell/LinkCell";
import ActionCell from "./TableCells/ActionCell/ActionCell";
import MappedTextCell from "./TableCells/MappedTextCell/MappedTextCell";

export default function TableBody({TableState, tableId}) {  

  return (

        TableState.rows.map((rowElement, rowIndex)=>{
            return(
                <tr key={tableId+'_row_'+rowIndex} >
                    <TextCell data={rowIndex+TableState.paginationInfo.from} />
                    {
                        TableState.columns.map((columnElement,cellIndex)=>{

                            if(columnElement.type == "text"){
                                
                                return(
                                    <TextCell key={tableId+'_cell_'+rowIndex+'_'+cellIndex} data={rowElement[columnElement.name]['value']} />
                                )
                            }
                            if(columnElement.type == "mappedText"){
                                
                                return(
                                    <MappedTextCell key={tableId+'_cell_'+rowIndex+'_'+cellIndex} data={{rowElement: rowElement[columnElement.name], columnElement: columnElement}} />
                                )
                            }
                            else if(columnElement.type == "image"){

                                return(
                                    <LinkCell key={tableId+'_cell_'+rowIndex+'_'+cellIndex}  />
                                )
                            }
                            else if(columnElement.type == "actions"){

                                return(
                                    <ActionCell key={tableId+'_cell_'+rowIndex+'_'+cellIndex} id={tableId+'_cell_'+rowIndex+'_'+cellIndex} rowElement={rowElement} TableState={TableState}  actionState={rowElement[columnElement.name]} />
                                )
                            }
                            else{

                                return(
                                    <td  key={tableId+'_cell_'+rowIndex+'_'+cellIndex}  >No Data To Display</td>
                                )
                            }


                        })
                    }
                </tr>
            )
        })

  );
}