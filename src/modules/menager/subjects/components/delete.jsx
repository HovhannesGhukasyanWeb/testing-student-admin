import { useState } from "react";
import Button from "../../../../components/ui/button";
import ConfirmDialog from "../../../../components/ui/confirm-dialog";
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { removeApi } from "../../../../apis/baseCrudApi";
import { useDispatch } from "react-redux";
import { fetchData } from "../../../../store/slices/tableSlice";
import handleError from "../../../../helpers/handleError";

const Delete = ({subject}) => {

    const [showDialog, setShowDialog] = useState(false);
    const dispatch = useDispatch();

    const handleDelete = () => {
        setShowDialog(true);
    }

    const remove = async () => {
        try{
            await removeApi(`/manager/subjects/${subject.id}`);
            toast.success('User removed successfully', {
                position: 'top-right'
            });
            setShowDialog(false);

            dispatch(fetchData({ endpoint: "/manager/subjects"}));
        }catch(error) {
            handleError(error);
        }
    }

    return (
        <div>
            <Button variant="danger" onClick={handleDelete}>
                Delete
            </Button>
            {showDialog && <ConfirmDialog title="Delete Subject" message={`You are removing subject ${subject.name}. This action is unrevertable.`} onConfirm={remove} closeDialog={() => setShowDialog(false)} />}
        </div>
    )
}

Delete.propTypes = {
    subject: PropTypes.object.isRequired,
}

export default Delete;