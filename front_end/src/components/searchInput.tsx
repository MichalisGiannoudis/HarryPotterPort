const SearchInput = ({ searchValue, onSearchChange, placeholder, ...rest }: { searchValue: string, onSearchChange: (value: string) => void, placeholder: string }) => {

  return (
    <input
      type="text"
      placeholder={placeholder}
      className="w-[65%] mb-3 px-3 py-1 border rounded-xl focus:outline-none focus:ring-gray-300 focus:border-gray-300 border-gray-200"
      value={searchValue}
      onChange={(e) => { onSearchChange(e.target.value) }}
      {...rest}
    />
  );
}

export default SearchInput;