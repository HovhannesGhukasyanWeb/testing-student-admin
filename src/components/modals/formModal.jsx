import { useState } from "react";
import { Plus } from "lucide-react";
import Modal from "../../ui/modal";
import Button from "../../ui/button";
import PropTypes from 'prop-types';

const FormModal = (prop) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const edit = prop.edit ?? false;
    const defaultTitle = edit ? "Edit" : "Create";
    const Form = prop.component;
    const title = prop.title ?? defaultTitle;

    return (
        <div>
            {edit ? (
                <Button variant='warning' onClick={() => setIsModalOpen(true)}>
                    <span>{prop.buttonText ?? "Edit"}</span>
                </Button>
            ) : (
                <Button className="mr-2 flex items-center gap-2" onClick={() => setIsModalOpen(true)}>
                    <Plus className="w-4 h-4" />
                    <span>{prop.buttonText ?? "Create"}</span>
                </Button>
            )}

            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)} title={title}>
                    <Form closeModal={() => setIsModalOpen(false)} />
                </Modal>
            )}
        </div>
    );
}

FormModal.propTypes = {
    buttonText: PropTypes.string,
    component: PropTypes.any,
    edit: PropTypes.bool,
    title: PropTypes.string
}

export default FormModal;