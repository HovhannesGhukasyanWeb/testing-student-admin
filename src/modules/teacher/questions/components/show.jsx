import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from '../../../../ui/button';
import { Eye, X } from 'lucide-react';
import Modal from '../../../../ui/modal';

const Show = ({ question }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showImage, setShowImage] = useState(false);

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeImage();
        }
    })

    const closeImage = () => {
        setShowImage(false);
        setIsModalOpen(true);
    }

    return (
        <div>
            {showImage ? (
                <div className='fixed top-0 left-0 bottom-0 right-0 bg-gray-600 p-2 z-50'>
                    <div className='flex items-center justify-end'>
                        <button onClick={closeImage} className='text-6xl text-white'>
                            <X className="w-8 h-8" />
                        </button>
                    </div>
                    <div className='h-full'>
                        <img src={question.image} alt="Question image fully" className='w-full h-full object-contain' />
                    </div>
                </div>
            ) : null}
            <Button className="mr-2 flex items-center gap-2" onClick={() => setIsModalOpen(true)}>
                <Eye className="w-4 h-4" />
                <span>Show</span>
            </Button>

            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)} title={"Show Question"}>
                    <div className='space-y-4'>
                        <div className="flex items-center gap-2">
                            <span className="font-bold">Title:</span>
                            <span>{question.title}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-bold">Type:</span>
                            <span>{question.question_type.name}</span>
                        </div>
                        {question.image && <div className="flex items-center gap-2">
                            <span className="font-bold">Image:</span>
                            <img src={question.image} alt="question image" className='w-[300px] h-[300px] object-contain cursor-pointer' onClick={() => setShowImage(true)} />
                        </div>}
                        {question.question_options.length ? <div className="flex items-center gap-2">
                            <span className="font-bold">Options:</span>
                            <ul>
                                {question.question_options.map((option, index) => (
                                    <li key={index} className='flex items-center gap-2'>
                                        <span>{index + 1}.</span>
                                        <span>{option.title}</span>
                                    </li>
                                ))}
                            </ul>
                        </div> : null}
                        <div>
                            <span className="font-bold">Answers:</span>
                            {question.question_answers.map((answer, index) => (
                                <div key={index} className={`flex items-center gap-2 ${answer.is_right && "text-green-500"}`}>
                                    <span>{index + 1}.</span>
                                    <span >{answer.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    )
}

Show.propTypes = {
    question: PropTypes.object.isRequired
}

export default Show;