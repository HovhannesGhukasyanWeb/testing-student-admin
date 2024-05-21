export default (state, action) => {
    switch (action.type) {
        case 'add_students':
            return {
                ...state,
                students: [...state.students, ...action.payload],
            }
        default:
            return state;
    }
}