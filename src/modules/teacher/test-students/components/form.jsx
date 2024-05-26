import Label from '../../../../ui/label';
import Input from '../../../../ui/input';
import Button from '../../../../ui/button';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import baseApi from '../../../../apis/baseApi';
import { getAxiosConfig } from '../../../../apis/config';
import { errorAlert, successAlert } from '../../../../helpers/alertMessage';
import { useParams } from 'react-router-dom';
import handleError from '../../../../helpers/handleError'
import parseDate from '../../../../helpers/parseDate';
import { storeApi } from '../../../../apis/baseCrudApi';
import { useDispatch } from 'react-redux';
import params from '../utils/params';
import { Loader2 } from 'lucide-react';
import { fetchData } from '../../../../store/slices/tableSlice';

const Form = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [studentOptions, setStudentOptions] = useState([]);
    const { id: testId } = useParams();
    const [data, setData] = useState({
        test_id: testId,
        user_id: null,
        test_data_from: '',
        test_data_to: '',
    });


    useEffect(() => {
        (async () => {
            try {
                const { data: response } = await baseApi.get('/manager/students', { ...getAxiosConfig(), params: { include: 'userProfile' } });
                const options = response.data.map(student => {
                    const label = student.user_profile.first_name + ' ' + student.user_profile.middle_name + ' ' + student.user_profile.last_name;
                    return {
                        label: label ?? student.username,
                        value: student.id
                    }
                });

                setStudentOptions(options);
            } catch (error) {
                errorAlert(error);
            }
        })();
    }, []);

    const saveHandler = async e => {
        e.preventDefault();
        try {
            setLoading(true);
            await storeApi('/teacher/test_user', {
                ...data,
                test_data_from: parseDate(data.test_data_from),
                test_data_to: parseDate(data.test_data_to)
            });
            successAlert("Student assigned to test successfully");
            dispatch(fetchData({
                endpoint: '/teacher/tests' + testId,
                params
            }))
        } catch (error) {
            handleError(error)
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={saveHandler}>
            <div className="space-y-4">
                <div>
                    <Label
                        htmlFor='student'
                        required
                    >Student</Label>
                    <Select
                        options={studentOptions}
                        placeholder='Select student'
                        onChange={selectedOption => setData({ ...data, user_id: selectedOption.value })}
                    />
                </div>
                <div>
                    <Label
                        htmlFor='student'
                        required
                    >Start Time</Label>
                    <Input
                        type='datetime-local'
                        id='start_time'
                        name='start_time'
                        value={data.test_data_from}
                        onChange={e => setData({ ...data, test_data_from: e.target.value })}
                    />
                </div>
                <div>
                    <Label
                        htmlFor='end_time'
                        required
                    >End Time</Label>
                    <Input
                        type='datetime-local'
                        id='end_time'
                        name='end_time'
                        value={data.test_data_to}
                        onChange={e => setData({ ...data, test_data_to: e.target.value })}
                    />
                </div>
                <div>
                    <Button disabled={loading} type='submit' className='w-full flex items-center justify-center gap-2'>
                        {loading && <Loader2 className='w-4 h-4 animate-spin' />}
                        Save
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default Form;