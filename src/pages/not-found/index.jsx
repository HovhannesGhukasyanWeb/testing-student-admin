import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <main className="flex items-center justify-center flex-col gap-[50px]">
            <h2>Page not found.</h2>
            <button
                className="btn"
                type="button"
                onClick={() => navigate(-1)}
            >
                Return to previous page
            </button>
        </main>
    );
}

export default NotFound;