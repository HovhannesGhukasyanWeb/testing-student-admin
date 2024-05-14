import PropTypes from 'prop-types';

import { useState } from "react";
import Modal from '../../../../ui/modal';
import Form from './form';
import Button from '../../../../ui/button';

const Edit = ({ user }) => {
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
                        title={"Edit user"}

                    >
                        <Form user={user} closeModal={() => setIsModalOpen(false)} />
                    </Modal>
                )
            }
        </div >
    )
}

Edit.propTypes = {
    user: PropTypes.object.isRequired,
}

export default Edit;