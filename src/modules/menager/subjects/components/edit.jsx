import { useState } from "react";
import Button from "../../../../components/ui/button";
import Modal from "../../../../components/ui/modal";
import Form from "./form";
import PropTypes from 'prop-types';

const Edit = ({subject}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return(
        <div>
            <Button variant='warning' onClick={() => setIsModalOpen(true)}>
                Edit
            </Button>


            {
                isModalOpen && (
                    <Modal
                        onClose={() => setIsModalOpen(false)}
                        title={"Edit subject"}
                    >
                        <Form subject={subject} closeModal={() => setIsModalOpen(false)} />
                    </Modal>
                )
            }
        </div>
    );
}
Edit.propTypes = {
    subject: PropTypes.object.isRequired,
}

export default Edit;