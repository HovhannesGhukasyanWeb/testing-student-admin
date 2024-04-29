import { useState } from "react";
import baseApi from "../../apis/baseApi";
import Button from "../../components/ui/button";
import Input from "../../components/ui/input";
import Label from "../../components/ui/label";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { getAxiosConfig } from "../../apis/config";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    const loginHandler = async (e) => {
        e.preventDefault();

        try {
            setErrors({
                email: "",
                password: "",
            });
            setLoading(true);
            const email = e.target.email.value;
            const password = e.target.password.value;
            const payload = { email, password };

            const { data } = await baseApi.post("/api/login", payload);
            localStorage.setItem("authToken", data.token);

            const { data: me } = await baseApi.get("/api/getMe", getAxiosConfig());
            const user = me.user;
            user.userProfile = me.user_profile;

            dispatch(login(user));

            toast.success("Login successful", {
                position: "top-right",
            });

            navigate("/");
        } catch (error) {
            if (error instanceof AxiosError) {
                const { response } = error;
                const status = response?.status;
                if (status === 401) {
                    const message = response?.data.errors[0];
                    toast.error(message, {
                        position: "top-right",
                    });
                }

                if (status === 422) {
                    const errors = {};
                    Object.keys(response?.data.errors).forEach((errorKey) => {
                        errors[errorKey] = response?.data.errors[errorKey][0];
                    })
                    setErrors(errors);
                }

                return;
            }

            toast.error("An error occurred. Please try again later.");
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="h-full flex items-center justify-center">
            <div className="w-[500px] bg-white rounded-lg shadow-lg">
                <div className="px-2 py-4 border-b border-lightgray">
                    <h1 className="text-center font-semibold text-xl">Login to Student Testing Admin</h1>
                </div>

                <div className="px-2 py-4">
                    <form onSubmit={loginHandler}>
                        <div className="mb-4">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="text"
                                name="email"
                                autoComplete="off"
                                errorMessage={errors.email}
                            />
                        </div>

                        <div className="mb-4">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                autoComplete="off"
                                errorMessage={errors.password}
                            />
                        </div>

                        <div className="flex items-center justify-end">
                            <div className="text-sm">
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
                            </div>
                        </div>

                        <div className="mt-4 flex justify-center">
                            <Button
                                type="submit"
                                variant="primary"
                                className="w-full"
                                disabled={loading}
                            >
                                Sign in
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default Login;