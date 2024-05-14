import PropTypes from 'prop-types';
import Label from '../../../../ui/label';
import Input from '../../../../ui/input';
import { useEffect, useState } from 'react';
import baseApi from '../../../../apis/baseApi';
import { getAxiosConfig } from '../../../../apis/config';
import Select from 'react-select';
import Button from '../../../../ui/button';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { fetchData } from '../../../../store/slices/tableSlice';
import handleError from '../../../../helpers/handleError';
import { storeApi, updateApi } from '../../../../apis/baseCrudApi';

const Form = ({ user = null, closeModal = () => { } }) => {
    const dataInitialState = {
        username: user?.username ?? '',
        email: user?.email ?? '',
        password: '',
        role_id: user?.role.id ?? null,
        user_profile: {
            first_name: user?.user_profile?.first_name ?? '',
            middle_name: user?.user_profile?.middle_name ?? '',
            last_name: user?.user_profile?.last_name ?? '',
        }
    }
    const [data, setData] = useState(dataInitialState);
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            const { data: response } = await baseApi.get('/admin/roles', getAxiosConfig());
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
            if (user) {
                await updateApi(`/admin/users/${user.id}`, {...data, password: data.password ? data.password : undefined});

                toast.success("User updated successfully", {
                    position: "top-right"
                });
            } else {
                await storeApi(`/admin/users`, data);
                toast.success("User created successfully", {
                    position: "top-right"
                });
            }
            closeModal();
            setData(dataInitialState);
            dispatch(fetchData({ endpoint: "/admin/users", params: { include: 'role&userProfile' } }))
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={saveHandler} className='p-2'>
            <div className='space-y-4'>
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
                    />
                </div>
                <div>
                    <Label
                        htmlFor='role'
                        required={true}
                    >
                        Role
                    </Label>
                    <Select
                        name='role_id'
                        id='role'
                        options={roles}
                        value={roles.find(role => role.value === data.role_id)}
                        onChange={(selectedRole) => setData({ ...data, role_id: selectedRole.value })}
                        isClearable={false}
                    />
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
            </div>

        </form>
    )
}

Form.propTypes = {
    user: PropTypes.object,
    closeModal: PropTypes.func,
}

export default Form;