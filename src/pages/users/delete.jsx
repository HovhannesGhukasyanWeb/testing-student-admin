import Button from "../../components/ui/button";
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import ConfirmDialog from "../../components/ui/confirm-dialog";
import { remove as removeUser } from '../../apis/users'
import { AxiosError } from "axios";
import toast from 'react-hot-toast';
import { UsersContext } from ".";
import { useSearchParams } from "react-router-dom";
import baseApi from "../../apis/baseApi";
import { getAxiosConfig } from "../../apis/config";

const Delete = ({ user }) => {
    const [showDialog, setShowDialog] = useState(false);
    const { setUsers, setTotal, setLoading } = useContext(UsersContext);
    const handleDelete = () => {
        setShowDialog(true);
    }
    const [searchParams] = useSearchParams();

    const remove = async () => {
        try {
            await removeUser(user.id);
            toast.success('User removed successfully', {
                position: 'top-right'
            });
            setShowDialog(false);

            (async () => {
                setLoading(true)
                const limit = 10;
                const page = searchParams.get("page") || 1;
                const search = searchParams.get("search") || null;
                const { data: response } = await baseApi.get("/api/admin/users", { ...getAxiosConfig(), params: { limit, page, include: 'role', search } });
                setUsers(response.data);
                setTotal(response.totalData);
                setLoading(false);
            })();
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