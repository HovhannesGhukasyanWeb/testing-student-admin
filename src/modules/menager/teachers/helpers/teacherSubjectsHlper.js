export const transformArrayForSelect = (array) => {
    return array.map(item => ({
        value: item.id,
        label: item.name
    }));
};

export const getSelectedOptions = (teacher_subjects, options) => {
    let subject_ids = teacher_subjects.map(teacher_subject => teacher_subject.subject_id);
    return options.filter(option => subject_ids.includes(option.value));;
}