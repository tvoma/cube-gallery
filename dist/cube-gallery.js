'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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
    this.margin = margin && margin > 0 ? margin / 2 : 0;

    // gallery container
    this.gallery = document.querySelector('#' + this.id);

    // gallery width
    this.galleryWidth = 0; // default

    // gallery images
    this.images = document.querySelectorAll('#' + this.id + ' img');

    // count images
    this.nbrImages = this.images.length;

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
        // prevent height resize
        if (_this.galleryWidth != _this.gallery.offsetWidth) {
            _this.create();
        }
    });

    /**
     * Wait for all images load before creating gallery
     */
    var counter = 0;

    var create = function create() {
        if (counter === _this.nbrImages) {
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
        img.width = img.naturalWidth * _this2.minHeight / img.naturalHeight, // default width
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
    this.gallery.style.display = 'flex';
    this.gallery.style.flexWrap = 'wrap';
    this.gallery.style.fontSize = '0'; // remove white spaces
    this.gallery.style.lineHeight = '0'; // remove white spaces
};

/**
 * Find CSS properties that can affect gallery calculation and add it as extra width
 * @param {*} elm
 */
CubeGallery.prototype.findExtraWidth = function (elm) {
    var borders = getComputedStyle(elm);
    var borderLeft = Number(borders.borderLeftWidth.substring(0, borders.borderLeftWidth.length - 2));
    var borderRight = Number(borders.borderRightWidth.substring(0, borders.borderRightWidth.length - 2));

    this.extra = this.extra + borderLeft + borderRight;
};

/**
 * Generate the gallery
 */
CubeGallery.prototype.generate = function () {
    var _this3 = this;

    var rows = [];

    var imgs = [];
    var availableWidth = 0;

    // distribut images in rows
    for (var i = 0; i < this.nbrImages; i++) {
        var currentImg = this.images[i];
        var nextImg = this.images[i + 1] != undefined ? this.images[i + 1] : null;

        availableWidth += currentImg.width;

        imgs.push(currentImg);

        if (!nextImg || availableWidth + nextImg.width > this.galleryWidth) {
            // if row is filled
            rows.push(imgs);
            availableWidth = 0;
            imgs = [];
        }
    }

    // scale images
    rows.forEach(function (imgs, rowIndex) {
        var isFirstRow = rowIndex === 0;
        var isLastRow = rowIndex === rows.length - 1;
        var nbrImgs = imgs.length;
        var totalMargin = (nbrImgs - 1) * (_this3.margin * 2) + nbrImgs * _this3.extra;
        var availableWidth = _this3.galleryWidth - totalMargin;
        var sumOfRatios = imgs.reduce(function (sum, img) {
            return sum + img.width / img.height;
        }, 0);
        var rowHeight = Math.round(availableWidth / sumOfRatios);

        var widthSoFar = 0;

        imgs.forEach(function (img, imgIndex) {
            var isFirstImg = imgIndex === 0;
            var isLastImg = imgIndex === nbrImgs - 1;

            if (isLastImg) {
                img.width = Math.round(availableWidth - widthSoFar);
            } else {
                img.width = Math.round(rowHeight * (img.width / img.height));
                widthSoFar += img.width;
            }

            img.height = Math.round(rowHeight);

            img.style.marginLeft = isFirstImg ? 0 : _this3.margin + 'px';
            img.style.marginRight = isLastImg ? 0 : _this3.margin + 'px';
            img.style.marginTop = isFirstRow ? 0 : _this3.margin + 'px';
            img.style.marginBottom = isLastRow ? 0 : _this3.margin + 'px';
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

exports.default = CubeGallery;
//# sourceMappingURL=cube-gallery.js.map
