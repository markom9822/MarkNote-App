import { NoteInfo } from "@shared/models";
import { ComponentProps } from "react";
import { cn , formatDateFromMs} from '@renderer/utils'
import { FaRegCircle, FaRegCircleDot, FaRegCirclePause, FaRegCircleCheck, FaRegCircleXmark } from "react-icons/fa6";


export type NotePreviewProps = NoteInfo & {
    isActive?: boolean
} & ComponentProps<'div'>

export const NotePreview = ({
    title, 
    content, 
    lastEditTime,
    status,
    isActive = false, 
    className, 
    ...props
}: NotePreviewProps) => {
    const date = formatDateFromMs(lastEditTime)

    function findArrayElementByTitle(array, title) {
        return array.find((element) => {
          return element.title === title;
        })
    }

    const chosenElement = findArrayElementByTitle(statusOptions, status)

    return( <div className={cn('cursor-pointer px-2.5 py-3 transition-colors duration-75', 
    {
        'bg-bkgSecondary border-r-4 border-indigo-500': isActive,
        'hover:bg-bkgSecondary/75 text-textSecondary': !isActive,
    },
    className
    )}
    {...props}
    >
        <div className="flex space-x-2 items-center text-textPrimary">
            <div>{<chosenElement.icon className={chosenElement.className} />}</div>
            <h3 className="font-bold truncate">{title}</h3>
        </div>
        <span className="inline-block w-full mb-2 text-xs font-light text-textSecondary text-left">{date}</span>
    </div>
    )
}


export const statusOptions = [{
    id: '0',
    title: 'Active',
    icon: FaRegCircleDot,
    className: 'text-sky-400 w-3 h-3',
  }, 
  {
    id: '1',
    title: 'On Hold',
    icon: FaRegCirclePause,
    className: 'text-orange-400 w-3 h-3',
  },
  {
    id: '2',
    title: 'Completed',
    icon: FaRegCircleCheck,
    className: 'text-green-400 w-3 h-3',
  },
  {
    id: '3',
    title: 'Dropped',
    icon: FaRegCircleXmark,
    className: 'text-rose-400 w-3 h-3',
  }
];