import { ComponentProps, useState } from "react"
import { twMerge } from "tailwind-merge"
import { FaRegCircle, FaRegCircleDot, FaRegCirclePause, FaRegCircleCheck, FaRegCircleXmark } from "react-icons/fa6";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

export const NoteStatusDropdown = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [chosenStatus, setChosenStatus] = useState('Active');

    const statusOptions = [{
        id: '0',
        title: 'Active',
        icon: FaRegCircleDot,
        colour: 'text-sky-400'
      }, 
      {
        id: '1',
        title: 'On Hold',
        icon: FaRegCirclePause,
        colour: 'text-orange-400'
      },
      {
        id: '2',
        title: 'Completed',
        icon: FaRegCircleCheck,
        colour: 'text-green-400'
      },
      {
        id: '3',
        title: 'Dropped',
        icon: FaRegCircleXmark,
        colour: 'text-rose-400'
      }
    ];

    function findArrayElementByTitle(array, title) {
        return array.find((element) => {
          return element.title === title;
        })
    }

    const handleStatusOptionClicked = (changeEvent) => {
        setChosenStatus(changeEvent.target.value)
        setIsOpen(false)
    }

    const chosenElement = findArrayElementByTitle(statusOptions, chosenStatus)

    return (
        <div className="relative flex flex-col">
            <div className="">
                <div>
                    <button onClick={() => setIsOpen((prev) => !prev)} className="text-xs text-left rounded hover:bg-zinc-900 transition-colors duration-100 px-2 py-1">
                        <div className="flex space-x-1 items-center text-zinc-300">
                            <div>
                                <div className="flex space-x-2 items-center">
                                    <chosenElement.icon className={chosenElement.colour}/>
                                    <div className="text-xs">{chosenElement.title}</div>
                                </div>
                            </div>
                            {DropdownArrow(isOpen)}
                        </div>
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="absolute z-20 bg-zinc-900 top-8 rounded-md">
                    {statusOptions.map(function(statusOption) {
                        return(
                            <StatusOptionButton onClick={handleStatusOptionClicked} value={statusOption.title} key={statusOption.title + statusOption.colour}>
                                <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                                    <path fill-rule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clip-rule="evenodd"/>
                                </svg>
                                {statusOption.title}
                            </StatusOptionButton>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export type StatusOptionButtonProps = ComponentProps<'button'>

export const StatusOptionButton = ({className, children, ...props}: StatusOptionButtonProps) => {
    return <button className={twMerge('w-full text-xs text-left inline-flex hover:bg-zinc-600/50 transition-colors duration-100 px-3 py-2', className
    )} {...props}
    >
        {children}
    </button>
}

export const DropdownArrow = (isOpen: boolean) => {

    if (isOpen)
    {
        return <MdArrowDropUp className="w-4 h-4 text-zinc-300"/>
    }

    return <MdArrowDropDown className="w-4 h-4 text-zinc-300"/>
}