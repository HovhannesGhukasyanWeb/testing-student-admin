import { groupFormActionTypes } from "../utils";

export const reducer = (state, action) => {
    switch (action.type) {
        case groupFormActionTypes.SET_NAME:
            return { ...state, name: action.payload.name }
        case groupFormActionTypes.SET_DESCRIPTION:
            return { ...state, description: action.payload.description }
        case groupFormActionTypes.SET_TEACHER:
            return { ...state, teachers: action.payload.teachers }
        case groupFormActionTypes.SET_GROUPS:
            return { ...state, groups: action.payload.groups.filter(item => item.value !== state?.group?.id) }
        case groupFormActionTypes.SET_GROUP_TYPES:
            return { ...state, groupTypes: action.payload.groupTypes }
        case groupFormActionTypes.SET_LOADING:
            return { ...state, loading: action.payload.status }
        case groupFormActionTypes.SET_SELECTED_DATAS_GROUP_TYPE:
            return { ...state, selectedDatas: {...state.selectedDatas, group_types: action.payload.value} }
        case groupFormActionTypes.SET_SELECTED_DATAS_PARENT_GROUP:
            return { ...state, selectedDatas: {...state.selectedDatas, parent_group: action.payload.value} }
        case groupFormActionTypes.SET_SELECTED_DATAS_HEAD_TEACHER:
            return { ...state, selectedDatas: {...state.selectedDatas, head_teacher: action.payload.value} }
        default:
            return state;
    }
}