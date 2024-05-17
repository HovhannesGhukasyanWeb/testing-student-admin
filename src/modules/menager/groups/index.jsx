import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getDatas } from "./api";
import Search from "../../../components/search";
import Table from "../../../components/table";
import Form from "./components/form";
import OpenModalForm from "../../../components/modals/openModalForm";
import { changeDateFormat } from "../../../helpers/changeDateFormat";
import Actions from "./components/actions";

const ManagerGroups = () => {
    const dispatch = useDispatch();
    let [searchParams] = useSearchParams();
    const { data: groups, total, loading } = useSelector(state => state.table);

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
                <OpenModalForm title="Create Group" buttonText='add group' component={FormComponent} />
            </div>

            <div className="mt-4">
                <Table
                    data={groups}
                    columns={[
                        { title: "ID", render: (group) => group.id },
                        { title: "Name", render: (group) => group.name },
                        { title: "description", render: (group) =>  group.description },
                        // { title: "Email", render: (student) => student.email },
                        { title: "Date", render: (group) => changeDateFormat(group.created_at) },
                        { title: "Actions", render: (group) => <Actions group={group} /> },
                    ]}
                    total={total}
                    loading={loading}
                />
            </div>
        </div>
    )
}

export default ManagerGroups;