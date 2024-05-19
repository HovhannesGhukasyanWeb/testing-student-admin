export const prepearRequestData = (formState) => {
    return {
        name: formState?.name || undefined,
        description: formState?.description || undefined,
        parent_id: formState?.selectedDatas?.parent_group?.value || undefined,
        user_id: formState?.selectedDatas?.head_teacher?.value || undefined,
        group_type_id: formState?.selectedDatas?.group_types?.value || undefined,
    };
}

export const parseUpdateTeacherSubjectRequestData = (state) => {
    let teacherAndSubject_ids = [];
    
    state?.selectedDatas?.forEach(item => {
        item?.subjects.forEach(subject => {
            teacherAndSubject_ids.push({
                user_id: item?.teacher.value || undefined,
                subject_id: subject?.value || undefined,
            });
        });
    });
    
    return {teacherAndSubject_ids}
}