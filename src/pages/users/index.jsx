import Create from "./create";
import Table from "./table";
import { createContext, useEffect, useState } from "react";
import baseApi from "../../apis/baseApi";
import { getAxiosConfig } from "../../apis/config";
import { useSearchParams } from "react-router-dom";
import Search from './search';

export const UsersContext = createContext();

const Users = () => {
    const [users, setUsers] = useState([]);
    const [total, setTotal] = useState(0);
    let [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            setLoading(true)
            const limit = 10;
            const page = searchParams.get("page") || 1;
            const search = searchParams.get("search") || null;
            const { data: response } = await baseApi.get("/api/admin/users", { ...getAxiosConfig(), params: { limit, page, include: 'role', search } });
            setUsers(response.data);
            setTotal(response.totalData);
            setLoading(false);
        })();
    }, [searchParams]);

    return (
        <UsersContext.Provider value={{ users, setUsers, setTotal, setLoading }}>
            <div className="p-2 w-full">
                <div className="flex items-center justify-between w-full">
                    <Search />
                    <Create />
                </div>

                <div className="mt-4">
                    <Table
                        users={users}
                        total={total}
                        loading={loading}
                    />
                </div>
            </div>
        </UsersContext.Provider>
    )
}

export default Users;