import Label from '../../../../ui/label'
import Input from '../../../../ui/input';
import { useState } from 'react';
import { useEffect } from 'react';
import baseApi from '../../../../apis/baseApi';
import { getAxiosConfig } from '../../../../apis/config';
import toast from 'react-hot-toast';
import createPermissionsTree from '../utils/createPermissionsTree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import CheckboxTree from 'react-checkbox-tree';
import { Check, ChevronDown, ChevronRight, Home, MinusCircle } from 'lucide-react';

const nodes = [{
    value: 'admin',
    label: 'Admin',
    children: [
        {
            value: 'users',
            label: 'Users',
            children: [
                { value: '1', label: 'Create' },
                { value: '2', label: 'Read' },
                { value: '3', label: 'Update' },
                { value: '4', label: 'Delete' },
            ],
        },
        {
            value: 'roles',
            label: 'Roles',
            children: [
                { value: 'create', label: 'Create' },
                { value: 'read', label: 'Read' },
                { value: 'update', label: 'Update' },
                { value: 'delete', label: 'Delete' },
            ],
        },
    ]
}]

const Form = () => {
    const [name, setName] = useState('');
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const { data: response } = await baseApi.get('/admin/permissions', getAxiosConfig());
                // const permissions = Object.groupBy(response.data, ({ title }) => title);
                const permissions = createPermissionsTree(response.data);
                console.log(permissions)
            } catch (error) {
                toast.error('Failed to fetch permissions', {
                    position: 'top-right',
                });
            }
        })();
    }, []);

    return (
        <form>
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
                <div>
                    <Label
                        htmlFor="permissions"
                    >
                        Permissions
                    </Label>
                    <CheckboxTree
                        nodes={nodes}
                        checked={checked}
                        expanded={expanded}
                        onCheck={checked => setChecked(checked)}
                        onExpand={expanded => setExpanded(expanded)}
                        icons={{
                            check: <Check className='w-5 h-5 text-green-500' />,
                            uncheck: <MinusCircle className='w-4 h-4 text-red-500' />,
                            halfCheck: <MinusCircle className='w-4 h-4 text-blue-500' />,
                            expandClose: <ChevronDown className='w-4 h-4' />,
                            expandOpen: <ChevronRight className='w-4 h-4' />,
                            expandAll: <span>Expand all</span>,
                            collapseAll: <span>Collapse all</span>,
                            parentClose: <Home className='w-4 h-4' />,
                            parentOpen: <Home className='w-4 h-4' />,
                            leaf: <Home className='w-4 h-4' />,
                        }}
                        showExpandAll={true}
                    />
                </div>
            </div>
        </form>
    )
}

export default Form;