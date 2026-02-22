# HTML Cheat Sheet
## Getting Started
### Minimal HTML5 document
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>HTML5 Boilerplate</title>
  </head>
  <body>
    <h1>Hello, world!</h1>
  </body>
</html>
```
Try it live: https://jsfiddle.net/Fechin/1e4wz20b/
### Comments
```html
<!-- Single-line comment -->
<!--
  Multi-line
  comment
-->
```
### Paragraphs
```html
<p>I'm from CheatSheets.zip</p>
<p>Share quick reference cheat sheet.</p>
```
See: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p
### Links
```html
<a href="https://cheatsheets.zip">CheatSheets</a>
<a href="mailto:jack@abc.com">Email</a>
<a href="tel:+12345678">Call</a>
<a href="sms:+12345678&body=ha%20ha">Msg</a>
```
Common attributes: `href`, `rel`, `target` (`_self`, `_blank`, `_top`, `_parent`)
### Images
```html
<img
  loading="lazy"
  src="https://example.com/image.png"
  alt="Describe image here"
  width="400"
  height="400"
/>
```
Key attributes: `src` (required), `alt` (required), `width`, `height`, `loading`
### Text formatting
```html
<b>Bold Text</b>
<strong>This text is important</strong>
<i>Italic Text</i>
<em>This text is emphasized</em>
<u>Underline Text</u>
<pre>Pre-formatted Text</pre>
<code>Source code</code>
<del>Deleted text</del>
<mark>Highlighted text (HTML5)</mark>
<ins>Inserted text</ins>
<sup>Superscript</sup>
<sub>Subscript</sub>
<small>Smaller text</small>
<kbd>Ctrl</kbd>
<blockquote>Block quote</blockquote>
```
### Headings
```html
<h1>This is Heading 1</h1>
<h2>This is Heading 2</h2>
<h3>This is Heading 3</h3>
<h4>This is Heading 4</h4>
<h5>This is Heading 5</h5>
<h6>This is Heading 6</h6>
```
Use one `<h1>` per page.
### Section divisions
- `<div>`: generic block container
- `<span>`: generic inline container
- `<p>`: paragraph
- `<br>`: line break
- `<hr>`: thematic break (horizontal rule)
### Inline frame
```html
<iframe
  title="New York"
  width="342"
  height="306"
  src="https://maps.google.com/maps?q=2880%20Broadway,%20New%20York&z=13&output=embed"
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade"
></iframe>
```
See: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
### JavaScript in HTML
```html
<script>
  const text = "Hello CheatSheets.zip";
  alert(text);
</script>
```
External script:
```html
<body>
  ...
  <script src="app.js"></script>
</body>
```
### CSS in HTML
Inline:
```html
<style>
  h1 {
    color: purple;
  }
</style>
```
External:
```html
<head>
  ...
  <link rel="stylesheet" href="style.css" />
</head>
```
## HTML5 Semantic Tags
### Document skeleton
```html
<body>
  <header>
    <nav>...</nav>
  </header>
  <main>
    <h1>CheatSheets.zip</h1>
  </main>
  <footer>
    <p>©2024 CheatSheets.zip</p>
  </footer>
</body>
```
### Header navigation
```html
<header>
  <nav>
    <ul>
      <li><a href="#">Edit Page</a></li>
      <li><a href="#">Twitter</a></li>
      <li><a href="#">Facebook</a></li>
    </ul>
  </nav>
</header>
```
### Common HTML5 elements
- `article`: independent content
- `aside`: secondary content
- `audio`: sound stream
- `bdi`: bidirectional isolate
- `canvas`: graphics via JS
- `data`: machine-readable value
- `datalist`: predefined options
- `details` / `summary`: toggleable details
- `dialog`: dialog box
- `embed`: external app
- `figure` / `figcaption`: annotated media
- `footer`: footer
- `header`: header
- `main`: main content
- `mark`: highlight
- `meter`: scalar value in range
- `nav`: navigation links
- `output`: calculation result
- `picture`: responsive images
- `progress`: task progress
- `rp` / `rt` / `ruby`: ruby annotation
- `section`: related content group
- `source`: media source
- `template`: inert HTML fragment
- `time`: time or date
- `track`: text tracks for media
- `video`: embeds video
- `wbr`: line break opportunity
### Video
```html
<video controls width="100%">
  <source
    src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
    type="video/mp4"
  />
  Sorry, your browser doesn't support embedded videos.
