import propTypes from 'prop-types';
import Button from '../../../../ui/button';
import Label from '../../../../ui/label';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

const TeacherSubjectSelect = ({ item, teachers, subjects, deleteItem, setSelectTeacher, setSelectSubjects }) => {
    const animatedComponents = makeAnimated();

    return (
        <div className='space-y-4'>
            <div className="w-full">
                <Label
                    required={true}
                    htmlFor='teachers'
                >
                    Teacher
                </Label>
                <Select
                    isClearable
                    id="teachers"
                    name="teachers"
                    options={teachers}
                    value={item.teacher}
                    onChange={(value) => setSelectTeacher(value)}
                />
            </div>
            <div className="w-full">
                <Label
                    required={true}
                    htmlFor='subjects'
                >
                    Subjects
                </Label>
                <Select
                    id="subjects"
                    name="subjects"
                    isClearable
                    isMulti
                    components={animatedComponents}
                    closeMenuOnSelect={false}
                    options={subjects}
                    value={item.subjects}
                    onChange={(value) => setSelectSubjects(value)}
                />
            </div>
            <div className='flex justify-end'>
                <Button onClick={deleteItem} variant='danger' className="mr-2 flex items-center gap-2">
                    Delete
                </Button>
            </div>

        </div>
    );
}

TeacherSubjectSelect.propTypes = {
    teachers: propTypes.array.isRequired,
    subjects: propTypes.array.isRequired,
    item: propTypes.object.isRequired,
    delete: propTypes.func,
    setSelectTeacher: propTypes.func,
    setSelectSubjects: propTypes.func,
}

export default TeacherSubjectSelect;