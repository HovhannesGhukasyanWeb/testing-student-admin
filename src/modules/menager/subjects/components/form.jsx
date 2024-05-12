import { useState } from "react";
import Input from "../../../../components/ui/input";
import Label from "../../../../components/ui/label";
import Button from "../../../../components/ui/button";
import { Loader2 } from "lucide-react";
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { storeApi, updateApi } from "../../../../apis/baseCrudApi";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { fetchData } from "../../../../store/slices/tableSlice";
import { useSearchParams } from "react-router-dom";

const Form = ({subject = null, closeModal = () => { }}) => {
    const [name, setName] = useState(subject?.name || '');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    let [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    const saveHandler = async (e) => {
        e.preventDefault();
        try{
            setLoading(true);
            if(subject){
                await updateApi(`/manager/subjects/${subject.id}`, {name});
                toast.success("Subject updated successfully", {
                    position: "top-right"
                });
            }else{
                await storeApi('/manager/subjects', {name});
                setErrors({});
                toast.success("Subject created successfully", {
                    position: "top-right"
                });
            }
            setLoading(false);
            closeModal();

            const limit = 10;
            const page = searchParams.get("page") || 1;
            const search = searchParams.get("search") || null;
            dispatch(fetchData({ endpoint: "/manager/subjects", params: { limit, page, search } }));

        }catch(error){
            if (error instanceof AxiosError && error.response.status === 422) {
                setErrors(error?.response?.data?.errors || error?.response?.data?.message || 'Something want wrong');
                setLoading(false);
            }
        }
    }

    return (
        <form onSubmit={saveHandler} className='p-2'>
            <div className='space-y-4'>
                <div className="w-full">
                    <Label
                        htmlFor='name'
                        required={true}
                    >
                        Name
                    </Label>
                    <Input
                        id="name"
                        name='name'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        errorMessage={errors?.name}
                    />
                </div>
                <div>
                    <Button
                        type='submit'
                        variant='primary'
                        className='w-full flex items-center gap-2 justify-center'
                        disabled={loading}
                    >
                        {loading && <Loader2 className='animate-spin w-4 h-4' />}
                        Save
                    </Button>
                </div>
            </div>
        </form>
    );
}


Form.propTypes = {
    subject: PropTypes.any,
    closeModal: PropTypes.func,
}

export default Form;