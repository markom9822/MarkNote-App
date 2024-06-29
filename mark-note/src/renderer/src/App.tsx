import { ActionButtonsRow, Content, FloatingNoteTitle, MarkdownEditor, NotePreviewList, RootLayout, 
  Sidebar, SettingsPopUpModal, SettingsButton, MarkdownEditorToolBar, NotesSearchBar, EditorTitleBar, EditorTopBar, NewNoteButton,
  Editor,
  Preview,
  DraggableTopBar} from "@/components";
import { useRef, useState, useCallback } from "react";
import { MarkdownPreview } from "./components/MarkdownPreview";
import { EditorView } from "@codemirror/view";
import { NoteInfo } from "@shared/models";
import { OnPasteLinkFormatPopUpModal } from "./components/EditorPopUps/OnPasteLinkFormatPopUp";
import { getSettingPrefValueFromTitle } from "./hooks/useSettingsList";

const App = () => {

  const contentContainerRef = useRef<HTMLDivElement>(null)

  const resetScroll = () => {
    contentContainerRef.current?.scrollTo(0,0)
  }

  const [markdownDoc, setMarkdown] = useState<string>('');
  const [showSettings, setShowSettings] = useState(false)
  const [showOnPasteLinkFormat, setShowOnPasteLinkFormat] = useState(false)
  const [pastedLinkText, setPastedLinkText] = useState('')
  
  const handleSettingsOnClose = () => setShowSettings(false)
  
  const handleDocChange = useCallback(newDoc => {
    setMarkdown(newDoc)
  }, [])
  
  const handlePastedLink = (pastedText: string) => {
    setShowOnPasteLinkFormat(true)
    setPastedLinkText(pastedText)
  }

  const markdownEditor = MarkdownEditor({
    onChange: handleDocChange,
    onPastedLink: handlePastedLink,
    editable: !showSettings,
  })
  
  const handleOnPasteLinkFormatOnClose = () => setShowOnPasteLinkFormat(false)


  return (
    <>
    <SettingsPopUpModal onClose={handleSettingsOnClose} visible={showSettings}/>
    <OnPasteLinkFormatPopUpModal onClose={handleOnPasteLinkFormatOnClose} visible={showOnPasteLinkFormat} pastedText={pastedLinkText} editorView={markdownEditor?.view} />

    <DraggableTopBar/>

      <RootLayout>
        <Sidebar className="bg-zinc-900/80 overflow-y-auto">
          <div className="flex justify-between my-2">
            <SettingsButton onClick={() => setShowSettings(true)}/>
            <p className="text-lg text-zinc-400">Notes</p>
            <NewNoteButton />
          </div>
          <hr className="h-px my-3 bg-zinc-700 border-0 " />
          <NotePreviewList className = "mt-3 pb-10 space-y-1" onSelect={resetScroll}/>
        </Sidebar>   

        <Content ref={contentContainerRef} className="border-l bg-zinc-800 border-l-white/20">
          <EditorTopBar />
          <EditorTitleBar/>
          <hr className="h-px bg-zinc-700 border-0" />
          <MarkdownEditorToolBar editorView={markdownEditor?.view} className="sticky top-0 z-10 pt-2"/>
          <Editor className="h-[calc(100vh-150px)] overflow-y-auto">
            <div className="pb-8">
              {markdownEditor?.editor}
            </div>
          </Editor>
        </Content>

        <Content ref={contentContainerRef} className="border-l border-l-white/20 bg-zinc-900" >
            <FloatingNoteTitle className=""/>
            <Editor className="h-[calc(100vh-170px)] overflow-y-auto">
              <div>
              <MarkdownPreview markdownContent={markdownDoc}/>
              </div>
            </Editor>
        </Content>

      </RootLayout>
    </>
  )
}

export default App
