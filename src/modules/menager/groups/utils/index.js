export const params = {
    include: 'parent&techer&groupType&groupUsers&groupTeacherSubject&groupTeacherSubject.teacher&groupTeacherSubject.subject'
};

export const endpoint = '/manager/groups';

export const groupFormActionTypes = {
    SET_NAME: 'set_name',
    SET_DESCRIPTION: 'set_description',
    SET_TEACHER: 'set_teachers',
    SET_GROUP_TYPES: 'set_group_types',
    SET_GROUPS: 'set_groups',
    SET_LOADING: 'set_loading',
    SET_SELECTED_DATAS_HEAD_TEACHER: 'set_selected_datas_head_teacher',
    SET_SELECTED_DATAS_PARENT_GROUP: 'set_selected_datas_parent_group',
    SET_SELECTED_DATAS_GROUP_TYPE: 'set_selected_datas_group_type',
}

export const groupTeacherSubjectTypes = {
    SET_TEACHERS: 'set_teachers',
    SET_SUBJECTS: 'set_subjects',
    SET_LOADING: 'set_loading',
    ADD_SELECTED_DATA: 'add_selected_data',
    DELETE_SELECTED_DATA: 'delete_selected_data',
    SET_SELECT_TECHER: 'set_select_teacher',
    SET_SELECT_SUBJECTS: 'set_select_subjects',
}