</video>
```
### Audio
```html
<audio
  controls
  src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3"
>
  Your browser does not support the audio element.
</audio>
```
### Ruby
```html
<ruby>
  汉 <rp>(</rp><rt>hàn</rt><rp>)</rp> 字 <rp>(</rp><rt>zì</rt><rp>)</rp>
</ruby>
```
### `bdi`
```html
<ul>
  <li>User <bdi>hrefs</bdi>: 60 points</li>
  <li>User <bdi>jdoe</bdi>: 80 points</li>
  <li>User <bdi>إيان</bdi>: 90 points</li>
</ul>
```
### Progress
```html
<progress value="50" max="100"></progress>
```
### `mark`
```html
<p>I love <mark>CheatSheets.zip</mark></p>
```
## Tables
### Basic table
```html
<table>
  <thead>
    <tr>
      <th>name</th>
      <th>age</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Roberta</td>
      <td>39</td>
    </tr>
    <tr>
      <td>Oliver</td>
      <td>25</td>
    </tr>
  </tbody>
</table>
```
### Table tags
- `<table>`: table container
- `<caption>`: table caption
- `<colgroup>` / `<col>`: column grouping
- `<thead>` / `<tbody>` / `<tfoot>`: sections
- `<tr>`: row
- `<th>`: header cell
- `<td>`: data cell
### `<td>` attributes
- `colspan`: number of columns to span
- `rowspan`: number of rows to span
- `headers`: associated header cell IDs
### `<th>` attributes
- `colspan`, `rowspan`, `headers`, `abbr`
- `scope`: `col`, `row`, `colgroup`, `rowgroup`
## Lists
### Unordered list
```html
<ul>
  <li>Item</li>
  <li>Item</li>
  <li>Item</li>
</ul>
```
### Ordered list
```html
<ol>
  <li>First</li>
  <li>Second</li>
  <li>Third</li>
</ol>
```
### Definition list
```html
<dl>
  <dt>A Term</dt>
  <dd>Definition of a term</dd>
  <dt>Another Term</dt>
  <dd>Definition of another term</dd>
</dl>
```
## Forms
### Basic form
```html
<form method="POST" action="/api/login">
  <label for="email">Email: </label>
  <input type="email" id="email" name="email" required />
  <br />
  <label for="pw">Password: </label>
  <input type="password" id="pw" name="pw" required />
  <br />
  <input type="checkbox" id="remember" name="remember" />
  <label for="remember">Remember me</label>
  <br />
  <input type="submit" value="Login" />
</form>
```
### Form attributes
- `name`: form name
- `action`: URL to submit to
- `method`: `GET` (query string) or `POST` (request body)
- `enctype`: encoding; e.g., `multipart/form-data` for file uploads
- `onsubmit` / `onreset`: event handlers
### Labels
```html
<!-- Nested label -->
<label>
  Click me
  <input type="text" id="user" name="name" />
</label>
<!-- Associated by id -->
<label for="user">Click me</label>
<input id="user" type="text" name="name" />
```
`for` must match the input’s `id`.
### Inputs
```html
<label for="name">Name:</label> <input type="text" id="name" name="name" />
```
### Textarea
```html
<textarea rows="2" cols="30" name="address" id="address"></textarea>
```
### Radio buttons
```html
<input type="radio" name="gender" id="m" value="male" />
<label for="m">Male</label>
<input type="radio" name="gender" id="f" value="female" />
<label for="f">Female</label>
```
One selection per `name` group.
### Checkboxes
```html
<input type="checkbox" name="sports" id="soccer" value="soccer" />
<label for="soccer">Soccer</label>
<input type="checkbox" name="sports" id="baseball" value="baseball" />
<label for="baseball">Baseball</label>
```
Multiple selections allowed per `name`.
### Select
```html
<label for="city">City:</label>
<select name="city" id="city">
  <option value="syd">Sydney</option>
  <option value="mel">Melbourne</option>
  <option value="cwl">Cromwell</option>
