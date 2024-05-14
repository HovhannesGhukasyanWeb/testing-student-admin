import { useState } from "react";
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { removeApi } from "../../apis/baseCrudApi";
import { fetchData } from "../../store/slices/tableSlice";
import handleError from "../../helpers/handleError";
import Button from "../../ui/button";
import ConfirmDialog from "../../ui/confirm-dialog";

const DeleteModal = ({ id, message, endpoint, params }) => {

    const [showDialog, setShowDialog] = useState(false);
    const dispatch = useDispatch();

    const handleDelete = () => {
        setShowDialog(true);
    }

    const remove = async () => {
        try {
            await removeApi(`${endpoint}/${id}`);
            toast.success('Removed successfully', {
                position: 'top-right'
            });
            setShowDialog(false);

            dispatch(fetchData({ endpoint, params }));
        } catch (error) {
            handleError(error);
        }
    }

    return (
        <div>
            <Button variant="danger" onClick={handleDelete}>
                Delete
            </Button>
            {showDialog && <ConfirmDialog title="Delete Record" message={message} onConfirm={remove} closeDialog={() => setShowDialog(false)} />}
        </div>
    )
}

DeleteModal.propTypes = {
    id: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    endpoint: PropTypes.string.isRequired,
    params: PropTypes.object,
}

export default DeleteModal;