
export const Checkbox = ({ label, value, onChange }) => {
    return (
      <div className="flex flex-row">
        <input type="checkbox" checked={value} onChange={onChange} className="relative peer shrink-0 appearance-none w-4 h-4 border-2
         border-zinc-700 rounded-sm bg-zinc-100 mt-1 checked:bg-zinc-800 checked:border-0" />
        <p className="pl-3">{label}</p>
        <svg
        className=" absolute w-4 h-4 mt-1 hidden peer-checked:block pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
    );
  };