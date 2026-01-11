function SearchBar({ search, onSearch }) {
  return (
    <input
      placeholder="Tìm theo email..."
      value={search}
      onChange={e => onSearch(e.target.value)}
    />
  )
}

export default SearchBar
