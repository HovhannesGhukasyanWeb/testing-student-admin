import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchData } from "../../../store/slices/tableSlice";
import params from "./utils/params";
import Search from "../../../components/search";
import FormModal from "../../../components/modals/formModal";
import Table from "../../../components/table";
import Form from "./components/form";
import Actions from "./components/actions";

const Tests = () => {
    const { data: tests, total, loading } = useSelector(state => state.table);
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            dispatch(fetchData({ endpoint: "/teacher/tests", params: { ...params, search: searchParams.get("search") ?? null } }));
        })();
    }, [dispatch, searchParams]);

    const FormComponent = () => (<Form />)

    return (
        <div className="w-full">
            <div className="p-2 w-full">
                <div className="flex items-center justify-between w-full">
                    <Search />
                    <FormModal buttonText='Create test' component={FormComponent} />
                </div>

                <div className="mt-4 w-full">
                    <Table
                        data={tests}
                        columns={[
                            { title: "ID", render: (test) => test.id },
                            { title: "Name", render: (test) => test.name },
                            { title: "Subject", render: (test) => test.subject?.name },
                            { title: "Test type", render: (test) => test.type?.name },
                            { title: "Actions", render: (test) => <Actions test={test} /> },
                        ]}
                        total={total}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    )
}

export default Tests;