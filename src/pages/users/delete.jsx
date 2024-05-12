import Button from "../../components/ui/button";
import PropTypes from 'prop-types';
import { useState } from 'react';
import ConfirmDialog from "../../components/ui/confirm-dialog";
import { remove as removeUser } from '../../apis/users'
import { AxiosError } from "axios";
import toast from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { fetchData } from "../../store/slices/tableSlice";
import { useSearchParams } from "react-router-dom";

const Delete = ({ user }) => {
    const [showDialog, setShowDialog] = useState(false);
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const handleDelete = () => {
        setShowDialog(true);
    }

    const remove = async () => {
        try {
            await removeUser(user.id);
            toast.success('User removed successfully', {
                position: 'top-right'
            });
            setShowDialog(false);



            const limit = 10;
            const page = searchParams.get("page") || 1;
            const search = searchParams.get("search") || null;
            dispatch(fetchData({ endpoint: "/admin/users", params: { limit, page, search, include: 'role&userProfile' } }))
        } catch (error) {
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
            {showDialog && <ConfirmDialog title="Delete User" message={`You are removing user ${user.username}. This action is unrevertable.`} onConfirm={remove} closeDialog={() => setShowDialog(false)} />}
        </div>
    )
}

Delete.propTypes = {
    user: PropTypes.object.isRequired,
}

export default Delete;