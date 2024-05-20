import { useEffect, useReducer, useState } from "react";
import reducer from "../utils/reducer";
import initialState from "../utils/initialState";
import Button from "../../../../ui/button";
import { Wizard, Steps, Step } from 'react-albus';
import AnswersForm from "./answers-form";
import QuestionForm from "./question-form";
import PropTypes from 'prop-types';
import handleError from "../../../../helpers/handleError";
import { storeApi, updateApi } from "../../../../apis/baseCrudApi";
import { Loader2 } from "lucide-react";
import { successAlert } from "../../../../helpers/alertMessage";
import { useDispatch } from "react-redux";
import { fetchData } from "../../../../store/slices/tableSlice";
import params from "../utils/params";

const Form = ({ question = null }) => {
    const isEditing = question !== null;
    const [loading, setLoading] = useState(false);
    const [formState, formDispatch] = useReducer(reducer, initialState);
    const dispatch = useDispatch();

    const saveHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            if (isEditing) {
                await updateApi(`/teacher/questions/${question.id}`, formState);
                successAlert("Question updated successfully")
            } else {
                await storeApi('/teacher/questions', formState);
                successAlert("Question created successfully")
            }

            dispatch(fetchData({ endpoint: '/teacher/questions', params }))
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (isEditing) {
            const questionState = {
                title: question.title,
                point: question.point,
                question_type_id: question.question_type_id,
                image: question.image,
                answers: question.question_answers?.map(answer => {
                    return {
                        title: answer.title,
                        is_right: Boolean(answer.is_right)
                    }
                }),
                question_options: question?.question_options?.map(option => {
                    return {
                        title: option.title
                    }
                }) ?? []
            }

            formDispatch({ type: 'set_question', payload: questionState })
        }
    }, [isEditing, question])

    return (
        <form onSubmit={saveHandler}>
            <Wizard>
                <Steps>
                    <Step id="step1" render={({ next }) => (
                        <QuestionForm next={next} formDispatch={formDispatch} formState={formState} />
                    )} />
                    <Step id="step2" render={({ previous }) => (
                        <div className="space-y-4">
                            <AnswersForm previous={previous} formState={formState} formDispatch={formDispatch} />
                            <div>
                                <Button type="button" onClick={saveHandler} disabled={loading} className="w-full flex items-center gap-2 justify-center">
                                    {loading && <Loader2 className="animate-spin w-4 h-4" />}
                                    Save
                                </Button>
                            </div>
                        </div>
                    )} />
                </Steps>
            </Wizard>
        </form>
    )
}

Form.propTypes = {
    question: PropTypes.object,
}


export default Form;