export default (state, action) => {
    switch (action.type) {
        case 'field':
            return {
                ...state,
                [action.fieldName]: action.payload
            };
        case 'add_answer_option':
            if (state.answers.length == 4) {
                return state;
            }

            return {
                ...state,
                answers: [
                    ...state.answers,
                    {
                        title: '',
                        is_right: false,
                    }
                ]
            }
        case 'change_right_answer':
            return {
                ...state,
                answers: state.answers.map((answer, index) => {
                    if (index === action.index) {
                        return {
                            ...answer,
                            is_right: !answer.is_right
                        }
                    }
                    return {
                        ...answer,
                        is_right: false,
                    };
                })
            }
        case 'change_answer_title':
            return {
                ...state,
                answers: state.answers.map((answer, index) => {
                    if (index === action.index) {
                        return {
                            ...answer,
                            title: action.payload
                        }
                    }
                    return answer;
                })
            }
        case 'remove_answer_option':
            return {
                ...state,
                answers: state.answers.filter((answer, index) => index !== action.index)
            }
        case 'add_option':
            if (state.question_options.length == 4) {
                return state;
            }

            return {
                ...state,
                question_options: [
                    ...state.question_options,
                    {
                        title: ''
                    }
                ]
            }
        case 'remove_option':
            return {
                ...state,
                question_options: state.question_options.filter((option, index) => index !== action.index)
            }
        case 'change_option':
            return {
                ...state,
                question_options: state.question_options.map((option, index) => {
                    if (index === action.index) {
                        return {
                            ...option,
                            title: action.payload
                        }
                    }
                    return option;
                })
            }
        case 'set_question':
            return action.payload
        default:
            return state
    }
}