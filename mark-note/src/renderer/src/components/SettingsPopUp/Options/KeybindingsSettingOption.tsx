
export const KeybindingSettingOption = () => {

    const keybindingItems = [
        {
          keybinding: 'Ctrl + b',
          action: 'bold',
        },
        {
            keybinding: 'Ctrl + u',
            action: 'underline',
        },
      ];
    
    return (
        <div className="keybinding">
            <h2 className="mb-2 font-bold truncate text-xl">Keybinding Settings</h2>

            <table className="table-auto">
                <thead>
                    <tr>
                        <th>Keybinding</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {keybindingItems.map(item => {
                    return (
                    <tr key={item.keybinding + item.action}>
                        <td >{ item.keybinding }</td>
                        <td >{ item.action }</td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </div> 
        )
}