</select>
```
### Fieldset
```html
<fieldset>
  <legend>Your favorite monster</legend>
  <input type="radio" id="kra" name="monster" value="kraken" />
  <label for="kra">Kraken</label><br />
  <input type="radio" id="sas" name="monster" value="sasquatch" />
  <label for="sas">Sasquatch</label>
</fieldset>
```
### Datalist (HTML5)
```html
<label for="browser">Choose a browser:</label>
<input list="browsers" id="browser" name="browser" />
<datalist id="browsers">
  <option value="Chrome" />
  <option value="Firefox" />
  <option value="Opera" />
  <option value="Safari" />
  <option value="Microsoft Edge" />
</datalist>
```
### Submit and reset
```html
<form action="/register" method="post">
  <label for="foo">Name:</label>
  <input type="text" name="name" id="foo" />
  <input type="submit" value="Submit" />
  <input type="reset" value="Reset" />
</form>
```
### Input attributes (common)
- `type`: input type
- `name`: key used on submission
- `id`: unique identifier
- `value`: default value
- `readonly`, `disabled`, `required`, `checked`
- `placeholder`
- `autocomplete="off"`
- `min`, `max`, `step`, `minlength`, `maxlength`, `pattern`
- `list`: associates with a `<datalist>`
- `inputmode`: hints keyboard type
- `autofocus`
- `spellcheck`
- `multiple` (file, email)
- `accept` (file types)
### Input types
- `text`, `password`, `email`, `tel`, `url`
- `number`, `range`
- `checkbox`, `radio`
- `file`, `hidden`
- `image`, `reset`, `button`, `submit`
- HTML5: `color`, `date`, `time`, `month`, `datetime-local`, `week`, `search`
### Input CSS selectors
- `input:focus` — when focused
- `input:required`, `input:invalid`, `input:disabled` — state selectors
## Meta Tags
### Basics
```html
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Your title</title>
```
### SEO / sharing essentials
```html
<link rel="canonical" href="https://example.com/page" />
<meta name="description" content="Description of this page" />
<meta property="og:type" content="website" />
<meta property="og:locale" content="en_CA" />
<meta property="og:title" content="HTML cheatsheet" />
<meta property="og:url" content="https://cheatsheets.zip/html" />
<meta property="og:image" content="https://example.com/image.jpg" />
<meta property="og:site_name" content="Name of your website" />
<meta property="og:description" content="Description of this page" />
<meta name="twitter:card" content="summary" />
<meta name="twitter:site" content="@FechinLi" />
<meta name="twitter:title" content="HTML cheatsheet" />
<meta name="twitter:url" content="https://cheatsheets.zip/html" />
<meta name="twitter:description" content="Description of this page" />
<meta name="twitter:image" content="https://example.com/image.jpg" />
```
### Other meta
```html
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
```
Use modern browsers; avoid UA-sniffing.
### Geotagging (rarely used)
```html
<meta name="ICBM" content="45.416667,-75.7" />
<meta name="geo.position" content="45.416667;-75.7" />
<meta name="geo.region" content="ca-on" />
<meta name="geo.placename" content="Ottawa" />
```
## References
- HTML elements: https://developer.mozilla.org/en-US/docs/Web/HTML/Element
- HTML forms: https://developer.mozilla.org/en-US/docs/Learn/Forms
- Meta data: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta
- HTML 4.01 spec: https://www.w3.org/TR/REC-html40/cover.html#minitoc
