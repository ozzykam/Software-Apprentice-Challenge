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

  const clearSort = () => setSortOrder(null);

  return (
    <div >
      <input
        type="text"
        placeholder="Search by campaign name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={platformFilter}
        onChange={(e) => setPlatformFilter(e.target.value)}
      >
        <option value="All">All Platforms</option>
        <option value="Facebook">Facebook</option>
        <option value="Twitter">Twitter</option>
        <option value="Snapchat">Snapchat</option>
      </select>

      <div className="flex gap-2">
        <button onClick={toggleSortOrder}>
            Sort Spend {sortOrder === "asc" ? "▲" : "▼"}
        </button>
        <button onClick={clearSort}>
            Clear
        </button>
      </div>
    </div>
  );
}

export default Search;