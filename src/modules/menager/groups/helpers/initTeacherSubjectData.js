export const initTeacherSubjetData = (group) => {
    let selectedDatas = [];

    group?.group_teacher_subject?.forEach(item => {

        let exists = selectedDatas?.filter(exist => exist?.teacher?.value === item?.user_id);

        if (exists.length) {
            selectedDatas.map(element => {
                return element?.teacher?.value === item?.user_id 
                    ? { ...element, subjects: element.subjects.push({ value: item?.subject?.id, label: item?.subject?.name }) }
                    : element;
            })
        } else {
            selectedDatas.push(
                {
                    teacher: { value: item?.teacher?.id, label: item?.teacher?.username },
                    subjects: [{ value: item?.subject?.id, label: item?.subject?.name }],
                }
            );
        }
    });

    return {
        selectedDatas,
        teachers: [],
        subjects: [],
        loading: false,
    };
}