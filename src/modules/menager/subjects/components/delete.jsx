import { useState } from "react";
import Button from "../../../../components/ui/button";
import ConfirmDialog from "../../../../components/ui/confirm-dialog";
import PropTypes from 'prop-types';
import { AxiosError } from "axios";
import toast from 'react-hot-toast';
import { removeApi } from "../../../../apis/baseCrudApi";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchData } from "../../../../store/slices/tableSlice";

const Delete = ({subject}) => {

    const [showDialog, setShowDialog] = useState(false);
    let [searchParams] = useSearchParams();
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

            const limit = 10;
            const page = searchParams.get("page") || 1;
            const search = searchParams.get("search") || null;
            dispatch(fetchData({ endpoint: "/manager/subjects", params: { limit, page, search } }));

        }catch(error) {
            if (error instanceof AxiosError) {
                toast.error('Something went wrong. Please try later.');
                return;
            }
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