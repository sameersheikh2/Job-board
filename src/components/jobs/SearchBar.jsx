import { useState } from "react";
import { Search } from "lucide-react";
import { FormInput } from "../../../components/ui/form-field";

const SearchBar = ({
  value,
  onChange,
  placeholder = "Role, company, or skill",
}) => {
  const [inputValue, setInputValue] = useState(value || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onChange(inputValue);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <FormInput
        className="flex-1"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
      />
      <button
        type="submit"
        aria-label="Run search"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#0f172a] text-white shadow-sm transition hover:bg-[#0c1323]"
      >
        <Search className="h-4 w-4" />
      </button>
    </form>
  );
};

export default SearchBar;
