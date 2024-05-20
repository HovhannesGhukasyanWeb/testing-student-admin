import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../../store/slices/tableSlice";
import params from "./utils/params";
import Form from "./components/form";
import Search from "../../../components/search";
import FormModal from "../../../components/modals/formModal";
import Table from "../../../components/table";
import Actions from "./components/actions";


const Page = () => {
    const { data: roles, total, loading } = useSelector(state => state.table);
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            dispatch(fetchData({ endpoint: "/admin/roles", params }));
        })();
    }, [dispatch]);

    const FormComponent = () => <Form />;

    return (
        <div className="w-full">
            <div className="p-2 w-full">
                <div className="flex items-center justify-between w-full">
                    <Search />
                    <FormModal buttonText='Create role' component={FormComponent} />
                </div>

                <div className="mt-4 w-full">
                    <Table
                        data={roles}
                        columns={[
                            { title: "ID", render: (role) => role.id },
                            { title: "Name", render: (role) => role.name },
                            { title: "Actions", render: (role) => <Actions role={role} /> },
                        ]}
                        total={total}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    )
}

export default Page;