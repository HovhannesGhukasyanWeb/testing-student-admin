import PropTypes from 'prop-types';
import Button from '../../../../ui/button';
import ConfirmDialog from '../../../../ui/confirm-dialog';
import { useState } from 'react';
import handleError from '../../../../helpers/handleError';
import { updateApi } from '../../../../apis/baseCrudApi';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchData } from '../../../../store/slices/tableSlice';
import params from '../utils/params';

const Actions = ({ groupStudent, otherStudentIds = [] }) => {
    const [showDialog, setShowDialog] = useState(false);
    const dispatch = useDispatch();
    const { id } = useParams();

    const handleDelete = () => {
        setShowDialog(true);
    }

    const remove = async () => {
        try {
            await updateApi('/manager/group/students/' + id, { user_ids: otherStudentIds.filter(studentId => studentId !== groupStudent.user.id) });
            setShowDialog(false);
            dispatch(fetchData({ endpoint: "/manager/groups/" + id, params }));
        } catch (error) {
            handleError(error)
        }
    }

    return (
        <div>
            <Button variant="danger" onClick={handleDelete}>
                Delete
            </Button>
            {showDialog && <ConfirmDialog title="Delete Record" message={`You are removing ${groupStudent.user.username}`} onConfirm={remove} closeDialog={() => setShowDialog(false)} />}
        </div>
    )
}

Actions.propTypes = {
    groupStudent: PropTypes.object,
    otherStudentIds: PropTypes.array,
}

export default Actions;