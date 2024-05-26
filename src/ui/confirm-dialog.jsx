import PropTypes from 'prop-types';
import { X } from 'lucide-react';
import Button from './button';

const ConfirmDialog = ({
    title,
    message,
    onConfirm,
    closeDialog,
}) => {

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeDialog();
        }
    })

    return (
        <div className='fixed inset-0 z-50 flex justify-center items-center left-0 right-0 top-0 bottom-0 bg-gray-500/10'>
            <div className='max-w-[500px] rounded-lg bg-white p-5'>
                <div className='flex justify-end'>
                    <button onClick={closeDialog}>
                        <X />
                    </button>
                </div>
                <h1 className='text-3xl mb-2'>{title}</h1>
                <p>{message}</p>

                <div className='mt-3 flex items-center justify-end gap-2'>
                    <Button variant='secondary' onClick={closeDialog}>
                        Cancel
                    </Button>
                    <Button variant='danger' onClick={onConfirm}>
                        Confirm
                    </Button>
                </div>
            </div>
        </div>
    );
}

ConfirmDialog.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    closeDialog: PropTypes.func.isRequired,
}

export default ConfirmDialog;