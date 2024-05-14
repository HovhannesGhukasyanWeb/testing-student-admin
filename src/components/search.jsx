import { useSearchParams } from "react-router-dom";
import { SearchIcon } from "lucide-react";
import Input from "./ui/input";

const Search = () => {
    let [searchParams, setSearchParams] = useSearchParams();

    const handleSearch = (e) => {
        e.preventDefault();
        searchParams.set('search', e.target.search.value);
        searchParams.set('page', 1);
        setSearchParams(searchParams);
    }

    const changeHandler = (e) => {
        if(e.target.value !== ''){
            searchParams.set('search', '');
            searchParams.set('page', 1);
            setSearchParams(searchParams);
        }
    }

    return(
        <form className="inline-flex  items-center relative" onSubmit={handleSearch}>
            <Input placeholder="Search users..." className="min-w-[400px]" name="search" onChange={changeHandler}/>
            <button type="submit" className="ml-2 w-5 h-5 flex items-center justify-center absolute right-0 mr-3 bg-white">
                <SearchIcon />
            </button>
        </form>
    );
}


export default Search;