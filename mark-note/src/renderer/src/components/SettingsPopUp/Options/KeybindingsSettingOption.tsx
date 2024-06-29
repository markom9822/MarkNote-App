


export const KeybindingSettingOption = () => {

    const keybindingItems = [
        {
          keybinding: 'Ctrl + B',
          source: 'Markdown',
          action: 'Bold',
        },
        {
            keybinding: 'Ctrl + I',
            source: 'Markdown',
            action: 'Italic',
        },
        {
            keybinding: 'Ctrl + Shift + U',
            source: 'Markdown',
            action: 'Underline',
        },
        {
            keybinding: 'Ctrl + Shift + S',
            source: 'Markdown',
            action: 'Strikethrough',
        },
        {
            keybinding: 'Ctrl + Shift + C',
            source: 'Markdown',
            action: 'Code Block',
        },
        {
            keybinding: 'Ctrl + 1',
            source: 'Markdown',
            action: 'Heading 1',
        },
        {
            keybinding: 'Ctrl + 2',
            source: 'Markdown',
            action: 'Heading 2',
        },
        {
            keybinding: 'Ctrl + 3',
            source: 'Markdown',
            action: 'Heading 3',
        },
        {
            keybinding: 'Ctrl + 4',
            source: 'Markdown',
            action: 'Heading 4',
        },
        {
            keybinding: 'Ctrl + 5',
            source: 'Markdown',
            action: 'Unordered List',
        },
        {
            keybinding: 'Ctrl + 6',
            source: 'Markdown',
            action: 'Ordered List',
        },
        {
            keybinding: 'Ctrl + 7',
            source: 'Markdown',
            action: 'Task List',
        },
        {
            keybinding: 'Ctrl + 8',
            source: 'Markdown',
            action: 'Quote',
        },
        {
            keybinding: 'Ctrl + C',
            source: 'Editor',
            action: 'Copy',
        },
        {
            keybinding: 'Ctrl + V',
            source: 'Editor',
            action: 'Paste',
        },
        {
            keybinding: 'Ctrl + Z',
            source: 'Editor',
            action: 'Undo',
        },
        {
            keybinding: 'Ctrl + Y',
            source: 'Editor',
            action: 'Redo',
        },
        {
            keybinding: 'Ctrl + U',
            source: 'Editor',
            action: 'Undo Selection',
        },
        {
            keybinding: 'Alt + U',
            source: 'Editor',
            action: 'Redo Selection',
        },
        {
            keybinding: 'Alt + ArrowUp',
            source: 'Editor',
            action: 'Move Line Up',
        },
        {
            keybinding: 'Alt + ArrowDown',
            source: 'Editor',
            action: 'Move Line Down',
        },
        {
            keybinding: 'Shift + Alt + ArrowUp',
            source: 'Editor',
            action: 'Copy Line Up',
        },
        {
            keybinding: 'Ctrl + A',
            source: 'Editor',
            action: 'Select All',
        },
        {
            keybinding: 'Alt + L',
            source: 'Editor',
            action: 'Select Line',
        },

      ];
    
    return (
        <div className="keybinding">
            <h2 className="mb-2 font-bold truncate text-xl text-textPrimary">Keybinding Settings</h2>

            <div>
                <table className="table-auto text-sm">
                <thead className="bg-bkgPrimary border-b border-zinc-300 text-textPrimary">
                    <tr>
                        <th className="px-6 py-2">Keybinding</th>
                        <th className="px-6 py-2">Source</th>
                        <th className="px-6 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                {keybindingItems.map(item => {
                    return (
                    <tr key={item.keybinding + item.action} className="bg-bkgPrimary/20 border-b border-zinc-500">
                        <td className="px-2 text-textPrimary">{ item.keybinding }</td>
                        <td className="px-2 text-textSecondary">{ item.source }</td>
                        <td className="px-2 text-textPrimary">{ item.action }</td>
                        </tr>
                        );
                    })}
                </tbody>
                </table>
            </div>
        </div> 
        )
}
