import { useEffect } from "react";

const useOutsideClick = (ref, setState) => {
    useEffect(() => {
        const checkIfClickedOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setState();
            }
        };

        document.addEventListener("mousedown", checkIfClickedOutside);

        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside);
        };
    }, [ref, setState]);
};

export default useOutsideClick;