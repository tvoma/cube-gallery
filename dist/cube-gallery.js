'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CubeGallery = function CubeGallery(id, _ref) {
    var _this = this;

    var minHeight = _ref.minHeight,
        margin = _ref.margin;

    _classCallCheck(this, CubeGallery);

    // selector
    this.id = id;

    // min height
    this.minHeight = minHeight && minHeight > 0 ? minHeight : 150;

    // margin
    this.margin = margin && margin > 0 ? margin : 0;

    // gallery container
    this.gallery = document.querySelector('#' + this.id);

    // gallery images
    this.images = document.querySelectorAll('#' + this.id + ' img');

    // count images
    this.nbImages = this.images.length;

    // extra borders or padding or margins that can be added with css
    this.extra = 0;

    /**
     * Find images CSS properties that can affect gallery calculation
     */
    this.findExtraWidth(this.images[0]);

    /**
     * Apply CSS style
     */
    this.applyStyle();

    /**
     * Handle responsive
     */
    window.addEventListener('resize', function () {
        _this.create();
    });

    /**
     * Wait for all images load before creating gallery
     */
    var counter = 0;
    var create = function create() {
        if (counter === _this.nbImages) {
            _this.create();
        }
    };

    this.images.forEach.call(this.images, function (img) {
        if (img.complete) {
            counter++;
            create();
        } else {
            img.addEventListener('load', function () {
                counter++;
                create();
            }, false);
        }
    });
};

/**
 * Data that may change
 */


CubeGallery.prototype.loadVariableDatas = function () {
    var _this2 = this;

    // gallery width
    this.galleryWidth = this.gallery.offsetWidth;

    // images
    this.images.forEach(function (img) {
        img.width = Math.floor(img.naturalWidth * _this2.minHeight / img.naturalHeight), // default width
        img.height = _this2.minHeight; // default height
    });
};

/**
 * Apply CSS properties
 */
CubeGallery.prototype.applyStyle = function () {
    /**
     * Remove white spaces
     */
    this.gallery.style.fontSize = '0'; // remove white spaces
    this.gallery.style.lineHeight = '0'; // remove white spaces

    /**
     * Apply display inline block
     */
    if (this.hasWrapper()) {
        var wrapper = document.querySelectorAll('#' + this.id + ' a');

        this.findExtraWidth(wrapper[0]); // find wrapper CSS properties that can affect gallery calculation

        wrapper.forEach(function (a) {
            a.style.display = 'inline-block';
            a.style.position = 'relative';
        });
    }
};

/**
 * Check if img is wrapped by a tag
 */
CubeGallery.prototype.hasWrapper = function () {
    if (document.querySelectorAll('#' + this.id + ' a').length > 0) {
        return true;
    }

    return false;
};

/**
 * Find CSS properties that can affect gallery calculation and add it as extra width
 * @param {*} elm
 */
CubeGallery.prototype.findExtraWidth = function (elm) {
    var borders = getComputedStyle(elm);
    var borderLeft = Number(borders.borderLeftWidth.substr(0, borders.borderLeftWidth.length - 2));
    var borderRight = Number(borders.borderRightWidth.substr(0, borders.borderLeftWidth.length - 2));
    this.extra = this.extra + borderLeft + borderRight;
};

/**
 * Generate the gallery
 */
CubeGallery.prototype.generate = function () {
    var _this3 = this;

    var rows = [];
    var imgs = [];
    var sumOfWidth = 0; // sum of the width of the images
    for (var i = 0; i < this.nbImages; i++) {
        var currentImg = this.images[i];
        var nextImg = this.images[i + 1] != undefined ? this.images[i + 1] : null;

        sumOfWidth = Math.floor(sumOfWidth + currentImg.width);

        imgs.push(currentImg);

        if (nextImg == null || Math.floor(sumOfWidth + nextImg.width) > this.galleryWidth) {
            // if row is filled
            rows.push(imgs);
            sumOfWidth = 0;
            imgs = [];
        }
    }

    rows.forEach(function (imgs) {
        var sumOfWidth = 0; // sum of the width of the images
        imgs.forEach(function (img) {
            return sumOfWidth = Math.floor(sumOfWidth + img.width);
        });
        imgs.forEach(function (img) {
            img.width = Math.floor(img.width * (img.height * _this3.galleryWidth / sumOfWidth) / img.height - _this3.margin * 2 - _this3.extra);
            img.height = Math.floor(img.height * _this3.galleryWidth / sumOfWidth - _this3.margin * 2 - _this3.extra);
            img.style.margin = _this3.margin + 'px';
        });
    });

    return this;
};

/**
 * Create the gallery
 */
CubeGallery.prototype.create = function () {
    this.loadVariableDatas();
    return this.generate();
};
//# sourceMappingURL=cube-gallery.js.map
