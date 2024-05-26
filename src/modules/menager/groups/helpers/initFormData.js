export const initFormData = (group) => {
    return {
        group: group,
        name: group?.name || '',
        description: group?.description || '',
        teachers: [],
        groupTypes: [],
        groups: [],
        loading: false,
        selectedDatas: {
            head_teacher: group?.teacher ? { value: group.teacher.id, label: group.teacher.username } : null,
            parent_group: group?.parent ? { value: group.parent.id, label: group.parent.name } : null,
            group_types: group?.group_type ? { value: group.group_type.id, label: group.group_type.name } : null,
        }
    };
}