import { ComponentProps, useState, useEffect } from "react"
import { twMerge } from "tailwind-merge"
import { FaRegCircleDot, FaRegCirclePause, FaRegCircleCheck, FaRegCircleXmark } from "react-icons/fa6";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { useSetAtom, useAtomValue } from "jotai"
import { setNoteStatusAtom, selectedNoteAtom} from "@renderer/store"


export const NoteStatusDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [chosenStatus, setChosenStatus] = useState('Active');

    const selectedNote = useAtomValue(selectedNoteAtom)
    const setNoteStatus = useSetAtom(setNoteStatusAtom)

    const statusOptions = [{
        id: '0',
        title: 'Active',
        icon: FaRegCircleDot,
        colour: 'text-sky-400',
        svg: <svg className="w-3 h-3 me-2 mt-0.5 text-sky-400" aria-hidden="true" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"><path d="M256 56c110.532 0 200 89.451 200 200 0 
        110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m0-48C119.033
         8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 168c-44.183 0-80
          35.817-80 80s35.817 80 80 80 80-35.817 80-80-35.817-80-80-80z"></path>
        </svg>
      }, 
      {
        id: '1',
        title: 'On Hold',
        icon: FaRegCirclePause,
        colour: 'text-orange-400',
        svg: <svg className="w-3 h-3 me-2 mt-0.5 text-orange-400" aria-hidden="true" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" 
        xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119 8 8 119 8 256s111 248 248 248
        248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5
        200-200 200zm96-280v160c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0
        16 7.2 16 16zm-112 0v160c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16z"></path>
        </svg>
      },
      {
        id: '2',
        title: 'Completed',
        icon: FaRegCircleCheck,
        colour: 'text-green-400',
        svg: <svg className="w-3 h-3 me-2 mt-0.5 text-green-400" aria-hidden="true" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248
        248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200
        200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705
        -12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705
         4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"></path>
         </svg>
      },
      {
        id: '3',
        title: 'Dropped',
        icon: FaRegCircleXmark,
        colour: 'text-rose-400',
        svg: <svg className="w-3 h-3 me-2 mt-0.5 text-rose-400" aria-hidden="true" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256
        256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4
        33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47
        47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"></path>
        </svg>
      }
    ];

    useEffect(() => {

        if (!selectedNote) return
        if(selectedNote.status !== "")
        {
            console.log(selectedNote.status)
            setChosenStatus(selectedNote.status)
        }   
            
    }, [selectedNote?.title])


    function findArrayElementByTitle(array, title) {
        return array.find((element) => {
          return element.title === title;
        })
    }

    const handleStatusOptionClicked = async(changeEvent) => {
        setChosenStatus(changeEvent.target.value)
        await setNoteStatus(changeEvent.target.value)
        setIsOpen(false)
    }

    const chosenElement = findArrayElementByTitle(statusOptions, chosenStatus)

    return (
        <div className="relative flex flex-col">
            <div className="">
                <div>
                    <button onClick={() => setIsOpen((prev) => !prev)} className="text-xs text-left rounded hover:bg-bkgPrimary transition-colors duration-100 focus:outline focus:outline-indigo-500
                     px-2 py-1">
                        <div className="flex space-x-1 items-center text-textSecondary">
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
                <div className="absolute z-20 bg-bkgPrimary top-8 rounded-md">
                    {statusOptions.map(function(statusOption) {
                        return(
                            <StatusOptionButton onClick={handleStatusOptionClicked} value={statusOption.title} key={statusOption.title + statusOption.colour}>
                                {statusOption.svg}
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
    return <button className={twMerge('w-full text-xs text-textPrimary text-left inline-flex hover:bg-bkgSecondary/50 transition-colors duration-100 px-3 py-2', className
    )} {...props}
    >
        {children}
    </button>
}

export const DropdownArrow = (isOpen: boolean) => {

    if (isOpen)
    {
        return <MdArrowDropUp className="w-4 h-4 text-iconPrimary"/>
    }

    return <MdArrowDropDown className="w-4 h-4 text-iconPrimary"/>
}