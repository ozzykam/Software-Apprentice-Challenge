 const Search = ({
  search,
  setSearch,
  platformFilter,
  setPlatformFilter,
  sortOrder,
  setSortOrder
}) => {
  const toggleSortOrder = () => {
    setSortOrder(prev =>
      prev === "asc" ? "desc" : "asc"
    );
  };

  const clearSortandFilter = () => {
    setSortOrder(null);
    setSearch("");
    setPlatformFilter("All");
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
      <input
        type="text"
        placeholder="Search by campaign name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm w-full sm:w-1/3"
      />

      <select
        value={platformFilter}
        onChange={(e) => setPlatformFilter(e.target.value)}
        className= 'px-4 py-2 border border-gray-300 rounded-md shadow-sm w-full sm:w-1/4'
      >
        <option value="All">All Platforms</option>
        <option value="Facebook">Facebook</option>
        <option value="Twitter">Twitter</option>
        <option value="Snapchat">Snapchat</option>
      </select>

      <div className="flex gap-2">
        <button 
          onClick={toggleSortOrder}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-1"
        >
          Sort Spend {sortOrder === "asc" ? "▲" : "▼"}
        </button>
        <button 
          onClick={clearSortandFilter}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default Search;