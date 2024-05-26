import { useNavigate } from "react-router-dom";
import Button from "../../ui/button";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <main className="flex items-center justify-center flex-col gap-[50px] w-full">
            <h2>Page not found.</h2>
            <Button
                type="button"
                variant="primary"
                onClick={() => navigate("/")}
            >
                Return home
            </Button>
        </main>
    );
}

export default NotFound;