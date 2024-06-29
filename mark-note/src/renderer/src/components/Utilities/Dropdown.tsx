

export const Dropdown = ({options, selectedOption, OnChangeOption}) => {

    return (
        <div>
            <select value={selectedOption} onChange={OnChangeOption} className="bg-gray-500 border border-gray-800 text-gray-50 text-sm rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block p-2.5">
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
            <select value={selectedOption} onChange={OnChangeOption} className="w-20 bg-gray-500 border border-gray-800 text-gray-50 text-sm rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 p-2.5">
                {options.map(option => (
                    <option key={option.id + option.label} value={option.id}>{option.label}</option>
                ))}

            </select>
        </div>
    )
}