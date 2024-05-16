import PropTypes from 'prop-types';
import Button from '../../../../ui/button';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { getDatas, getSubjects, saveTeacherSubjects } from '../api';
import { Loader2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { successAlert } from '../../../../helpers/alertMessage';
import handleError from '../../../../helpers/handleError';
import { getSelectedOptions, transformArrayForSelect } from '../helpers/teacherSubjectsHlper';

const TeacherSubjectsForm = ({ teacher, closeModal = () => { }  }) => {
    const animatedComponents = makeAnimated();
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const dispatch = useDispatch();


    useEffect(() => {
        (async () => {
            setLoading(true);
            let datas = transformArrayForSelect(await getSubjects());
            setOptions(datas);
            setSelectedOptions(await getSelectedOptions(teacher.teacher_subjects, datas));
            setLoading(false);
        })();
    }, []);



    const saveHandler = async () => {
        try{
            setLoading(true);
            await saveTeacherSubjects(teacher.id, selectedOptions);
            setLoading(false);
            successAlert("Teacher Subjects updated successfully");
            dispatch(getDatas());
            closeModal();
        }catch(error){
            handleError(error);
        }
    } 


    return (
        <div>
            <div className='space-y-4'>
                <div className="w-full">
                    <Select
                        closeMenuOnSelect={false}
                        onChange={setSelectedOptions}
                        components={animatedComponents}
                        value={selectedOptions}
                        isMulti
                        options={options}
                    />
                </div>
                <div>
                    <Button
                        type='submit'
                        variant='primary'
                        className='w-full flex items-center gap-2 justify-center'
                        disabled={loading}
                        onClick={saveHandler}
                    >
                        {loading && <Loader2 className='animate-spin w-4 h-4' />}
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
}

TeacherSubjectsForm.PropTypes = {
    teacher: PropTypes.object.isRequired,
    closeModal: PropTypes.func.isRequired,
}

export default TeacherSubjectsForm;