
export const Dropdown = ({options}) => {

    return (
        <div>
            <select className="bg-gray-500 border border-gray-800 text-gray-50 text-sm rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block p-2.5">
                {options.map(option => (
                    <option key={option.value + option.label} value={option.value}>{option.label}</option>
                ))}

            </select>
        </div>
    )
}


export const NumberDropdown = ({options}) => {

    return (
        <div>
            <select className="w-20 bg-gray-500 border border-gray-800 text-gray-50 text-sm rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 p-2.5">
                {options.map(option => (
                    <option key={option.value + option.label} value={option.value}>{option.label}</option>
                ))}

            </select>
        </div>
    )
}