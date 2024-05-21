import { useEffect, useReducer, useState } from 'react'
import reducer from '../utils/reducer'
import initialState from '../utils/initialState'
import Label from '../../../../ui/label'
import Select from 'react-select';
import { errorAlert, successAlert } from '../../../../helpers/alertMessage'
import baseApi from '../../../../apis/baseApi'
import { getAxiosConfig } from '../../../../apis/config'
import Button from '../../../../ui/button';
import handleError from '../../../../helpers/handleError';
import { updateApi } from '../../../../apis/baseCrudApi';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchData } from '../../../../store/slices/tableSlice';
import params from '../utils/params';
import { Loader2 } from 'lucide-react';

const Form = ({ allOtherStudentIds = [] }) => {
    const [formState, formDispatch] = useReducer(reducer, initialState);
    const [studentOptions, setStudentOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        (async () => {
            try {
                const { data: response } = await baseApi.get('/manager/students', getAxiosConfig());
                const studentOptions = response.data
                    .filter(student => {
                        return !allOtherStudentIds.includes(student.id);
                    })
                    .map(student => {
                        return {
                            value: student.id,
                            label: student.username
                        }
                    });
                setStudentOptions(studentOptions);
            } catch (error) {
                errorAlert("Failed to fetch students");
            }
        })();
    }, [formState.students, allOtherStudentIds]);

    const saveHandler = async (e) => {
        e.preventDefault();
        try {
            if (formState.students.length === 0) {
                errorAlert("Please select students");
                return;
            }

            setLoading(true);
            const requestData = [...allOtherStudentIds, ...formState.students];
            await updateApi('manager/group/students/' + id, { user_ids: [...new Set(requestData)] });
            successAlert("Students added successfully")
            dispatch(fetchData({ endpoint: "/manager/groups/" + id, params }));
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
                    <Label htmlFor='student'></Label>
                    <Select
                        isMulti
                        name='student'
                        options={studentOptions}
                        defaultValue={studentOptions.filter(student => formState.students.includes(student.value))}
                        onChange={(selected) => formDispatch({ type: 'add_students', payload: selected.map(student => student.value) })}
                        isSearchable={true}
                    />
                </div>
                <div>
                    <Button type='submit' className='w-full flex items-center justify-center gap-2'>
                        {loading && <Loader2 className='w-4 h-4 animate-spin' />}
                        <span>Save</span>
                    </Button>
                </div>
            </div>
        </form>
    )
}

Form.propTypes = {
    allOtherStudentIds: PropTypes.array,
}

export default Form;