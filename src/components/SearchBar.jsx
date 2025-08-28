export default function SearchBar({ value, onChange }){
  return (
    <label className="block mb-4" aria-label="Search recipes by name">
      <span className="sr-only">Search recipes</span>
      <input
        type="search"
        className="input"
        placeholder="Search recipes…"
        value={value}
        onChange={(e)=>onChange(e.target.value)}
      />
    </label>
  )
}
