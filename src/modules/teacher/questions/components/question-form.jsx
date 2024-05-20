import { useDropzone } from 'react-dropzone';
import Button from '../../../../ui/button';
import { ArrowRight, Plus, X } from 'lucide-react';
import PropTypes from 'prop-types';
import Label from '../../../../ui/label';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import baseApi from '../../../../apis/baseApi';
import { getAxiosConfig } from '../../../../apis/config';
import Input from '../../../../ui/input';

const QuestionForm = ({ formDispatch, formState, next }) => {
    const [questionTypesOptions, setQuestionTypesOptions] = useState([]);

    useEffect(() => {
        (async () => {
            const { data: response } = await baseApi.get('/teacher/questions_type', getAxiosConfig());
            const questionTypesOptions = response.data.map(questionType => {
                return {
                    value: questionType.id,
                    label: questionType.name
                }
            });
            setQuestionTypesOptions(questionTypesOptions);
        })()
    }, []);

    const handleChange = (e) => {
        formDispatch({
            type: 'field',
            fieldName: e.target.name,
            payload: e.target.value
        });
    }

    const upload = (acceptedFile) => {
        const file = acceptedFile[0];
        const reader = new FileReader();

        reader.onload = async (e) => {
            const base64 = e.target.result;
            formDispatch({ type: 'field', fieldName: 'image', payload: base64 });
        }

        reader.readAsDataURL(file);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop: upload });

    const resetImage = (e) => {
        e.stopPropagation();
        formDispatch({ type: 'field', fieldName: 'image', payload: "" })
    }

    return (
        <div className="space-y-4">
            <div>
                <Label htmlFor="question_type_id">Question Type</Label>
                <Select
                    options={questionTypesOptions}
                    isSearchable
                    value={questionTypesOptions.find(questionType => questionType.value === formState.question_type_id)}
                    name="question_type_id"
                    id="question_type_id"
                    onChange={(selectedQuestionType) => formDispatch({ type: 'field', fieldName: "question_type_id", payload: selectedQuestionType?.value ?? null })}
                    defaultValue={questionTypesOptions.find(questionType => questionType.value === formState.question_type_id)}
                />
            </div>
            <div>
                <Label htmlFor="title">Title</Label>
                <Input
                    type="text"
                    name="title"
                    id="title"
                    onChange={handleChange}
                    value={formState.title}
                />
            </div>
            <div>
                <Label htmlFor="point">Point</Label>
                <Input
                    type="number"
                    name="point"
                    id="point"
                    onChange={handleChange}
                    value={formState.point}
                />
            </div>
            <div>
                <div {...getRootProps()} className="border-2 border-dashed border-blue-500 p-[10px] 
                min-h-[300px] flex items-center justify-center cursor-pointer">
                    <input {...getInputProps()} />
                    <div>
                        {formState.image ? (
                            <div className="relative">
                                <button type="button" onClick={resetImage} className="absolute top-0 right-0 shadow-lg p-2 rounded-full mb-4 ml-4 bg-gray-300">
                                    <X className="w-4 h-4" />
                                </button>
                                <img src={formState.image} alt="question" className="w-full" />
                            </div>
                        ) : (
                            <p>Drag and drop, or upload question image.</p>
                        )}
                    </div>
                </div>
            </div>

            {formState.question_type_id === 2 && (
                <div className='space-y-4 max-h-[300px] overflow-y-auto'>
                    {formState.question_options.map((option, index) => (
                        <div key={`option-${index}`} className='flex items-center gap-2'>
                            <div className='w-full'>
                                <Label>Option</Label>
                                <Input
                                    className='w-full'
                                    type="text"
                                    name="option"
                                    value={option.title}
                                    onChange={(e) => formDispatch({ type: 'change_option', index, payload: e.target.value })}
                                />
                            </div>
                            <div>
                                <button type="button" onClick={() => formDispatch({ type: 'remove_option', index })} className="text-red-500">
                                    <X />
                                </button>
                            </div>
                        </div>
                    ))}

                    <Button type="button" onClick={() => formDispatch({ type: 'add_option' })} className="flex items-center gap-2 justify-center">
                        <Plus className='w-4 h-4' />
                        Add option
                    </Button>
                </div>
            )}

            <div>
                <Button type="button" onClick={next} className="w-full flex items-center gap-2 justify-center">
                    Next <ArrowRight />
                </Button>
            </div>
        </div>
    )
}

QuestionForm.propTypes = {
    next: PropTypes.func,
    formState: PropTypes.object,
    formDispatch: PropTypes.func
}

export default QuestionForm;