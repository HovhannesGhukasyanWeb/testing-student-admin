import PropTypes from 'prop-types';
import { X } from 'lucide-react';
import useOutsideClick from "../hooks/useOutsideClick";
import { useRef } from 'react';

const Modal = ({
    title,
    children,
    onClose,
    footer,
}) => {
    const ref = useRef();
    useOutsideClick(ref, onClose);
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            onClose();
        }
    });

    return (
        <div className="modal">
            <div className="modal__content " ref={ref}>
                <div className="relative p-2 flex items-center justify-center border-b border-lightgray mb-2">
                    <h2>{title}</h2>
                    <button className='absolute right-0 p-2 hover:text-gray-700' onClick={onClose}>
                        <X className="w-7 h-7" />
                    </button>
                </div>
                <div className="p-2">
                    {children}
                </div>
                <div className='p-2 border-t'>
                    {footer}
                </div>
            </div>
        </div>
    );
}

Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    onClose: PropTypes.func,
    footer: PropTypes.node,
}

export default Modal;