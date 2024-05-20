import { AxiosError } from "axios";
import toast from 'react-hot-toast';

export default function handleError(error) {
    if (error instanceof AxiosError) {
        if (error.response.status === 422) {
            const errorKey = Object.keys(error.response.data.errors)[0];
            const errorMessage = Array.isArray(error.response.data.errors[errorKey]) ? error.response.data.errors[errorKey][0] : error.response.data.errors[errorKey];
            toast.error(errorMessage, {
                position: "top-right",
            });
            return;
        }
    }

    toast.error("Something went wrong. Please try later.", {
        position: "top-right"
    });
}