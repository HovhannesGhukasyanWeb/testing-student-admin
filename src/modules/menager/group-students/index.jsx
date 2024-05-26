import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchData } from "../../../store/slices/tableSlice";
import params from "./utils/params";
import Search from "../../../components/search";
import FormModal from "../../../components/modals/formModal";
import Table from "../../../components/table";
import Actions from "./components/actions";
import Form from "./components/form";

const GroupStudents = () => {
    const { id } = useParams();
    const { data: group, loading } = useSelector(state => state.table);
    const groupStudents = group?.group_users ?? [];
    const total = groupStudents.length;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchData({ endpoint: "/manager/groups/" + id, params }));
    }, [dispatch, id]);


    const FormComponent = () => (<Form allOtherStudentIds={groupStudents.map(groupStudent => groupStudent.user.id)} />);

    return (
        <div className="w-full">
            <div className="p-2 w-full">
                <div className="py-2">
                    <div className="flex justify-between">
                        <h1 className="text-2xl font-semibold">Group students</h1>
                        <span className="text-2xl">
                            <span className="text-gray-500">Group name: {group.name}</span>
                        </span>
                    </div>
                    <p className="text-sm text-gray-500">Add students to group</p>
                </div>
                <div className="flex items-center justify-between w-full">
                    <Search />
                    <FormModal title={'Add student to group'} buttonText='Create new group student' component={FormComponent} />
                </div>

                <div className="mt-4 w-full">
                    <Table
                        data={groupStudents}
                        columns={[
                            { title: "ID", render: (groupStudent) => groupStudent.user.id },
                            { title: "email", render: (groupStudent) => groupStudent.user.email },
                            { title: "username", render: (groupStudent) => groupStudent.user.username },
                            { title: "Actions", render: (groupStudent) => <Actions groupStudent={groupStudent} otherStudentIds={groupStudents.map(groupStudent => groupStudent.user.id)} /> },
                        ]}
                        total={total}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    )
}
export default GroupStudents;