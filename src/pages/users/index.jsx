import Create from "./create";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Search from './search';
import Table from "../../components/ui/table";
import Actions from "./actions";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../store/slices/tableSlice";


const Users = () => {
    const { data: users, total, loading } = useSelector(state => state.table);
    let [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            const limit = 10;
            const page = searchParams.get("page") || 1;
            const search = searchParams.get("search") || null;
            dispatch(fetchData({ endpoint: "/admin/users", params: { limit, page, include: 'role&userProfile', search } }));
        })();
    }, [searchParams, dispatch]);

    return (
        <div className="w-full">
            <div className="p-2 w-full">
                <div className="flex items-center justify-between w-full">
                    <Search />
                    <Create />
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