

export default function TextCellLogic(){


    function getText(value){

        var valueStr = value.toString();

        if(valueStr.length > 30){

            return valueStr.slice(0, 20)+' ...';
        }
        else{

            return valueStr;
        }

    }

    
    return {getText}


}


