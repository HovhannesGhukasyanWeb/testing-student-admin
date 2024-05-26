import { useParams } from "react-router-dom";
import Label from "../../../../ui/label";
import Select from 'react-select';
import { useEffect, useState } from "react";
import baseApi from "../../../../apis/baseApi";
import { getAxiosConfig } from "../../../../apis/config";
import handleError from "../../../../helpers/handleError";
import { storeApi } from "../../../../apis/baseCrudApi";
import { useDispatch } from "react-redux";
import { fetchData } from "../../../../store/slices/tableSlice";
import params from "../utils/params";
import Button from "../../../../ui/button";
import { Loader2 } from "lucide-react";

const Form = () => {
    const { id: testId } = useParams();
    const [questionOptions, setQuestionOptions] = useState([]);
    const [questionId, setSelectedQuestionId] = useState(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            const { data: response } = await baseApi.get(`/teacher/questions`, getAxiosConfig());
            const questions = response.data;
            const options = questions.map(question => ({
                value: question.id,
                label: question.title
            }));
            setQuestionOptions(options);
        })();
    }, []);

    const saveHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await storeApi('teacher/test/questions', {
                test_id: testId,
                question_id: questionId
            });
            dispatch(fetchData({ endpoint: `/teacher/tests/${testId}`, params }));
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={saveHandler}>
            <div className="space-y-4">
                <div>
                    <Label htmlFor="question">Select Question</Label>
                    <Select
                        options={questionOptions}
                        onChange={(selectedOption) => setSelectedQuestionId(selectedOption.value)}
                    />
                </div>
                <div>
                    <Button type="submit" disabled={loading} className="w-full flex items-center gap-2 justify-center">
                        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                        Save
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default Form;