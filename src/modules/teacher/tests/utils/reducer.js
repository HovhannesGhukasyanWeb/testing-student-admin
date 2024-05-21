export const actions = {
    FIELD: 'FIELD',
}

export default (state, action) => {
    switch (action.type) {
        case actions.FIELD:
            return {
                ...state,
                [action.field]: action.payload,
            }
        default:
            return state;
    }
}