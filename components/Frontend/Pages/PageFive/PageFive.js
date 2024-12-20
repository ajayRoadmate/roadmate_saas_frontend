'use client';

import Form from "@/components/Frontend/SharedComponents/Form/Form"
import PageFiveLogic from "./PageFiveLogic"

export default function PageFive() {

    const {states,tasks}  = PageFiveLogic();

    return (

        <div className={`w-100 d-flex flex-column`}>

            {/* title section */}
            <div className={`d-flex  `} >
                <div className={`page-title pt-3 pb-3`} >Page Five</div>
            </div>

            {/* form section */}
            <div className={`w-50 d-flex flex-column `} >
                <Form FormState={states.FormState} setFormState={tasks.setFormState} />
            </div>


        </div>

    )
}
