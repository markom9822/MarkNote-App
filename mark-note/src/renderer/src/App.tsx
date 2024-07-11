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

  const uiThemeString = getSettingPrefValueFromTitle('UI Theme');
  const editorThemeString = getSettingPrefValueFromTitle('Editor Theme');
  const previewThemeString = getSettingPrefValueFromTitle('Preview Theme');

  const getEditorBkgColour = (themeString: string) => {
    switch (themeString) {
      case 'dark':
        return "bg-zinc-800"
      case 'light':
        return "bg-white"
      case 'solarizedDark':
        return "bg-[#002b36]"
      case 'solarizedLight':
        return "bg-[#fdf6e3]"
      case 'nord':
        return "bg-[#2e3440]"
      case 'gruvboxDark':
        return "bg-[#282828]"
      case 'gruvboxLight':
        return "bg-[#faebd7]"
      default:
        return "bg-zinc-800"
    }
  }

  const getPreviewBkgColour = (themeString: string) => {
    switch (themeString) {
      case 'dark':
        return "bg-zinc-900"
      case 'light':
        return "bg-white"
      case 'navy':
        return "bg-[#22262e]"
      case 'gruvboxDark':
        return "bg-[#282828]"
      case 'gruvboxLight':
        return "bg-[#faebd7]"
      default:
        return "bg-zinc-900"
    }
  }

  const editorClassName = "border-l border-l-borderSecondary " + getEditorBkgColour(editorThemeString)
  const previewClassName = "border-l border-l-borderSecondary " + getPreviewBkgColour(previewThemeString)

  const handleSettingsOnClose = () => setShowSettings(false)
  
  const handleDocChange = useCallback(newDoc => {
    setMarkdown(newDoc)
  }, [])

  const markdownEditor = MarkdownEditor({
    onChange: handleDocChange,
    editable: !showSettings,
  })


  return (
    <>
    <main className={uiThemeString}>

    <SettingsPopUpModal onClose={handleSettingsOnClose} visible={showSettings} uiTheme={uiThemeString}/>

    <DraggableTopBar/>

      <RootLayout>
        <Sidebar className="bg-bkgPrimary/90 overflow-y-auto">
          <div className="flex justify-between my-2">
            <SettingsButton onClick={() => setShowSettings(true)}/>
            <p className="text-lg text-textPrimary/70 font-medium">Notes</p>
            <NewNoteButton />
          </div>
          <hr className="h-px my-3 bg-borderSecondary border-0 " />
          <NotePreviewList className = "mt-3 pb-10 space-y-1" onSelect={resetScroll}/>
        </Sidebar>   

        <Content ref={contentContainerRef} className={editorClassName}>
          <EditorTopBar className="bg-bkgSecondary" />
          <EditorTitleBar className="bg-bkgSecondary"/>
          <hr className="h-px bg-borderPrimary/70 border-0" />
          <MarkdownEditorToolBar uiTheme={uiThemeString} editorView={markdownEditor?.view} className="sticky top-0 z-10 pt-2"/>
          <Editor className="h-[calc(100vh-150px)] overflow-y-auto">
            <div className="pb-8">
              {markdownEditor?.editor}
            </div>
          </Editor>
        </Content>

        <Content ref={contentContainerRef} className={previewClassName} >
            <FloatingNoteTitle/>
            <Editor className="h-[calc(100vh-170px)] overflow-y-auto">
              <div>
              <MarkdownPreview markdownContent={markdownDoc}/>
              </div>
            </Editor>
        </Content>

      </RootLayout>
      </main>
    </>
  )
}

export default App
