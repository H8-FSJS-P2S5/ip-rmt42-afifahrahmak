import { useState } from "react";

export const SearchBar = ({ changeSearchKey }) => {
    const [searchKey, setSearchKey] = useState('');

    const handleOnSubmit = (e) => {
        e.preventDefault();
        changeSearchKey(searchKey);
    }

    return (
        <section className="search_section">
            <div className="flex justify-center">
                <form onSubmit={handleOnSubmit} id="search-query-form">
                    <div className="flex items-center border rounded-full p-1 search_bar">
                        <input
                            type="text"
                            id="search-query"
                            className="flex-1 appearance-none border-0 py-1 px-2 rounded-l-full focus:outline-none"
                            placeholder="Cari buku ..."
                            name="keyword"
                            value={searchKey}
                            onChange={(e) => setSearchKey(e.target.value)}
                            style={{ borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px', borderRight: 'none', borderWidth: '1px' }}
                        />
                        <div className="input-group-append">
                            <button
                                type="submit"
                                className=" search_button rounded-r-full py-1 px-2 text-white"
                                style={{ borderRadius: '20px', width: '80px', borderWidth: '1px' }}
                                id="search-button"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}