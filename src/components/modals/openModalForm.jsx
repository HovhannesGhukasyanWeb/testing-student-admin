import { useState } from "react";
import { Plus } from "lucide-react";
import Modal from "../../ui/modal";
import Button from "../../ui/button";
import PropTypes from 'prop-types';

const OpenModalForm = (prop) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const Form = prop.component;
    
    return(
        <div>
            <Button className="mr-2 flex items-center gap-2" onClick={() => setIsModalOpen(true)}>
                <Plus className="w-4 h-4" />
                <span>{prop.buttonText}</span>
            </Button>

            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)} title={prop.title}>
                    <Form closeModal={() => setIsModalOpen(false)}/>
                </Modal>
            )}
        </div>
    );
}

OpenModalForm.propTypes = {
    buttonText: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    component: PropTypes.any.isRequired
}

export default OpenModalForm;