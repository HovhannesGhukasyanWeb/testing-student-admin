import { ArrowLeft, X } from "lucide-react"
import Button from "../../../../ui/button"
import Label from "../../../../ui/label"
import Input from "../../../../ui/input"
import PropTypes from 'prop-types';

const AnswersForm = ({ previous, formState, formDispatch }) => {
    return (
        <div className="space-y-4">
            <div>
                <Button type="button" variant="secondary" onClick={previous} className="flex items-center gap-2 justify-center">
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                </Button>
            </div>
            <div>
                <Label>
                    Question
                </Label>
                <Input type="text" disabled value={formState.title} />
            </div>
            <div>
                {formState.answers.map((answer, index) => {
                    return (
                        <div key={`answer-${index}`} className="flex items-stretch gap-2 space-y-2">
                            <input type="radio" name="true-option" checked={answer.is_right} onChange={(e) => formDispatch({ type: 'change_right_answer', index, is_right: e.target.checked })} />
                            <div className="w-full">
                                <Label htmlFor="answer">Answer</Label>
                                <Input type="text" name="answer" id="answer" className="w-full" value={answer.title} onChange={(e) => formDispatch({ type: 'change_answer_title', payload: e.target.value, index })} />
                            </div>
                            {formState.answers.length > 2 && (
                                <button type="button" onClick={() => formDispatch({ type: 'remove_answer_option', index })} className="text-red-500">
                                    <X />
                                </button>
                            )}
                        </div>
                    )
                })}
            </div>
            <div>
                <Button type="button" onClick={() => formDispatch({ type: 'add_answer_option' })} className="flex items-center gap-2 justify-center">Add another answer</Button>
            </div>
        </div>
    )
}

AnswersForm.propTypes = {
    previous: PropTypes.func,
    formState: PropTypes.object,
    formDispatch: PropTypes.func
}

export default AnswersForm;