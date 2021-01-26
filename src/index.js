class CubeGallery {

    constructor(id, { minHeight, margin }) {
        // selector
        this.id = id
        
        // min height
        this.minHeight = minHeight && minHeight > 0 ? minHeight : 150
        
        // margin
        this.margin = margin && margin > 0 ? margin : 0

        // gallery container
        this.gallery = document.querySelector(`#${ this.id }`)

        // gallery images
        this.images = document.querySelectorAll(`#${ this.id } img`)

        // count images
        this.nbImages = this.images.length

        // extra borders or padding or margins that can be added with css
        this.extra = 0

        /**
         * Find images CSS properties that can affect gallery calculation
         */
        this.findExtraWidth(this.images[0])
        
        /**
         * Apply CSS style
         */
        this.applyStyle()
        
        /**
         * Handle responsive
         */
        window.addEventListener('resize', () => {
            this.create()
        })

        /**
         * Wait for all images load before creating gallery
         */
        var counter = 0
        var create = () => {
            if (counter === this.nbImages) {
                this.create()
            }
        }

        this.images.forEach.call(this.images, function(img) {
            if (img.complete) {
                counter++;
                create()
            }
            else {
                img.addEventListener('load', () => {
                    counter++;
                    create()
                }, false)
            }
        })
    }
}


/**
 * Data that may change
 */
CubeGallery.prototype.loadVariableDatas = function () {
    // gallery width
    this.galleryWidth = this.gallery.offsetWidth

    // images
    this.images.forEach(img => {
        img.width = Math.floor(img.naturalWidth * this.minHeight / img.naturalHeight), // default width
        img.height = this.minHeight // default height
    })
}


/**
 * Apply CSS properties
 */
CubeGallery.prototype.applyStyle = function () {
    /**
     * Remove white spaces
     */
    this.gallery.style.fontSize = '0' // remove white spaces
    this.gallery.style.lineHeight = '0' // remove white spaces

    /**
     * Apply display inline block
     */
    if (this.hasWrapper()) {
        let wrapper = document.querySelectorAll(`#${ this.id } a`)
        
        this.findExtraWidth(wrapper[0]) // find wrapper CSS properties that can affect gallery calculation

        wrapper.forEach(a => {
            a.style.display = 'inline-block'
            a.style.position = 'relative'
        })
    }
}


/**
 * Check if img is wrapped by a tag
 */
CubeGallery.prototype.hasWrapper = function () {
    if (document.querySelectorAll(`#${ this.id } a`).length > 0) {
        return true
    }

    return false
}


/**
 * Find CSS properties that can affect gallery calculation and add it as extra width
 * @param {*} elm
 */
CubeGallery.prototype.findExtraWidth = function (elm) {
    let borders = getComputedStyle(elm)
    let borderLeft = Number(borders.borderLeftWidth.substr(0, borders.borderLeftWidth.length - 2))
    let borderRight = Number(borders.borderRightWidth.substr(0, borders.borderLeftWidth.length - 2))
    this.extra = this.extra + borderLeft + borderRight
}


/**
 * Generate the gallery
 */
CubeGallery.prototype.generate = function () { 
    var rows = []
    var imgs = []
    var sumOfWidth = 0 // sum of the width of the images
    for (let i = 0; i < this.nbImages; i++) {
        let currentImg = this.images[i]
        let nextImg = this.images[i+1] != undefined ? this.images[i+1] : null

        sumOfWidth = Math.floor(sumOfWidth + currentImg.width)

        imgs.push(currentImg)

        if (nextImg == null || Math.floor(sumOfWidth + nextImg.width) > this.galleryWidth) { // if row is filled
            rows.push(imgs)
            sumOfWidth = 0
            imgs = []
        }
    }

    rows.forEach(imgs => {
        let sumOfWidth = 0 // sum of the width of the images
        imgs.forEach(img => sumOfWidth = Math.floor(sumOfWidth + img.width))
        imgs.forEach(img => {
            img.width = Math.floor((img.width * (img.height * this.galleryWidth / sumOfWidth) / img.height) - (this.margin * 2) - this.extra)
            img.height = Math.floor((img.height * this.galleryWidth / sumOfWidth) - (this.margin * 2) - this.extra)
            img.style.margin = this.margin + 'px'
        })
    })

    return this
}


/**
 * Create the gallery
 */
CubeGallery.prototype.create = function () {
    this.loadVariableDatas()
    return this.generate()
}