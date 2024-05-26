import { useEffect } from "react";
import FormModal from "../../../components/modals/formModal";
import Search from "../../../components/search";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../../store/slices/tableSlice";
import Table from "../../../components/table";
import params from "./utils/params";
import Actions from "./components/actions";
import Form from "./components/form";

const TestQuestions = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data: test, loading } = useSelector(state => state.table);
    const testQuestions = test.test_questions ?? [];
    const total = testQuestions.length;
    console.log(testQuestions)
    useEffect(() => {
        dispatch(fetchData({ endpoint: `/teacher/tests/${id}`, params }));
    }, [id, dispatch]);

    return (
        <div className="w-full">
            <div className="p-2 w-full">
                <div className="py-2">
                    <div className="flex justify-between">
                        <h1 className="text-2xl font-semibold">Test questions</h1>
                        <span className="text-2xl">
                            <span className="text-gray-500">Test name: {test.name}</span>
                        </span>
                    </div>
                    <p className="text-sm text-gray-500">Add questions to test</p>
                </div>
                <div className="flex items-center justify-between w-full">
                    {/* <Search /> */}
                    <div></div>
                    <FormModal buttonText='Create test question' component={() => <Form />} />
                </div>
                <div>
                    <Table
                        columns={[
                            { title: "ID", render: (testQuestion) => testQuestion.id },
                            { title: "Question Title", render: (testQuestion) => testQuestion.question.title },
                            { title: "Question Points", render: (testQuestion) => testQuestion.question.point },
                            { title: "Actions", render: (testQuestion) => <Actions testQuestion={testQuestion} /> }
                        ]}
                        data={testQuestions}
                        loading={loading}
                        total={total}
                        perPage={total}
                    />
                </div>
            </div>
        </div>
    );
}

export default TestQuestions;