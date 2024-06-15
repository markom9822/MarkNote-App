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
| Bold         | `** **`   | `**This is bold text**`   |   ![image](https://github.com/markom9822/MarkNote-App_V2/assets/96113848/b574a362-4256-44f5-876b-1bd231b45c7c) |
| Italic        | `* *`   |  `*This text is italicized*`  | ![image](https://github.com/markom9822/MarkNote-App_V2/assets/96113848/c03f94c9-8506-43a2-a69c-64aa44aa8c97) |
| Strikethrough | `~~ ~~`   |  `~~This text not needed~~`  |  ![image](https://github.com/markom9822/MarkNote-App_V2/assets/96113848/e48775a9-fc26-4ea5-adf6-e24b6a3b7828)|
| Underlined | `__ __`   |  `__This text is underlined__`  |  ![image](https://github.com/markom9822/MarkNote-App_V2/assets/96113848/7fbfd1c0-c7e5-4f1e-a313-e5323d25a84e)|
| Highlighted | `**= =**`   |  `**=This text is highlighted=**`  | ![image](https://github.com/markom9822/MarkNote-App_V2/assets/96113848/3cf461d7-294e-483c-a648-73a2ed9c0d45)|
| Subscript | `<sub> </sub>`   |  `This is a <sub>subscript</sub> text`  | ![image](https://github.com/markom9822/MarkNote-App_V2/assets/96113848/69e61f7a-66b6-4009-aa54-3c9cfa1510e3)|
| Superscript | `<sup> </sup>`   |  `This is a <sup>superscript</sup> text`  | ![image](https://github.com/markom9822/MarkNote-App_V2/assets/96113848/a8015618-1948-4fee-8370-fc24e93dd854)|

### Lists
You can make an unordered list by starting one or more lines of text with `-`

```
- List item 1
- List item 2
- List item 3
```
![image](https://github.com/markom9822/MarkNote-App_V2/assets/96113848/ba84a92b-3169-4712-bf27-93f3536e95d5)

To make an ordered list, start each line with a number.

```
1. List item 1
2. List item 2
3. List item 3
```
![image](https://github.com/markom9822/MarkNote-App_V2/assets/96113848/46239774-8276-4a20-9618-27403320cca1)

### Task Lists
You can make a task list by starting list items with a hyphen and space followed by `[ ]`. To mark a task as complete, use `[x]`.

```
- [x] Task item 1
- [x] Task item 2
- [ ] Task item 3
```
![image](https://github.com/markom9822/MarkNote-App_V2/assets/96113848/74eda5af-4d0b-4bc2-aedb-34373262692f)

### Qoutes
You can create a quote using `>` before your text

```
> Text that is a quote
```
![image](https://github.com/markom9822/MarkNote-App_V2/assets/96113848/487e0e3c-72ac-47ce-9d82-4d060e139dab)

### Code
You can insert inline code using a backtick infront of and after your code text.

```
This is some `code` inline
```
![image](https://github.com/markom9822/MarkNote-App_V2/assets/96113848/315340a6-fae1-4e62-9ea7-d513c160909e)

You can also create a code block by using triple backticks.

![image](https://github.com/markom9822/MarkNote-App_V2/assets/96113848/4a2d6e43-caf9-4779-9244-14c145249537)

![image](https://github.com/markom9822/MarkNote-App_V2/assets/96113848/6dd2ca56-7315-493b-8295-f353d4bfd18d)


### Links
You can create an inline link by wrapping link text in brackets `[ ]`, and then wrapping the URL in parentheses `( )`.

```
Check out this guide for markdown syntax [Markdown Guide](https://www.markdownguide.org/basic-syntax/).
```
![image](https://github.com/markom9822/MarkNote-App_V2/assets/96113848/b6121c6f-c91d-4c9b-a4b5-0b2d1c31e4bd)

You can select the link button in the editor toolbar to bring up the link format helper.

![image](https://github.com/markom9822/MarkNote-App_V2/assets/96113848/57eb6735-c8dd-4132-abb3-b9b54d506c1c)

You can input a link title, link address and click insert to add a formatted link to your selected line in the editor.


### Images
You can add an image to your note by adding ! and wrapping the info text in `[ ]`. Then, wrap the link for the image in parentheses `()`.

```
![Octocat](https://myoctocat.com/assets/images/base-octocat.svg)
```

![image](https://github.com/markom9822/MarkNote-App_V2/assets/96113848/1fd197e6-d162-48cf-8b21-685e2fb84719)

You can select the image button in the editor toolbar to bring up the image format helper.

![image](https://github.com/markom9822/MarkNote-App_V2/assets/96113848/57f4f6f1-7b2b-4626-a271-14387ab6d463)

You can input an image address, image width and click insert to add a formatted image to your selected line in the editor.

### Tables
You can add a table using three or more hyphens (---) to create each column’s header, and use pipes (|) to separate each column. For compatibility, you should also add a pipe on either end of the row.

```
| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |
```

![image](https://github.com/markom9822/MarkNote-App_V2/assets/96113848/34e4124a-bb09-45a7-a8dc-75e9aaa69a48)

You can select the more options button in the editor toolbar and then select the table button to bring up the table format helper.

![image](https://github.com/markom9822/MarkNote-App_V2/assets/96113848/4c2a6be1-bf10-4702-8e28-43e3aa4c08da)

You can select the desired number of rows and columns and click insert to add a formatted table to your selected line in the editor.

### Emojis
You can add emoji to your note by typing `:EMOJICODE:`, a colon followed by the name of the emoji.
Emoji suggestions are shown when you start typing. 



In the tool bar there is a emoji picker where you can filter through emoji types to find what you're looking for.

![image](https://github.com/markom9822/MarkNote-App_V2/assets/96113848/a37ef734-7b24-419b-8fc7-ecaba8a31b27)


### Maths
You can add maths equations inline by inserting `$` around your equation. You can make a maths equation block using `$$`.

```
When $a \ne 0$, there are two solutions to $(ax^2 + bx + c = 0)$ and they are

$$ 
x = {-b \pm \sqrt{b^2-4ac} \over 2a} 
$$
```

![image](https://github.com/markom9822/MarkNote-App_V2/assets/96113848/2c7a1d6b-4c79-4c20-8e19-d23edd194998)

### Footnotes
You can add footnotes to your content by using this bracket syntax `[^1]`.

```
This is a simple footnote[^1].

This footnote has multiple lines[^2].

[^1]: My reference.
[^2]: To add line breaks within a footnote, prefix new lines with 2 spaces.
  This is a second line.
```

### Github Style Alerts
You can insert alerts using blockquote syntax that you can use to emphasize critical information. They are displayed with distinctive colors and icons to highlight them to the reader.
To add an alert, use a special blockquote line specifying the alert type, followed by the alert information in a standard blockquote. There are five types of alerts are available (note, tip, important, warning and caution).

```
> [!NOTE]
> Useful information that users should know.

> [!TIP]
> Helpful advice for doing things better.

> [!IMPORTANT]
> Key information users need to know.

> [!WARNING]
> Urgent info that needs immediate user attention.

> [!CAUTION]
> Advises about risks or negative outcomes.
```
![image](https://github.com/markom9822/MarkNote-App_V2/assets/96113848/c615e409-53d8-4ec3-a184-c2f037eebd1d)

### Dividers
You can insert a simple horizontal divider to break up the content in the note using three `-`'s.

```
Text above

---

Text below
```
![image](https://github.com/markom9822/MarkNote-App_V2/assets/96113848/6d12eb55-6411-476a-82a5-b0dc9956bfbb)





