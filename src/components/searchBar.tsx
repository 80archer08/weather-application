type SearchBarProps = {
    city: string;
    setCity: (value: string) => void;
    onSearch: () => void;
    loading: boolean;
};

function SearchBar({ city, setCity, onSearch, loading }: SearchBarProps) {
    return (
        <div>
            <input
                type ="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
            />

            <button onClick={onSearch} disabled={loading}>
                {loading ? "Loading..." : "Search"}
            </button>
        </div>
    );
}

export default SearchBar;