const DropList = ({ selectedValue, options, setValue, type }) => {
    return (
        <select
            value={selectedValue}
            onChange={(e) => setValue(e.target.value)}
            className="bg-[#383838] text-white text-[1.4rem] block w-full text-center leading-none outline-none border-none py-2 truncate"
        >
            <option value="">{type}</option>
            {options?.map((option, index) => {
                return (
                    <option key={index} value={option?.value || option}>
                        {option?.label?.subLabel || option?.label || option}
                    </option>
                );
            })}
        </select>
    );
};

export default DropList;
