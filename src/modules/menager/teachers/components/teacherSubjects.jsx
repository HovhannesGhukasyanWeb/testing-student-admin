import PropTypes from 'prop-types';
import Button from '../../../../ui/button';
import { useState } from 'react';
import Modal from '../../../../ui/modal';
import TeacherSubjectsForm from './teacherSubjectsForm';


const TeacherSubjects = ({teacher}) => {
    const [isModalOpen, setIsModalOpen] = useState();

    return (
        <div>
            <Button variant='warning' onClick={() => setIsModalOpen(true)}>
                Update Subjects
            </Button>
            {
                isModalOpen && (
                    <Modal
                        onClose={() => setIsModalOpen(false)}
                        title={"Update subjects"}
                    >
                        <TeacherSubjectsForm teacher={teacher} closeModal={() => setIsModalOpen(false)}/>
                    </Modal>
                )
            }
        </div>
    );
}

TeacherSubjects.PropTypes = {
    teacher: PropTypes.object.isRequired,
}

export default TeacherSubjects;