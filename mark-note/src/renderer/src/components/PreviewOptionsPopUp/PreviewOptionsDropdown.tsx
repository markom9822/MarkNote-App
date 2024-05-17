import { useState, useEffect, useRef } from "react"
import { FiMoreVertical } from "react-icons/fi";
import { ActionButton, ActionButtonProps } from "@/components"


export const PreviewOptionsDropdown = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef("dropdown");

    const previewOptions = [{
        id: '0',
        title: 'Export as PDF',
      }, {
        id: '1',
        title: 'Print',
      }
    ];


    return (
        <div className="relative flex flex-col">
            <div>
                <div>
                    <ActionButton onClick={() => setIsOpen((prev) => !prev)} { ...props}>
                        <FiMoreVertical className="w-4 h-4 text-zinc-300" />
                    </ActionButton>
                </div>
            </div>
            {isOpen && (
                <div className="absolute right-0 w-32 bg-zinc-700 top-8 rounded-lg">
                    {previewOptions.map(function(data) {
                        return(
                        <div>
                            <button className="w-full text-sm text-left hover:bg-zinc-900/50 transition-colors duration-100 px-3 py-2">
                                {data.title}
                            </button>
                        </div> 
                        )
                    })}
                </div>
            )}
        </div>
    )
}