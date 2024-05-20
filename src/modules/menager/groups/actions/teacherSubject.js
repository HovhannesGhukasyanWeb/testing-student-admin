import { getSubjects, getTeachers } from "../api";
import { transformArrayForSubjectsSelect, transformArrayForTeacherSelect } from "../helpers/parseData";
import { groupTeacherSubjectTypes } from "../utils";

export const reducer = (state, action) => {
    switch (action.type) {
        case groupTeacherSubjectTypes.SET_TEACHERS:
            return { ...state, teachers: action.payload.teachers };
        case groupTeacherSubjectTypes.SET_SUBJECTS:
            return { ...state, subjects: action.payload.subjects };
        case groupTeacherSubjectTypes.SET_LOADING:
            return { ...state, loading: action.payload.status };
        case groupTeacherSubjectTypes.ADD_SELECTED_DATA:
            return { ...state, selectedDatas: [...state.selectedDatas, { teacher: {}, subjects: [] }] };
        case groupTeacherSubjectTypes.DELETE_SELECTED_DATA:
            return { ...state, selectedDatas: state.selectedDatas.filter((item, index) => index !== action.payload.index) };
        case groupTeacherSubjectTypes.SET_SELECT_TECHER:
            return {
                ...state, selectedDatas: state.selectedDatas.map((item, index) =>
                    index === action.payload.index ? { ...item, teacher: action.payload.value } : item
                )
            };
        case groupTeacherSubjectTypes.SET_SELECT_SUBJECTS:
            return {
                ...state, selectedDatas: state.selectedDatas.map((item, index) =>
                    index === action.payload.index ? { ...item, subjects: action.payload.value } : item
                )
            };
        default:
            return state;
    }
}

export const setDatas = async (reducerDispatch) => {
    reducerDispatch({ type: groupTeacherSubjectTypes.SET_LOADING, payload: { status: true } });

    let teachersData = transformArrayForTeacherSelect(await getTeachers());
    reducerDispatch({ type: groupTeacherSubjectTypes.SET_TEACHERS, payload: { teachers: teachersData } });
    let subjectsData = transformArrayForSubjectsSelect(await getSubjects());
    reducerDispatch({ type: groupTeacherSubjectTypes.SET_SUBJECTS, payload: { subjects: subjectsData } });

    reducerDispatch({ type: groupTeacherSubjectTypes.SET_LOADING, payload: { status: false } });
}

export const addTeacherSubjects = (reducerDispatch) => {
    reducerDispatch({ type: groupTeacherSubjectTypes.SET_LOADING, payload: { status: true } });

    reducerDispatch({ type: groupTeacherSubjectTypes.ADD_SELECTED_DATA });

    reducerDispatch({ type: groupTeacherSubjectTypes.SET_LOADING, payload: { status: false } });
}