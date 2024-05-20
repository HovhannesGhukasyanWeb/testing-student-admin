import { useEffect, useReducer } from "react";
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
import { reducer } from "../actions/form";
import { endpoint, groupFormActionTypes } from "../utils";
import { initFormData } from "../helpers/initFormData";
import { prepearRequestData } from "../helpers/prepearRequestData";

const Form = ({ group = null, closeModal = () => { } }) => {

    const [formState, formDispatch] = useReducer(reducer, initFormData(group));

    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            formDispatch({ type: groupFormActionTypes.SET_LOADING, payload: { status: true } });

            let teachersData = transformArrayForTeacherSelect(await getTeachers());
            formDispatch({ type: groupFormActionTypes.SET_TEACHER, payload: { teachers: teachersData } });
            let groupTypesData = transformArrayForGroupTypeSelect(await getGroupType());
            formDispatch({ type: groupFormActionTypes.SET_GROUP_TYPES, payload: { groupTypes: groupTypesData } });
            let groupData = transformArrayForGroupTypeSelect(await getGroups());
            formDispatch({ type: groupFormActionTypes.SET_GROUPS, payload: { groups: groupData } });

            formDispatch({ type: groupFormActionTypes.SET_LOADING, payload: { status: false } });
        })();
    }, []);

    const saveHandler = async (e) => {
        e.preventDefault();
        try {
            formDispatch({ type: groupFormActionTypes.SET_LOADING, payload: { status: true } });

            if (group) {
                await updateApi(`${endpoint}/${group.id}`, prepearRequestData(formState));
                successAlert("Subject updated successfully");
            } else {
                await storeApi(endpoint, prepearRequestData(formState));
                successAlert("Subject created successfully");
            }

            closeModal();

            dispatch(getDatas());
        } catch (error) {
            handleError(error);
        } finally {
            formDispatch({ type: groupFormActionTypes.SET_LOADING, payload: { status: false } });
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
                        value={formState.name}
                        onChange={e => formDispatch({ type: groupFormActionTypes.SET_NAME, payload: { name: e.target.value } })}
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
                        value={formState.description}
                        onChange={e => formDispatch({ type: groupFormActionTypes.SET_DESCRIPTION, payload: { description: e.target.value } })}
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
                        options={formState.groupTypes}
                        value={formState.selectedDatas.group_types}
                        onChange={(value) => formDispatch({ type: groupFormActionTypes.SET_SELECTED_DATAS_GROUP_TYPE, payload: { value } })}
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
                        options={formState.groups}
                        value={formState.selectedDatas.parent_group}
                        onChange={(value) => formDispatch({ type: groupFormActionTypes.SET_SELECTED_DATAS_PARENT_GROUP, payload: { value } })}
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
                        options={formState.teachers}
                        value={formState.selectedDatas.head_teacher}
                        onChange={(value) => formDispatch({ type: groupFormActionTypes.SET_SELECTED_DATAS_HEAD_TEACHER, payload: { value } })}
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