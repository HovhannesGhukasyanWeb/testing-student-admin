import { useEffect, useReducer, useState } from "react";
import Input from "../../../../ui/input";
import Label from "../../../../ui/label";
import Button from "../../../../ui/button";
import { Loader2 } from "lucide-react";
import PropTypes from 'prop-types';
import { storeApi, updateApi } from "../../../../apis/baseCrudApi";
import { useDispatch } from "react-redux";
import handleError from "../../../../helpers/handleError";
import { successAlert } from "../../../../helpers/alertMessage";
import { getDatas, getGroupType, getGroups, getTeachers } from "../api";
import { transformArrayForGroupTypeSelect, transformArrayForTeacherSelect } from "../helpers/parseData";
import Select from 'react-select'
import { reducer } from "../helpers/reducer";

const Form = ({ group = null, closeModal = () => { } }) => {
    
    const initialState = {
        name: group?.name || '',
        description: group?.description || '',
        teachers: [],
        groupTypes: [],
        groups: [],
        loading: false,
        selectedDatas: {
            head_teacher: group?.techer ? { value: group.techer.id, label: group.techer.username } : null, 
            parent_group: group?.parent ? { value: group.parent.id, label: group.parent.name } : null, 
            group_types: group?.group_type ? { value: group.group_type.id, label: group.group_type.name } : null, 
        }
    };

    const [formState, formDispatch] = useReducer(reducer, initialState);


    console.log(formState);
    const [name, setName] = useState(group?.name || '');
    const [description, setDescription] = useState(group?.description || '');
    const [teachers, setTeachers] = useState([]);
    const [groupTypes, setGroupTypes] = useState([]);
    const [groups, setGroups] = useState([]);
    const [selectedDatas, setSelectedDatas] = useState(
        {
            user_id: group?.techer ? group?.techer?.id : null,
            parent_id: group?.parent ? group?.parent?.id : null,
            group_type_id: group?.group_type ? group.group_type?.id : null
        }
    );

    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            let teachersData = transformArrayForTeacherSelect(await getTeachers());
            setTeachers(teachersData);
            let groupTypesData = transformArrayForGroupTypeSelect(await getGroupType());
            setGroupTypes(groupTypesData);
            let groupData = transformArrayForGroupTypeSelect(await getGroups());
            setGroups(groupData);
        })();
    }, []);

    const saveHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (group) {
                await updateApi(`/manager/groups/${group.id}`, { ...formState.selectedDatas, name: formState.selectedDatas.name, description: formState.selectedDatas.description });
                successAlert("Subject updated successfully");
            } else {
                await storeApi('/manager/groups', { ...formState.selectedDatas, name: formState.selectedDatas.name, description: formState.selectedDatas.description });
                successAlert("Subject created successfully");
            }
            closeModal();

            dispatch(getDatas());
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={saveHandler} className='p-2'>
            <div className='space-y-4'>
                <div className="w-full">
                    <Label
                        htmlFor='name'
                        required={true}
                    >
                        Name
                    </Label>
                    <Input
                        id="name"
                        name='name'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="w-full">
                    <Label
                        htmlFor='description'
                    >
                        Description
                    </Label>
                    <Input
                        id="description"
                        name='description'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <div className="w-full">
                    <Label
                        required={true}
                        htmlFor='group_types'
                    >
                        Group Type
                    </Label>
                    <Select
                        isClearable
                        id="group_types"
                        name="group_types"
                        options={groupTypes}
                        value={formState.selectedDatas.group_types}
                        // onChange={(value) => setSelectedDatas({ ...selectedDatas, group_type_id: value.value })}
                    />
                </div>
                <div className="w-full">
                    <Label
                        htmlFor='parent_group'
                    >
                        Parent Group
                    </Label>
                    <Select
                        isClearable
                        id="parent_group"
                        name="parent_group"
                        options={groups}
                        value={formState.selectedDatas.parent_group}
                        // onChange={(value) => { setSelectedDatas({ ...selectedDatas, parent_id: value.value }) }}
                    />
                </div>
                <div className="w-full">
                    <Label
                        required={true}
                        htmlFor='head_teacher'
                    >
                        Head teacher of the group
                    </Label>
                    <Select
                        isClearable
                        id="head_teacher"
                        name="head_teacher"
                        options={teachers}
                        value={formState.selectedDatas.head_teacher}
                        // onChange={(value) => setSelectedDatas({ ...selectedDatas, user_id: value.value })}
                    />
                </div>
                <div>
                    <Button
                        type='submit'
                        variant='primary'
                        className='w-full flex items-center gap-2 justify-center'
                        disabled={formState.loading}
                    >
                        {formState.loading && <Loader2 className='animate-spin w-4 h-4' />}
                        Save
                    </Button>
                </div>
            </div>
        </form>
    );
}


Form.propTypes = {
    group: PropTypes.any,
    closeModal: PropTypes.func,
}

export default Form;