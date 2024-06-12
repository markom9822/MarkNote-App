# MarkNote App Project
<img src="https://github.com/markom9822/MarkNote-App_V2/assets/96113848/d240f0d4-2f35-48dd-8fab-c27e48da6a69" width="600">

This is a markdown based note taking app developed using:
- [Electron](https://www.electronjs.org/)
- [React](https://react.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Jotai](https://jotai.org/)
- [Codemirror 6](https://codemirror.net/)
- [Remark](https://github.com/remarkjs/remark)

You can create, edit and delete notes with a side by side editor and HTML preview which updates in real time.
Notes can have a status to let you keep track of your progress.

![image](https://github.com/markom9822/MarkNote-App_V2/assets/96113848/c58bf6b9-65b6-4790-9c07-01b0ae7996d8)

The Markdown editor supports:
- Github flavoured markdown
- Github alerts
- Underlined text
- Highlighting text
- Emojis
- Math

In the settings menu the theme for the UI, Editor and Preview can be adjusted to your liking.
![image](https://github.com/markom9822/MarkNote-App_V2/assets/96113848/33250402-0ee3-4fec-bb3e-7f3e4f499bbb)

## Markdown in MarkNote

### Headings
To add a heading into a note add one to four `#` symbols before your heading text. The number of `#`'s determines the hierarchy level and typeface size of the heading.
In the editor toolbar there is a heading helper button to automate the syntax with a button press.

```
# A first heading
## A second heading
### A third heading
#### A fourth heading
```
![image](https://github.com/markom9822/MarkNote-App_V2/assets/96113848/4386f53b-81a4-485b-aec1-2a3afd89bab1)

### Styling Text
You can style the text in your note with bold, italic, strikethrough, underlined, highlighted, subscript, or superscript text.

| Style         |   Syntax   |         Example          |   Output     |
| :---:        | :---:    |       :---:                |   :---:      |
| Bold         | `** **`   | `**This is bold text**`   |               |
| Italic        | `* *`   |  `*This text is italicized*`  |           |
| Strikethrough | `~~ ~~`   |  `*This text not needed*`  |           |
| Underlined | `__ __`   |  `*This text is underlined*`  |           |
| Highlighted | `**= =**`   |  `**=This text is highlighted=**`  |           |
| Subscript | `<sub> </sub>`   |  `This is a <sub>subscript</sub> text`  |           |
| Superscript | `<sup> </sup>`   |  `This is a <sup>superscript</sup> text`  |           |

### Lists


### Task Lists


### Qoutes
You can create a quote using `>` before your text

```
> Text that is a quote
```

### Code
You can insert inline code using a backtick infront of and after your code text.

```
This is some `code` inline
```
You can also create a code block by using triple backticks.

### Links
You can create an inline link by wrapping link text in brackets `[ ]`, and then wrapping the URL in parentheses `( )`.


### Images


### Tables


### Emojis



### Footnotes

```
Here is a simple footnote[^1].

A footnote can also have multiple lines[^2].

[^1]: My reference.
[^2]: To add line breaks within a footnote, prefix new lines with 2 spaces.
  This is a second line.
```


### Github Style Alerts

```
> [!NOTE]
> Useful information that users should know, even when skimming content.

> [!TIP]
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.
```


### Dividers





