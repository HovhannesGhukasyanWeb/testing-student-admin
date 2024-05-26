import Label from '../../../../ui/label'
import Input from '../../../../ui/input';
import { useState } from 'react';
import { useEffect } from 'react';
import baseApi from '../../../../apis/baseApi';
import { getAxiosConfig } from '../../../../apis/config';
import createPermissionsTree from '../utils/createPermissionsTree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import CheckboxTree from 'react-checkbox-tree';
import { Check, ChevronDown, ChevronRight, Home, Loader2, MinusCircle } from 'lucide-react';
import Button from '../../../../ui/button';
import handleError from '../../../../helpers/handleError';
import PropTypes from 'prop-types';
import { storeApi, updateApi } from '../../../../apis/baseCrudApi';
import { useDispatch } from 'react-redux';
import { fetchData } from '../../../../store/slices/tableSlice';
import params from '../utils/params';
import { errorAlert, successAlert } from '../../../../helpers/alertMessage';

const Form = ({ role = null }) => {
    const isEditing = role !== null;
    const [name, setName] = useState(role ? role?.name : '');
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [permissionsTree, setPermissionsTree] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            try {
                const { data: response } = await baseApi.get('/admin/permissions', getAxiosConfig());
                const permissionsTree = createPermissionsTree(response.data);
                setPermissionsTree(permissionsTree)
            } catch (error) {
                errorAlert("Failed to fetch permissions");
            }
        })();
    }, []);

    useEffect(() => {
        if (isEditing) {
            const rolePermissions = role.role_permissions;
            const permissionIds = rolePermissions.map(rolePermission => rolePermission.permission_id);
            setChecked(permissionIds);
        }
    }, [isEditing, role]);

    const saveHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            let newRole = role;
            if (!isEditing) {
                const { data: response } = await storeApi('/admin/roles', {
                    name,
                });
                newRole = response.data;
                successAlert("Role created successfully");
            } else {
                await updateApi('/admin/roles/' + role.id, {
                    name,
                });
                successAlert("Role updated successfully");
            }

            await storeApi('/admin/rolePermissions', {
                role_id: newRole.id,
                permission_ids: checked,
            })

            dispatch(fetchData({ endpoint: '/admin/roles', params }));
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={saveHandler}>
            <div className="space-y-4">
                <div>
                    <Label
                        htmlFor="name"
                        required={true}
                    >
                        Name
                    </Label>
                    <Input
                        name='name'
                        id='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='max-h-[300px] overflow-y-auto'>
                    <Label
                        htmlFor="permissions"
                    >
                        Permissions
                    </Label>
                    <CheckboxTree
                        nodes={permissionsTree}
                        checked={checked}
                        expanded={expanded}
                        onCheck={checked => setChecked(checked)}
                        onExpand={expanded => setExpanded(expanded)}
                        icons={{
                            check: <Check className='w-5 h-5 text-green-500' />,
                            uncheck: <MinusCircle className='w-4 h-4 text-red-500' />,
                            halfCheck: <MinusCircle className='w-4 h-4 text-blue-500' />,
                            expandClose: <ChevronRight className='w-4 h-4' />,
                            expandOpen: <ChevronDown className='w-4 h-4' />,
                            expandAll: <span>Expand all</span>,
                            collapseAll: <span>Collapse all</span>,
                            parentClose: <Home className='w-4 h-4' />,
                            parentOpen: <Home className='w-4 h-4' />,
                            leaf: <Home className='w-4 h-4' />,
                        }}
                        showExpandAll={true}
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
    role: PropTypes.object,
}

export default Form;