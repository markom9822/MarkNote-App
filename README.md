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

![image](https://github.com/markom9822/MarkNote-App_V2/assets/96113848/91c42abd-688f-4a45-af22-36a4ef52b887)

If you would like to try out this app you can download the installer `.exe` file from the Releases section in this repo.

## How To

You can create, edit and delete notes with a side by side editor and HTML preview which updates in real time. Each note has a status to show your progress at a glance.
There are several buttons in the UI, the table below explains what they do.

|  Action         |   Button    |      
| :---:           |   :---:     |       
| Create New Note | ![image](https://github.com/markom9822/MarkNote-App_V2/assets/96113848/73cdb194-e1e6-433d-b47e-e8d93118a1e7)|
| Delete Note     | ![image](https://github.com/markom9822/MarkNote-App_V2/assets/96113848/4ff91910-c745-495e-94a4-d042b6304a11)|
| Navigate Notes  | ![image](https://github.com/markom9822/MarkNote-App_V2/assets/96113848/208c57ad-2f9c-4272-806d-1de142dbb4c2)|
| Open Settings   | ![image](https://github.com/markom9822/MarkNote-App_V2/assets/96113848/77565706-0558-4eca-b094-b166b48f2503)|
| Change Status   | ![image](https://github.com/markom9822/MarkNote-App_V2/assets/96113848/eb0c3c44-280e-49f7-8dc4-5d46af6d3611)

## Settings

MarkNote has a number of settings that can be changed such as:

### Themes
You can change the theme for the main UI, editor and preview.
We have a variety of themes to choose, from dark and light mode to nord, solarized and gruvbox.

<img src="https://github.com/markom9822/MarkNote-App/assets/96113848/d9724432-1487-4357-8c38-8c1073d9484a" width="400">
<img src="https://github.com/markom9822/MarkNote-App/assets/96113848/1d64e5fb-2eff-4767-89e2-798020df0642" width="400">
<img src="https://github.com/markom9822/MarkNote-App/assets/96113848/6c5840ac-d2c7-4690-81ea-dad1b8411e15" width="400">
<img src="https://github.com/markom9822/MarkNote-App/assets/96113848/9aab7111-eb78-4102-835c-5fce659a5c65" width="400">
<img src="https://github.com/markom9822/MarkNote-App/assets/96113848/7b7c7e3d-333f-40fe-a7db-394093bfc354" width="400">
<img src="https://github.com/markom9822/MarkNote-App/assets/96113848/b2a66768-ea9a-414d-bc89-133c8569040a" width="400">
<img src="https://github.com/markom9822/MarkNote-App/assets/96113848/6a5dee4e-b35e-41ff-bf0d-f6cc4788f2b6" width="400">

### Editor
You can customise the interface and appearance of the markdown editor. 
You can toggle the toolbar, line wrapping, bracket matching and more. The tab size and font size can be customised too.

### Preview
You can customise the appearance of the preview. You can alter the font size in the preview.

### Keybindings
You can find a list of the keybindings available to use.

![image](https://github.com/markom9822/MarkNote-App_V2/assets/96113848/483d14c6-7daf-40f3-b56a-96667a03a3e4)

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

#### Syntax Highlighting

You can get syntax highlighting for code blocks by including the coding language after the first set of backticks like so.

![image](https://github.com/markom9822/MarkNote-App_V2/assets/96113848/2cc8d28d-8ad5-429b-aad0-89f308c29829)

![image](https://github.com/markom9822/MarkNote-App_V2/assets/96113848/fe12994d-36f1-45ac-8161-0a35e675d345)


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
([Emoji List](https://gist.github.com/rxaviers/7360908))

![emoji demo gif](https://github.com/markom9822/MarkNote-App_V2/blob/main/Mark%20Note%20emojis%20demo.gif)

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
![image](https://github.com/markom9822/MarkNote-App_V2/assets/96113848/eb967258-6041-41d4-9037-93636f9f38a2)

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





