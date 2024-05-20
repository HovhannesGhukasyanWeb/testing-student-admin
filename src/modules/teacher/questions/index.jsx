import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../../store/slices/tableSlice";
import params from "./utils/params";
import Search from "../../../components/search";
import FormModal from "../../../components/modals/formModal";
import Table from "../../../components/table";
import Actions from "./components/actions";
import Form from "./components/form";

const Questions = () => {
    const { data: questions, total, loading } = useSelector(state => state.table);
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            dispatch(fetchData({ endpoint: "/teacher/questions", params }));
        })();
    }, [dispatch]);

    const FormComponent = () => <Form />

    return (
        <div className="w-full">
            <div className="p-2 w-full">
                <div className="flex items-center justify-between w-full">
                    <Search />
                    <FormModal buttonText='Create question' component={FormComponent} />
                </div>

                <div className="mt-4 w-full">
                    <Table
                        data={questions}
                        columns={[
                            { title: "ID", render: (question) => question.id },
                            { title: "Title", render: (question) => question.title },
                            { title: "Point", render: (question) => question.point },
                            { title: "Question Type", render: (question) => question.question_type.description ?? question.question_type.name },
                            { title: "Actions", render: (question) => <Actions question={question} /> },
                        ]}
                        total={total}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    )
}

export default Questions;