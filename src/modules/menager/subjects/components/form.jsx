import { useState } from "react";
import Input from "../../../../ui/input";
import Label from "../../../../ui/label";
import Button from "../../../../ui/button";
import { Loader2 } from "lucide-react";
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { storeApi, updateApi } from "../../../../apis/baseCrudApi";
import { useDispatch } from "react-redux";
import { fetchData } from "../../../../store/slices/tableSlice";
import handleError from "../../../../helpers/handleError";

const Form = ({subject = null, closeModal = () => { }}) => {
    const [name, setName] = useState(subject?.name || '');
    const [loading, setLoading] = useState(false);
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
                toast.success("Subject created successfully", {
                    position: "top-right"
                });
            }
            closeModal();

            dispatch(fetchData({ endpoint: "/manager/subjects"}));
        }catch(error){
            handleError(error);
        } finally {
            setLoading(false);
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