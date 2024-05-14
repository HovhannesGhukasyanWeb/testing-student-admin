import Button from "../../components/ui/button";
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import ConfirmDialog from "../../components/ui/confirm-dialog";
import { AxiosError } from "axios";
import toast from 'react-hot-toast';
import { RolesContext } from ".";
import { useSearchParams } from "react-router-dom";
import baseApi from "../../apis/baseApi";
import { getAxiosConfig } from "../../apis/config";

const Delete = ({ role }) => {
    const [showDialog, setShowDialog] = useState(false);
    const { setRoles, setTotal, setLoading } = useContext(RolesContext);
    const handleDelete = () => {
        setShowDialog(true);
    }
    const [searchParams] = useSearchParams();

    const remove = async () => {
        try {
            await baseApi.delete(`/api/admin/roles/${role.id}`, { ...getAxiosConfig() });
            toast.success('Role removed successfully', {
                position: 'top-right'
            });
            setShowDialog(false);

            (async () => {
                setLoading(true)
                const limit = 10;
                const page = searchParams.get("page") || 1;
                const search = searchParams.get("search") || null;
                const { data: response } = await baseApi.get("/api/admin/roles", { ...getAxiosConfig(), params: { limit, page, include: 'role', search } });
                setRoles(response.data);
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
            {showDialog && <ConfirmDialog title="Delete Role" message={`You are removing role ${role.name}. This action is unrevertable.`} onConfirm={remove} closeDialog={() => setShowDialog(false)} />}
        </div>
    )
}

Delete.propTypes = {
    role: PropTypes.object.isRequired,
}

export default Delete;