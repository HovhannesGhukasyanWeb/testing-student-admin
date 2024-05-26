import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeDateFormat } from "../../../helpers/changeDateFormat";
import Search from "../../../components/search";
import Table from '../../../components/table';
import Form from "./components/form";
import Actions from "./components/actions";
import { getDatas } from "./api";
import OpenModalForm from "../../../components/modals/openModalForm";

const ManagerTeachersModule = () => {

    const { data: teachers, total, loading } = useSelector(state => state.table);
    let [searchParams] = useSearchParams();
    const dispatch = useDispatch()

    useEffect(() => {
        (async() => {
            dispatch(getDatas());
        })();
    },[searchParams, dispatch]);

    const FormComponent = () => <Form/>;
    
    return (
        <div className="p-2 w-full">
            <div className="flex items-center justify-between w-full">
                <Search />
                <OpenModalForm title="Create Teacher" buttonText='add teacher' component={FormComponent} />
            </div>

            <div className="mt-4">
                <Table
                    data={teachers}
                    columns={[
                        { title: "ID", render: (teacher) => teacher.id },
                        { title: "Name", render: (teacher) => teacher.username },
                        { title: "Email", render: (teacher) => teacher.email },
                        { title: "Date", render: (teacher) => changeDateFormat(teacher.created_at) },
                        { title: "Actions", render: (teacher) => <Actions teacher={teacher} /> },
                    ]}
                    total={total}
                    loading={loading}
                />
            </div>
        </div>
    );
}

export default ManagerTeachersModule;