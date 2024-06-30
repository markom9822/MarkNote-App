## Welcome to MarkNote 👋🏻

MarkNote is a simple **note-taking app** that uses **Markdown** syntax to format your notes.

You can create your first note by clicking on the top-right icon on the sidebar, or delete one by clicking on top right icon on the editor.

Following there's a quick overview of the supported Markdown syntax.

## Text formatting

This is a **bold** text.
This is an _italic_ text.
~~This text is striked through~~.
__This text is underlined__
**=This text is highlighted=**
This is a <sub>subscript</sub> text
This is a <sup>superscript</sup> text

## Headings

Here are all the heading formats currently supported by **_MarkNote_**:

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

### Bulleted list

For example, you can add a list of bullet points:

- Bullet point 1
- Bullet point 2
- Bullet point 3

### Numbered list

Here we have a numbered list:

1. Numbered list item 1
2. Numbered list item 2
3. Numbered list item 3

### Task List

Here we have a list of tasks:

- [x] Task item 1
- [x] Task item 2
- [ ] Task item 3

### Blockquote

> This is a blockquote. You can use it to emphasize some text or to cite someone.

### Code blocks

You can write code inline `inline code` and in a code block:

```
function test() {
  console.log("Hello World!");
}
```

Syntax highlighting is also supported if you provide the language:

```python
x = 5
y = "John"
print(x)
print(y)
```

### Links

There are good examples of markdown on [GitHub Pages](https://pages.github.com/).

### Images

This is an example of an image: 

![Octocat](https://myoctocat.com/assets/images/base-octocat.svg)

### Tables

You can insert a table by using a format as follows:

| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |

### Emojis

You can add emoji to your note by typing :EMOJICODE:, a colon followed by the name of the emoji.

:smile: :rocket:

### Maths

You can add maths equations inline by inserting $ around your equation.

When $a \ne 0$, there are two solutions to $(ax^2 + bx + c = 0)$ and they are

$$ 
x = {-b \pm \sqrt{b^2-4ac} \over 2a} 
$$

### Footnotes

You can add footnotes to your content by using this bracket syntax:

This is a simple footnote[^1].

This footnote has multiple lines[^2].

[^1]: My reference.
[^2]: To add line breaks within a footnote, prefix new lines with 2 spaces.
  This is a second line.

### Alerts

You can insert alerts using blockquote syntax that you can use to emphasize critical information:

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

### Dividers

You can insert a simple horizontal divider to break up the content in the note:

Text above

---

Text below



