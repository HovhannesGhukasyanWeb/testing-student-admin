import PropTypes from 'prop-types';
import Label from '../../components/ui/label';
import Input from '../../components/ui/input';
import { useContext, useEffect, useState } from 'react';
import baseApi from '../../apis/baseApi';
import { getAxiosConfig } from '../../apis/config';
import Select from 'react-select';
import Button from '../../components/ui/button';
import { show, store, update } from '../../apis/users';
import { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { UsersContext } from '.';
import { useSearchParams } from 'react-router-dom';

const errorsInitialState = {
    first_name: null,
    middle_name: null,
    last_name: null,
    username: null,
    email: null,
    password: null,
    role_id: null,
};

const dataInitialState = {
    username: '',
    email: '',
    password: '',
    role_id: null,
    user_profile: {
        first_name: '',
        middle_name: '',
        last_name: '',
    }
}

const Form = ({ id = null, closeModal = () => { } }) => {
    const isEditing = id !== null ? true : false;
    const [data, setData] = useState(dataInitialState);
    const [errors, setErrors] = useState(errorsInitialState);
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState([]);
    const { setUsers, setTotal, setLoading: setTableLoading } = useContext(UsersContext);
    let [searchParams] = useSearchParams();

    useEffect(() => {
        if (id) {
            (async () => {
                const { data: response } = await show(id);
                setData({
                    user_profile: {
                        first_name: response.data.user_profile.first_name,
                        middle_name: response.data.user_profile.middle_name,
                        last_name: response.data.user_profile.last_name,
                    },
                    username: response.data.username,
                    email: response.data.email,
                    role_id: response.data.role_id
                })
            })();
        }
    }, [id]);

    useEffect(() => {
        (async () => {
            const { data: response } = await baseApi.get('/api/admin/roles', getAxiosConfig());
            const roles = response.data.map(role => {
                return {
                    value: role.id,
                    label: role.name
                }
            });
            setRoles(roles);
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
                const { data: response } = await baseApi.get("/api/admin/users", { ...getAxiosConfig(), params: { limit, page, include: 'role', search } });
                console.log(response)
                setUsers(response.data);
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
        <form onSubmit={saveHandler} className='p-2 space-y-4'>
            <div className='flex items-start gap-2'>
                <div className='w-1/3'>
                    <Label
                        htmlFor='first_name'
                        required={true}
                    >
                        First Name
                    </Label>
                    <Input
                        id="first_name"
                        name='first_name'
                        value={data.user_profile.first_name}
                        onChange={(e) => setData({ ...data, user_profile: { ...data.user_profile, first_name: e.target.value } })}
                        errorMessage={errors.first_name}
                    />
                </div>
                <div className='w-1/3'>
                    <Label
                        htmlFor='middle_name'
                        required={true}
                    >
                        Middle name
                    </Label>
                    <Input
                        id="middle_name"
                        name='middle_name'
                        value={data.user_profile.middle_name}
                        onChange={(e) => setData({ ...data, user_profile: { ...data.user_profile, middle_name: e.target.value } })}
                        errorMessage={errors.middle_name}
                    />
                </div>
                <div className='w-1/3'>
                    <Label
                        htmlFor='last_name'
                        required={true}
                    >
                        Last Name
                    </Label>
                    <Input
                        id="last_name"
                        name='last_name'
                        value={data.user_profile.last_name}
                        onChange={(e) => setData({ ...data, user_profile: { ...data.user_profile, last_name: e.target.value } })}
                        errorMessage={errors.last_name}
                    />
                </div>
            </div>
            <div>
                <Label
                    htmlFor='username'
                    required={true}
                >
                    Username
                </Label>
                <Input
                    id="username"
                    name='username'
                    value={data.username}
                    onChange={(e) => setData({ ...data, username: e.target.value })}
                    errorMessage={errors.username}
                />
            </div>
            <div>
                <Label
                    htmlFor='email'
                    required={true}
                >
                    Email
                </Label>
                <Input
                    id="email"
                    name='email'
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    errorMessage={errors.email}
                />
            </div>
            <div>
                <Label
                    htmlFor='password'
                    required={true}
                >
                    Password
                </Label>
                <Input
                    id="password"
                    name='password'
                    type='password'
                    value={data.password}
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                    errorMessage={errors.password}
                />
            </div>
            <div>
                <Label
                    htmlFor='roless'
                    required={true}
                >
                    Roles
                </Label>
                <Select
                    name='role_id'
                    options={roles}
                    value={roles.find(role => role.value === data.role_id)}
                    onChange={(selectedRole) => setData({ ...data, role_id: selectedRole.value })}
                    isClearable={false}
                />
                {errors.role_id && <span className="text-red-500 text-xs mt-1 ml-1">{errors.role_id}</span>}
            </div>

            <div>
                <Button
                    type='submit'
                    variant='primary'
                    className='w-full flex items-center gap-2 justify-center'
                    disabled={loading}
                >
                    {loading && <Loader2 className='animate-spin w-4 h-4' />}
                    Save
                </Button>
            </div>
        </form>
    )
}

Form.propTypes = {
    id: PropTypes.number,
    closeModal: PropTypes.func,
}

export default Form;