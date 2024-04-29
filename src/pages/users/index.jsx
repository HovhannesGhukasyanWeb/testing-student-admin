import Input from "../../components/ui/input";
import { Search } from "lucide-react";
import Create from "./create";
import Table from "./table";
import { useEffect, useState } from "react";
import baseApi from "../../apis/baseApi";
import { getAxiosConfig } from "../../apis/config";
import { useSearchParams } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [total, setTotal] = useState(0);
    let [searchParams] = useSearchParams();

    useEffect(() => {
        (async () => {
            const limit = 10;
            const page = searchParams.get("page") || 1;
            const { data: response } = await baseApi.get("/api/admin/users", { ...getAxiosConfig(), params: { limit, page } });
            setUsers(response.data);
            setTotal(response.totalData);
        })();
    }, [searchParams]);

    return (
        <div className="p-2 w-full">
            <div className="flex items-center justify-between w-full">
                <form className="inline-flex  items-center relative">
                    <Input placeholder="Search users..." className="min-w-[400px]" name="search" />
                    <button type="submit" className="ml-2 w-5 h-5 flex items-center justify-center absolute right-0 mr-3 bg-white">
                        <Search />
                    </button>
                </form>

                <Create />
            </div>

            <div className="mt-4">
                <Table
                    users={users}
                    total={total}
                />
            </div>
        </div>
    )
}

export default Users;