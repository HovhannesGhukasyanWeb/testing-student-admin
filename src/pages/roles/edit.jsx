import PropTypes from 'prop-types';

import { useState } from "react";
import Modal from '../../components/ui/modal';
import Form from './form';
import Button from '../../components/ui/button';

const Edit = ({ role }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <Button variant='warning' onClick={() => setIsModalOpen(true)}>
                Edit
            </Button>

            {
                isModalOpen && (
                    <Modal
                        onClose={() => setIsModalOpen(false)}
                        title={"Edit role"}

                    >
                        <Form id={role.id} closeModal={() => setIsModalOpen(false)} />
                    </Modal>
                )
            }
        </div >
    )
}

Edit.propTypes = {
    role: PropTypes.object.isRequired,
}

export default Edit;