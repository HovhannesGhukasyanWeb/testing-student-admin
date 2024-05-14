import { useState } from "react";
import Button from "../../../../ui/button";
import Modal from "../../../../ui/modal";
import Form from "./form";
import PropTypes from 'prop-types';

const Edit = ({teacher}) => {
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
                        title={"Edit teacher"}
                    >
                        <Form teacher={teacher} closeModal={() => setIsModalOpen(false)} />
                    </Modal>
                )
            }
        </div>
    );
}
Edit.propTypes = {
    teacher: PropTypes.object.isRequired,
}

export default Edit;