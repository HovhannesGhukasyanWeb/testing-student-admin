import propTypes from 'prop-types';
import Button from '../../../../ui/button';
import { Loader2, Plus } from 'lucide-react';
import TeacherSubjectSelect from './teacherSubjectSelects';
import { useEffect, useReducer } from 'react';
import { addTeacherSubjects, reducer, setDatas } from '../actions/teacherSubject';
import { initTeacherSubjetData } from '../helpers/initTeacherSubjectData';
import handleError from '../../../../helpers/handleError';
import { groupTeacherSubjectTypes } from '../utils';
import { updateApi } from '../../../../apis/baseCrudApi';
import { parseUpdateTeacherSubjectRequestData } from '../helpers/prepearRequestData';
import { successAlert } from '../../../../helpers/alertMessage';
import { useDispatch } from 'react-redux';
import { getDatas } from '../api';

const TeacherSubjectsForm = ({ group, closeModal = () => { } }) => {

    const [state, reducerDispatch] = useReducer(reducer, initTeacherSubjetData(group));
    const dispatch = useDispatch();

    useEffect(() => {
        setDatas(reducerDispatch);
    }, []);

    const saveHandler = async () => {
        try {
            await updateApi(`manager/group/teacher_and_subject/${group.id}`, parseUpdateTeacherSubjectRequestData(state));
            successAlert('Group teacher subjects updated successfully');
            dispatch(getDatas());
        } catch (error) {
            handleError(error);
        } finally {
            closeModal();
        }
    }

    return (
        <div className='p-2 flex flex-col gap-y-8'>
            <div className='flex justify-end'>
                <Button onClick={() => addTeacherSubjects(reducerDispatch)} className="mr-2 flex items-center gap-2">
                    <Plus className="w-4 h-4 " />
                    <span>Add teacher and subjects</span>
                </Button>
            </div>

            {state?.selectedDatas?.length ? (
                <div className='max-h-[500px] overflow-y-scroll p-2'>
                    {state?.selectedDatas?.map((item, index) => {
                        return <TeacherSubjectSelect
                            key={index}
                            item={item}
                            teachers={state.teachers}
                            subjects={state.subjects}
                            deleteItem={() => reducerDispatch({ type: groupTeacherSubjectTypes.DELETE_SELECTED_DATA, payload: { index } })}
                            setSelectTeacher={(value) => reducerDispatch({ type: groupTeacherSubjectTypes.SET_SELECT_TECHER, payload: { index, value } })}
                            setSelectSubjects={(value) => reducerDispatch({ type: groupTeacherSubjectTypes.SET_SELECT_SUBJECTS, payload: { index, value } })}
                        />
                    })}
                </div>
            ) : (<></>)}


            <div className='mt-3'>
                <Button
                    type='submit'
                    variant='primary'
                    onClick={saveHandler}
                    className='w-full flex items-center gap-2 justify-center'
                    disabled={state.loading}
                >
                    {state.loading && <Loader2 className='animate-spin w-4 h-4' />}
                    Save
                </Button>
            </div>
        </div>
    );
}

TeacherSubjectsForm.propTypes = {
    group: propTypes.any.isRequired,
    closeModal: propTypes.func,
}

export default TeacherSubjectsForm;