import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getDatas } from "./api";
import Search from "../../../components/search";
import Table from "../../../components/table";
import Form from "./components/form";
import OpenModalForm from "../../../components/modals/openModalForm";
import { changeDateFormat } from "../../../helpers/changeDateFormat";
import { userFullName } from "../../../helpers/user";

const ManagerStudents = () => {
    const dispatch = useDispatch();
    let [searchParams] = useSearchParams();
    const { data: students, total, loading } = useSelector(state => state.table);

    useEffect(() => {
        (async () => {
            dispatch(getDatas());
        })()
    }, [dispatch, searchParams]);

    const FormComponent = () => <Form/>;

    return (
        <div className="p-2 w-full">
            <div className="flex items-center justify-between w-full">
                <Search />
                <OpenModalForm title="Create Student" buttonText='add student' component={FormComponent} />
            </div>

            <div className="mt-4">
                <Table
                    data={students}
                    columns={[
                        { title: "ID", render: (student) => student.id },
                        { title: "Username", render: (student) => student.username },
                        { title: "Fullname", render: (student) =>  userFullName(student) },
                        { title: "Email", render: (student) => student.email },
                        { title: "Date", render: (student) => changeDateFormat(student.created_at) },
                        { title: "Actions", render: (student) => <Actions student={student} /> },
                    ]}
                    total={total}
                    loading={loading}
                />
            </div>
        </div>
    )
}

export default ManagerStudents;