import { useState } from "react";
import Input from "../../../../ui/input";
import Label from "../../../../ui/label";
import Button from "../../../../ui/button";
import { Loader2 } from "lucide-react";
import PropTypes from 'prop-types';
import { storeApi, updateApi } from "../../../../apis/baseCrudApi";
import { useDispatch } from "react-redux";
import handleError from "../../../../helpers/handleError";
import { getDatas } from "../api";
import { successAlert } from "../../../../helpers/alertMessage";
import { parseStudentEditData } from "../helpers/parseStudentData";
import { endpoint } from "../utils";

const Form = ({ student = null, closeModal = () => { } }) => {
    const dataInitialState = {
        username: student?.username ?? '',
        email: student?.email ?? '',
        password: '',
        user_profile: {
            first_name: student?.user_profile?.first_name ?? '',
            middle_name: student?.user_profile?.middle_name ?? '',
            last_name: student?.user_profile?.last_name ?? '',
            age: student?.user_profile?.age ?? '',
            courses: student?.user_profile?.courses ?? '',
        }
    }
    const [data, setData] = useState(dataInitialState);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const saveHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (student) {
                await updateApi(`${endpoint}/${student.id}`, { ...parseStudentEditData(data) });
                successAlert("Student updated successfully");
            } else {
                await storeApi(endpoint, data);
                successAlert("Student created successfully");
            }
            closeModal();
            dispatch(getDatas());
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={saveHandler} className='p-2'>
            <div className='space-y-4'>
                <div className='flex items-start gap-2'>
                    <div className='w-1/3'>
                        <Label
                            htmlFor='first_name'
                            required={true}
                        >
                            First Name
                        </Label>
                        <Input
                            id="first_name"
                            name='first_name'
                            value={data.user_profile.first_name}
                            onChange={(e) => setData({ ...data, user_profile: { ...data.user_profile, first_name: e.target.value } })}
                        />
                    </div>
                    <div className='w-1/3'>
                        <Label
                            htmlFor='middle_name'
                            required={true}
                        >
                            Middle name
                        </Label>
                        <Input
                            id="middle_name"
                            name='middle_name'
                            value={data.user_profile.middle_name}
                            onChange={(e) => setData({ ...data, user_profile: { ...data.user_profile, middle_name: e.target.value } })}
                        />
                    </div>
                    <div className='w-1/3'>
                        <Label
                            htmlFor='last_name'
                            required={true}
                        >
                            Last Name
                        </Label>
                        <Input
                            id="last_name"
                            name='last_name'
                            value={data.user_profile.last_name}
                            onChange={(e) => setData({ ...data, user_profile: { ...data.user_profile, last_name: e.target.value } })}
                        />
                    </div>
                </div>
                <div className='flex items-start gap-2'>
                    <div className='w-1/2'>
                        <Label
                            htmlFor='middle_name'
                        >
                            Age
                        </Label>
                        <Input
                            id="age"
                            name='age'
                            type="number"
                            value={data.user_profile.age}
                            onChange={(e) => setData({ ...data, user_profile: { ...data.user_profile, age: e.target.value } })}
                        />
                    </div>
                    <div className='w-1/2'>
                        <Label
                            htmlFor='middle_name'
                        >
                            Courses
                        </Label>
                        <Input
                            id="age"
                            name='age'
                            type="number"
                            value={data.user_profile.courses}
                            onChange={(e) => setData({ ...data, user_profile: { ...data.user_profile, courses: e.target.value } })}
                        />
                    </div>
                </div>
                <div>
                    <Label
                        htmlFor='username'
                        required={true}
                    >
                        Username
                    </Label>
                    <Input
                        id="username"
                        name='username'
                        value={data.username}
                        onChange={(e) => setData({ ...data, username: e.target.value })}
                    />
                </div>
                <div>
                    <Label
                        htmlFor='email'
                        required={true}
                    >
                        Email
                    </Label>
                    <Input
                        id="email"
                        name='email'
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                    />
                </div>
                <div>
                    <Label
                        htmlFor='password'
                        required={true}
                    >
                        Password
                    </Label>
                    <Input
                        id="password"
                        name='password'
                        type='password'
                        value={data.password}
                        onChange={(e) => setData({ ...data, password: e.target.value })}
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
    student: PropTypes.object,
    closeModal: PropTypes.func,
}

export default Form;