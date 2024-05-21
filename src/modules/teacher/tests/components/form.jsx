import { useEffect, useState } from "react";
import Input from "../../../../ui/input";
import Label from "../../../../ui/label";
import baseApi from "../../../../apis/baseApi";
import { getAxiosConfig } from "../../../../apis/config";
import Select from 'react-select';
import Button from "../../../../ui/button";
import { Loader2 } from "lucide-react";

const Form = () => {
    const [testTypeOptions, setTestTypeOptions] = useState([]);
    const [subjectOptions, setSubjectOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            const { data: response } = await baseApi.get('/teacher/test_type', getAxiosConfig());
            setTestTypeOptions(response.data.map(({ id, name }) => ({ value: id, label: name })));
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const { data: response } = await baseApi.get('/manager/subjects', getAxiosConfig());
            setSubjectOptions(response.data.map(({ id, name }) => ({ value: id, label: name })));
        })();
    }, []);

    return (
        <form>
            <div className="space-y-4">
                <div>
                    <Label
                        htmlFor="name"
                        required={true}
                    >
                        Name
                    </Label>
                    <Input type="text" id="name" />
                </div>
                <div>
                    <Label
                        htmlFor="name"
                        required={true}
                    >
                        Subject
                    </Label>
                    <Select
                        options={subjectOptions}
                        isSearchable={true}
                    />
                </div>
                <div>
                    <Label
                        htmlFor="name"
                        required={true}
                    >
                        Test type
                    </Label>
                    <Select
                        options={testTypeOptions}
                        isSearchable={true}
                    />
                </div>
                <div>
                    <Button type="submit" className="w-full flex items-center gap-2 justify-center">
                        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                        Save
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default Form;