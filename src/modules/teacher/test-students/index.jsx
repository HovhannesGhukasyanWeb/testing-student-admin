import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchData } from "../../../store/slices/tableSlice";
import params from "./utils/params";
import FormModal from "../../../components/modals/formModal";
import Table from "../../../components/table";
import Actions from "./components/actions";
import Form from "./components/form";
import { changeDateFormat } from '../../../helpers/changeDateFormat';

const TestStudents = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data: test, loading } = useSelector(state => state.table);
    const testStudents = test.test_users ?? [];
    const total = testStudents.length;

    useEffect(() => {
        dispatch(fetchData({ endpoint: `/teacher/tests/${id}`, params }));
    }, [id, dispatch]);

    return (
        <div className="w-full">
            <div className="p-2 w-full">
                <div className="flex items-center justify-between w-full">
                    <div></div>
                    <FormModal buttonText='Create test student' component={() => <Form />} />
                </div>
                <div>
                    <Table
                        columns={[
                            { title: "ID", render: (testStudent) => testStudent.id },
                            {
                                title: "Student", render: (testStudent) => {
                                    const student = testStudent.user;
                                    const studentProfile = student.user_profile;
                                    const text = `${studentProfile.first_name ?? ""} ${studentProfile.middle_name ?? ""} ${studentProfile.last_name ?? ""}`
                                    const isTextEmpty = text.trim() === "";
                                    return !isTextEmpty ? text : student.username;
                                }
                            },
                            { title: "Status", render: (testStudent) => testStudent.status },
                            { title: "Mark", render: (testStudent) => testStudent.mark ?? "Not set" },
                            { title: "Start Time", render: (testStudent) => changeDateFormat(testStudent.test_data_from) },
                            { title: "End Time", render: (testStudent) => changeDateFormat(testStudent.test_data_to) },
                            { title: "Actions", render: (testStudent) => <Actions testStudent={testStudent} /> }
                        ]}
                        data={testStudents}
                        loading={loading}
                        total={total}
                        perPage={total}
                    />
                </div>
            </div>
        </div>
    )
}

export default TestStudents;