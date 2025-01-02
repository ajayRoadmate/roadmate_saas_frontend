
import { useState } from 'react';

export default function ModalModule(){

    const [IsModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return {
        modalModuleTasks : {openModal, closeModal, setIsModalOpen},
        modalModuleStates: {IsModalOpen}
    }


}


