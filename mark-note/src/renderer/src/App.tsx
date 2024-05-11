import { ActionButtonsRow, Content, FloatingNoteTitle, MarkdownEditor, NotePreviewList, RootLayout, Sidebar, SettingsPopUpModal, SettingsButton, MarkdownEditorToolBar, NotesSearchBar, EditorTitleBar} from "@/components";
import { useRef, useState, useCallback } from "react";
import { MarkdownPreview } from "./components/MarkdownPreview";
import { EditorView } from "@codemirror/view";
import { NoteInfo } from "@shared/models";
import { OnPasteLinkFormatPopUpModal } from "./components/EditorPopUps/OnPasteLinkFormatPopUp";

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

      <RootLayout>
        <Sidebar className="bg-zinc-900/80">
          <ActionButtonsRow className="flex justify-between mt-1"/>
          <SettingsButton onClick={() => setShowSettings(true)}/>
          <NotesSearchBar className="px-2"/>
          <NotePreviewList className = "mt-3 space-y-1" onSelect={resetScroll}/>
        </Sidebar>   

        <Content ref={contentContainerRef} className="border-l bg-zinc-800 border-l-white/20">
          <EditorTitleBar/>
          <MarkdownEditorToolBar editorView={markdownEditor?.view} className="sticky top-0 z-10 pt-2"/>
          <div>{markdownEditor?.editor}</div>
        </Content>

        <Content ref={contentContainerRef} className="border-l bg-zinc-900 border-l-white/20">
          <FloatingNoteTitle className="pt-2"/>
          <MarkdownPreview markdownContent={markdownDoc}/>
        </Content>

      </RootLayout>
    </>
  )
}

export default App
