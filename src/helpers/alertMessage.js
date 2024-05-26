import toast from 'react-hot-toast';

export const successAlert = (message) => {
    toast.success(message, {
        position: "top-right"
    });
}

export const errorAlert = (message) => {
    toast.error(message, {
        position: "top-right"
    });
}