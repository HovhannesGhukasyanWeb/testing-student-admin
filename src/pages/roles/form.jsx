import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import baseApi from '../../apis/baseApi';
import { getAxiosConfig } from '../../apis/config';
import { show, store, update } from '../../apis/roles';
import { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { RolesContext } from '.';
import { useSearchParams } from 'react-router-dom';
import { get as getPermissions } from '../../apis/permissions';
import Label from '../../components/ui/label';
import Input from '../../components/ui/input';
import Switch from "react-switch";

const errorsInitialState = {
    name: null
};

const dataInitialState = {
    name: "",
    role_permissions: [],
}

const Form = ({ id = null, closeModal = () => { } }) => {
    const isEditing = id !== null ? true : false;
    const [data, setData] = useState(dataInitialState);
    const [errors, setErrors] = useState(errorsInitialState);
    const [loading, setLoading] = useState(false);
    const [allPermissions, setAllPermissions] = useState({});
    const [isContentLoading, setIsContentLoading] = useState(false);
    const { setRoles, setTotal, setLoading: setTableLoading } = useContext(RolesContext);
    let [searchParams] = useSearchParams();

    useEffect(() => {
        if (id) {
            (async () => {
                setIsContentLoading(true);
                const { data: response } = await show(id);

                setData({
                    name: response.data?.name,
                    role_permissions: response.data.role_permissions.map(({ id }) => id) ?? []
                });

                setIsContentLoading(false);
            })();
        }
    }, [id]);

    useEffect(() => {
        (async () => {
            const { data: response } = await getPermissions();
            const permissions = Object.groupBy(response.data, ({ title }) => title);
            setAllPermissions(permissions);
        })();
    }, []);

    const saveHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setErrors(errorsInitialState);
            if (isEditing) {
                await update(id, data);
                toast.success("User updated successfully", {
                    position: "top-right"
                });
            } else {
                await store(data);
                toast.success("User created successfully", {
                    position: "top-right"
                });
            }

            closeModal();
            setData(dataInitialState);
            (async () => {
                setTableLoading(true)
                const limit = 10;
                const page = searchParams.get("page") || 1;
                const search = searchParams.get("search") || null;
                const { data: response } = await baseApi.get("/api/admin/roles", { ...getAxiosConfig(), params: { limit, page, include: 'role', search } });
                setRoles(response.data);
                setTotal(response.totalData);
                setTableLoading(false);
            })();
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response.status === 422) {
                    const errors = {};
                    Object.keys(error.response.data.errors).forEach((errorKey) => {
                        let errorName = errorKey;
                        if (errorName.includes('.')) {
                            errorName = errorName.split('.')[1];
                        }

                        errors[errorName] = error.response.data.errors[errorKey][0];
                    })
                    setErrors(errors);
                    return;
                }
            }

            toast.error("Something went wrong. Please try later.", {
                position: "top-right"
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={saveHandler} className='p-2'>
            {!isContentLoading ? (
                <div className="space-y-4">
                    <div>
                        <Label
                            htmlFor='name'
                            required={true}
                        >
                            Username
                        </Label>
                        <Input
                            id="name"
                            name='name'
                            value={data.name}
                            onChange={(e) => setData({ ...data, v: e.target.value })}
                            errorMessage={errors.name}
                        />
                    </div>
                    <div>
                        <Label
                        >
                            Permissions
                        </Label>
                        {Object.keys(allPermissions).map((permissionGroup) => {
                            const permissions = allPermissions[permissionGroup];
                            console.log(permissions)
                            return (
                                <div key={`group-${permissionGroup}`}>
                                    <span>{permissionGroup}</span>
                                    <Switch onChange={(val) => console.log(val)} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            ) : (
                <div className='p-5 flex items-center justify-center'>
                    <Loader2 className='w-4 h-4 animate-spin' />
                </div>
            )}
        </form>
    )
}

Form.propTypes = {
    id: PropTypes.number,
    closeModal: PropTypes.func,
}

export default Form;