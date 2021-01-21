# Cube Gallery

Cube gallery is a justified / Flickr like gallery.

![Capture](docs/images/capture.png)

## Install

Use `dist/cube-gallery.min.js` file in your projet. That's it !

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