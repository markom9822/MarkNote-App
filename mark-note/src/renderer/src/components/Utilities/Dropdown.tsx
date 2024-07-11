

export const Dropdown = ({options, selectedOption, OnChangeOption}) => {

    return (
        <div>
            <select value={selectedOption} onChange={OnChangeOption} className="bg-bkgPrimary border border-gray-800 text-textPrimary text-sm rounded-lg hover:bg-bkgPrimary focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block p-2.5">
                {options.map(option => (
                    <option key={option.id + option.label} value={option.id}>{option.label}</option>
                ))}

            </select>
        </div>
    )
}


export const NumberDropdown = ({options, selectedOption, OnChangeOption}) => {

    return (
        <div>
            <select value={selectedOption} onChange={OnChangeOption} className="w-20 bg-bkgPrimary border border-gray-800 text-sm text-textPrimary rounded-lg hover:bg-bkgPrimary focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 p-2.5">
                {options.map(option => (
                    <option key={option.id + option.label} value={option.id}>{option.label}</option>
                ))}

            </select>
        </div>
    )
}