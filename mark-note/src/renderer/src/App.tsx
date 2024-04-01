import { ActionButtonsRow, Content, FloatingNoteTitle, MarkdownEditor, NotePreviewList, RootLayout, Sidebar, SettingsPopUpModal, SettingsButton, MarkdownEditorToolBar} from "@/components";
import { useRef, useState, useCallback } from "react";
import { MarkdownPreview } from "./components/MarkdownPreview";
import { EditorView } from "@codemirror/view";

const App = () => {

  const contentContainerRef = useRef<HTMLDivElement>(null)

  const resetScroll = () => {
    contentContainerRef.current?.scrollTo(0,0)
  }

  const [markdownDoc, setMarkdown] = useState<string>('');
  const [showSettings, setShowSettings] = useState(false)

  const handleSettingsOnClose = () => setShowSettings(false)

  const handleDocChange = useCallback(newDoc => {
    setMarkdown(newDoc)
  }, [])

  const mardownEditor = MarkdownEditor({
    onChange: handleDocChange,
    editable: !showSettings
  })

  return (
    <>
    <SettingsPopUpModal onClose={handleSettingsOnClose} visible={showSettings}/>

      <RootLayout>
        <Sidebar className="bg-zinc-900/80">
          <ActionButtonsRow className="flex justify-between mt-1"/>
          <SettingsButton onClick={() => setShowSettings(true)}/>
          <NotePreviewList className = "mt-3 space-y-1" onSelect={resetScroll}/>
        </Sidebar>   

        <Content ref={contentContainerRef} className="border-l bg-zinc-900/50 border-l-white/20">
          <MarkdownEditorToolBar editorView={mardownEditor?.view} className="sticky top-0 z-10 pt-2"/>
          <div>{mardownEditor?.editor}</div>
        </Content>

        <Content ref={contentContainerRef} className="border-l bg-zinc-900/50 border-l-white/20">
          <FloatingNoteTitle className="pt-2"/>
          <MarkdownPreview markdownContent={markdownDoc}/>
        </Content>

      </RootLayout>
    </>
  )
}

export default App
