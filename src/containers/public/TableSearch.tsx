import { ChangeEvent, FC, useEffect, useState } from "react";

interface ISearch {
  placeholder?: string;
  type?: string;
  className?: string;
  onChange: (event: string) => void;
  search?: string,
}

const TableSearch: FC<ISearch> = ({ onChange, search='', placeholder, className = "", type = "text",  }) => {

  const [value, setValue] = useState<string>(search)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    onChange(e.target.value)
  }


  useEffect(() => {
    setValue(search)
  }, [search])

  return (
    <div className={`${className}`}>
      <input
        type={type}
        placeholder={placeholder}
        className="w-[90%] p-2 m-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none "
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};

export default TableSearch;
