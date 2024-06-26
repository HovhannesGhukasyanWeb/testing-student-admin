import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../../store/slices/tableSlice";
import Actions from "./components/action";
import Table from '../../../components/table';
import {changeDateFormat} from '../../../helpers/changeDateFormat';
import Form from "./components/form";
import Search from "../../../components/search";
import OpenModalForm from "../../../components/modals/openModalForm";

const ManagerSubjectsModule = () => {
    const { data: subjects, total, loading } = useSelector(state => state.table);
    let [searchParams] = useSearchParams();
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            dispatch(fetchData({ endpoint: "/manager/subjects"}));
        })();
    }, [searchParams, dispatch]);

    const FormComponent = () => <Form/>;

    return (
            <div className="p-2 w-full">
                <div className="flex items-center justify-between w-full">
                    <Search />
                    <OpenModalForm title="Create Subject" buttonText='add Subject' component={FormComponent} />
                </div>

                <div className="mt-4">
                <Table
                        data={subjects}
                        columns={[
                            { title: "ID", render: (subject) => subject.id },
                            { title: "Name", render: (subject) => subject.name },
                            { title: "Date", render: (subject) => changeDateFormat(subject.created_at) },
                            { title: "Actions", render: (subject) => <Actions subject={subject} /> },
                        ]}
                        total={total}
                        loading={loading}
                    />
                </div>
            </div>
    )
}

export default ManagerSubjectsModule;