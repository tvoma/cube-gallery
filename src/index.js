class CubeGallery {
    constructor(id, { minHeight, margin }) {
        // selector
        this.id = id
        
        // min height
        this.minHeight = minHeight && minHeight > 0 ? minHeight : 150

        // margin
        this.margin = margin && margin > 0 ? (margin / 2) : 0

        // gallery container
        this.gallery = document.querySelector(`#${ this.id }`)

        // gallery width
        this.galleryWidth = 0 // default

        // gallery images
        this.images = document.querySelectorAll(`#${ this.id } img`)

        // count images
        this.nbrImages = this.images.length

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
            // prevent height resize
            if (this.galleryWidth != this.gallery.offsetWidth) {
                this.create()
            }
        })

        /**
         * Wait for all images load before creating gallery
         */
        let counter = 0

        const create = () => {
            if (counter === this.nbrImages) {
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
        img.width = img.naturalWidth * this.minHeight / img.naturalHeight, // default width
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
    this.gallery.style.display = 'flex'
    this.gallery.style.flexWrap = 'wrap'
    this.gallery.style.fontSize = '0' // remove white spaces
    this.gallery.style.lineHeight = '0' // remove white spaces
}

/**
 * Find CSS properties that can affect gallery calculation and add it as extra width
 * @param {*} elm
 */
CubeGallery.prototype.findExtraWidth = function (elm) {
    const borders = getComputedStyle(elm)
    const borderLeft = Number(borders.borderLeftWidth.substring(0, borders.borderLeftWidth.length - 2))
    const borderRight = Number(borders.borderRightWidth.substring(0, borders.borderRightWidth.length - 2))

    this.extra = this.extra + borderLeft + borderRight
}

/**
 * Generate the gallery
 */
CubeGallery.prototype.generate = function () {
    const rows = []

    let imgs = []
    let availableWidth = 0
    
    // distribut images in rows
    for (let i = 0; i < this.nbrImages; i++) {
        const currentImg = this.images[i]
        const nextImg = this.images[i+1] != undefined ? this.images[i+1] : null

        availableWidth += currentImg.width

        imgs.push(currentImg)

        if (!nextImg || (availableWidth + nextImg.width) > this.galleryWidth) { // if row is filled
            rows.push(imgs)
            availableWidth = 0
            imgs = []
        }
    }

    // scale images
    rows.forEach((imgs, rowIndex) => {
        const isFirstRow = rowIndex === 0
        const isLastRow = rowIndex === rows.length - 1
        const nbrImgs = imgs.length
        const totalMargin = ((nbrImgs - 1) * (this.margin * 2)) + (nbrImgs * this.extra)
        const availableWidth = this.galleryWidth - totalMargin
        const sumOfRatios = imgs.reduce((sum, img) => sum + img.width / img.height, 0)
        const rowHeight = Math.round(availableWidth / sumOfRatios)

        let widthSoFar = 0
        
        imgs.forEach((img, imgIndex) => {
            const isFirstImg = imgIndex === 0
            const isLastImg = imgIndex === nbrImgs - 1 

            if (isLastImg) {
                img.width = Math.round(availableWidth - widthSoFar)
            }
            else {
                img.width = Math.round(rowHeight * (img.width / img.height))
                widthSoFar += img.width
            }

            img.height = Math.round(rowHeight)

            img.style.marginLeft = isFirstImg ? 0 : this.margin + 'px'
            img.style.marginRight = isLastImg ? 0 : this.margin + 'px'
            img.style.marginTop = isFirstRow ? 0 : this.margin + 'px'
            img.style.marginBottom = isLastRow ? 0 : this.margin + 'px'
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

export default CubeGallery
