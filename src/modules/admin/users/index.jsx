import { useEffect } from "react";
import Table from "../../../components/module/table";
import Actions from "./components/actions";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../../store/slices/tableSlice";
import CreateModal from "../../../components/module/modals/createModal";
import Form from "./components/form";
import Search from "../../../components/search";
import { useSearchParams } from "react-router-dom";


const Users = () => {
    const { data: users, total, loading } = useSelector(state => state.table);
    const dispatch = useDispatch();
    let [searchParams] = useSearchParams();
    useEffect(() => {
        (async () => {
            dispatch(fetchData({ endpoint: "/admin/users", params: { include: 'role&userProfile' } }));
        })();
    }, [searchParams, dispatch]);

    const FormComponent = () => <Form/>;

    return (
        <div className="w-full">
            <div className="p-2 w-full">
                <div className="flex items-center justify-between w-full">
                    <Search />
                    <CreateModal buttonText='add Subject' component={FormComponent} />
                </div>

                <div className="mt-4 w-full">
                    <Table
                        data={users}
                        columns={[
                            { title: "ID", render: (user) => user.id },
                            { title: "Name", render: (user) => user.username },
                            { title: "Email", render: (user) => user.email },
                            { title: "Role", render: (user) => user.role?.name },
                            { title: "Actions", render: (user) => <Actions user={user} /> },
                        ]}
                        total={total}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    )
}

export default Users;