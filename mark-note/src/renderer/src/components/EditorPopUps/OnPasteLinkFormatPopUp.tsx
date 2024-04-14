import { createPortal } from 'react-dom';
import { ComponentProps, useState} from "react"
import { IoIosLink } from "react-icons/io";
import { EditorView} from '@codemirror/view'
import { InsertTextInEditor } from '../MarkdownEditorToolBar';

export type OnPasteLinkFormatPopUpModalProps = {
    onClose: () => void;
    pastedText: string,
    editorView: EditorView | null | undefined;
    visible: boolean,
}

export const OnPasteLinkFormatPopUpModal  = ({
    onClose,
    pastedText,
    editorView,
    visible,
}: OnPasteLinkFormatPopUpModalProps) => {
    const [linkFormat, setLinkFormat] = useState("")
    const [selectedRadio, setSelectedRadio] = useState("option1")

    const formatList = [
        {
          id: 'option1',
          title: 'Plain URL',
          formatting: pastedText,
        },
        {
          id: 'option2',
          title: 'With empty title',
          formatting: "[](" + pastedText + ")",
        },
        {
          id: 'option3',
          title: 'With angle brackets',
          formatting: "<" + pastedText + ">",
        },
    ];

    const handleOptionChange = (changeEvent) => {
        setSelectedRadio(changeEvent.target.value)
    }

    const handleOnClickCreate = () => {
        const chosenFormat = formatList.find(e => e.id === selectedRadio)

        if(chosenFormat == undefined) return
        if(editorView == null) return 
        if(editorView == undefined) return

        InsertTextInEditor(chosenFormat.formatting, editorView, false)

        onClose()

        setLinkFormat("")
    }

    const handleOnClickCancel = () => {
        onClose()

        setLinkFormat("")
    }

    if(!visible) return null

    return createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-10 flex justify-center z-20">
            <div className="mt-10 flex flex-col gap-2 text-white">
                <div className="bg-zinc-600 rounded-lg px-2 py-1 flex flex-col gap-5 mx-4 px-5">
                    <div className='flex flex-row gap-3'>
                        <IoIosLink className="w-4 h-4 text-zinc-100"/>
                        <div>Choose a link format</div>
                    </div>
                    <RadioButtonForm 
                    handleOptionChange={handleOptionChange} 
                    selectedRadio={selectedRadio}
                    formatList={formatList}/>
                    <div className='flex justify-center items-center space-x-8'>
                        <button onClick={handleOnClickCancel} className="rounded bg-zinc-800 px-9 py-2">Cancel</button>
                        <button onClick={handleOnClickCreate} className="rounded bg-zinc-800 px-9 py-2">Create</button>
                    </div>
                </div>
            </div>
            
        </div>, document.body)
}

export type RadioButtonFormProps = ComponentProps<'form'> & {
    handleOptionChange?: (changeEvent) => void,
    selectedRadio: string,
    formatList,
}

export const RadioButtonForm = ({
    handleOptionChange, 
    selectedRadio,
    formatList,
     ...props}: RadioButtonFormProps) => {

    return (
        <ul className="grid grid-rows-3 gap-x-5 m-5">
        <div className="relative flex items-center justify-center">
            <p>
                {formatList[0].title}
            </p>
            <input type="radio" value="option1" id='option1' 
                checked={selectedRadio == 'option1'}
                onChange={handleOptionChange}
                className='hidden peer'/>
            <label htmlFor='option1' className="cursor-pointer bg-zinc-100 rounded-xl text-black p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-black">
                {formatList[0].formatting}
            </label>
        </div>
        <div className="relative flex items-center justify-center">
            <p>
                {formatList[1].title}
            </p>
            <input type="radio" value="option2" id='option2' 
                checked={selectedRadio == 'option2'}
                onChange={handleOptionChange}
                className='hidden peer'/>
            <label htmlFor='option2' className="cursor-pointer bg-zinc-100 rounded-xl text-black p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-black">
                {formatList[1].formatting}
            </label>
        </div>
        <div className="relative flex items-center justify-center">
            <p>
                {formatList[2].title}
            </p>
            <input type="radio" value="option3" id='option3' 
                checked={selectedRadio == 'option3'}
                onChange={handleOptionChange}
                className='hidden peer'/>
            <label htmlFor='option3' className="cursor-pointer bg-zinc-100 rounded-xl text-black p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-black">
                {formatList[2].formatting}
            </label>
        </div>
        </ul>
    )
}