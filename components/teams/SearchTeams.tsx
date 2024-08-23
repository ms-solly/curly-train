import React from 'react';

interface SearchTeamsInpProps {
    searchInput: string;
    setSearchInput: (value: string) => void;
}

const SearchTeamsInp: React.FC<SearchTeamsInpProps> = ({ searchInput, setSearchInput }) => {
    return (
        <div className="flex justify-center m-5 mb-10">
            <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search Teams by name or ID"
                className="border-box w-2/3 rounded border-2 border-solid p-2 outline-none focus:border-green-500 focus:transition-all lg:w-1/3"
            />
        </div>
    );
};

export default SearchTeamsInp;
