import PropTypes from 'prop-types';
import { useEffect, useReducer, useState } from "react";
import Input from "../../../../ui/input";
import Label from "../../../../ui/label";
import baseApi from "../../../../apis/baseApi";
import { getAxiosConfig } from "../../../../apis/config";
import Select from 'react-select';
import Button from "../../../../ui/button";
import { Loader2 } from "lucide-react";
import reducer, { actions } from "../utils/reducer";
import initialState from "../utils/initialState";
import handleError from "../../../../helpers/handleError";
import { storeApi, updateApi } from "../../../../apis/baseCrudApi";
import { successAlert } from "../../../../helpers/alertMessage";
import { useDispatch } from "react-redux";
import { fetchData } from "../../../../store/slices/tableSlice";
import params from "../utils/params";

const Form = ({ test = null }) => {
    const isEditing = test !== null;
    const [testTypeOptions, setTestTypeOptions] = useState([]);
    const [subjectOptions, setSubjectOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formState, formDispatch] = useReducer(reducer, initialState(test));
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            const { data: response } = await baseApi.get('/teacher/test_type', getAxiosConfig());
            setTestTypeOptions(response.data.map(({ id, name }) => ({ value: id, label: name })));
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const { data: response } = await baseApi.get('/manager/subjects', getAxiosConfig());
            setSubjectOptions(response.data.map(({ id, name }) => ({ value: id, label: name })));
        })();
    }, []);

    const saveHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            if (isEditing) {
                await updateApi('/teacher/tests/' + test.id, formState);
                successAlert('Test updated successfully');
            } else {
                await storeApi('/teacher/tests', formState);
                successAlert('Test created successfully');
            }
            dispatch(fetchData({ endpoint: "/teacher/tests", params }));
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
                        type="text"
                        id="name"
                        value={formState.name}
                        onChange={(e) => formDispatch({ type: actions.FIELD, field: 'name', payload: e.target.value })}
                    />
                </div>
                <div>
                    <Label
                        htmlFor="subject_id"
                        required={true}
                    >
                        Subject
                    </Label>
                    <Select
                        id='subject_id'
                        options={subjectOptions}
                        isSearchable={true}
                        value={subjectOptions.find(({ value }) => value === formState.subject_id)}
                        onChange={(selected) => formDispatch({ type: actions.FIELD, field: 'subject_id', payload: selected.value })}
                    />
                </div>
                <div>
                    <Label
                        htmlFor="test_type_id"
                        required={true}
                    >
                        Test type
                    </Label>
                    <Select
                        id='test_type_id'
                        options={testTypeOptions}
                        isSearchable={true}
                        value={testTypeOptions.find(({ value }) => value === formState.test_type_id)}
                        onChange={(selected) => formDispatch({ type: actions.FIELD, field: 'test_type_id', payload: selected.value })}
                    />
                </div>
                <div>
                    <Button type="submit" className="w-full flex items-center gap-2 justify-center">
                        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                        Save
                    </Button>
                </div>
            </div>
        </form>
    )
}

Form.propTypes = {
    test: PropTypes.object
}

export default Form;