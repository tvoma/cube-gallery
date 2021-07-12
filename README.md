# Cube Gallery

Cube gallery is a justified / Flickr like gallery.

![Capture](docs/images/capture.png)

## Install

Inside a `.js` file, import the CubeGallery file from the source of your choice (npm, cdn or download) :

```js
import CubeGallery from "cube-gallery-js"
```

Then, link your script inside your HTML page. Do not forget `type="module"`.
```html
<script type="module" src="myFile.js">
```

### NPM

```bash
npm install cube-gallery-js
```
Then, import in your `.js` file.

### CDN

Import `https://cdn.jsdelivr.net/npm/cube-gallery-js/src/index.min.js` in your `.js` file.

### File
Download and save `dist/cube-gallery.min.js` in your project. Then import in your `.js` file.

## How to use ?

```js
new CubeGallery(selector, options?)
```

#### Example

Create a `div` with your images.
```html
<div id="gallery">
    <img src="" alt="">
    <img src="" alt="">
    ...
    <a href="#">
        <img src="" alt="">
    </a>
    ...
</div>
```
> Note that you can wrap `<img>` elements with a `<a href="#">`. `<a>` element has a relative position so you can put other elements with absolute position above. You also can add borders with CSS to `<img>` elements.

Instanciate _CubeGallery_.
```js
new CubeGallery('gallery', {
    minHeight: 150
})
```

## Responsive

Cube Gallery is responsive by default.

## Available options

Some options are available to manage your gallery.
```js
{
    minHeight: 100 // default
    margin: 0 // default
}
```