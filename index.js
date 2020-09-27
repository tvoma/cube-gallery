class CubeGallery {
    constructor(id, options) {
        // selector
        this.id = id
        // min height
        this.minHeight = options && options.minHeight > 0 ? options.minHeight : 150
        // unit
        this.unit = 'px'
        // margin
        this.margin = options && options.margin > 0 ? options.margin : 0
        
        // gallery container
        this.gallery = document.querySelector('#' + this.id)
        gallery.style.fontSize = '0' // remove white spaces
        gallery.style.lineHeight = '0' // remove white spaces

        // gallery width
        this.galleryWidth = this.gallery.offsetWidth

        // images
        this.images = document.querySelectorAll('#' + this.id + ' img')
        this.images.forEach(img => {
            img.width = Math.floor(img.naturalWidth * this.minHeight / img.naturalHeight), // default width
            img.height = this.minHeight // default height
        })
        // count images
        this.nbImages = this.images.length
    }
}

CubeGallery.prototype.create = function () { 
    var rows = []
    var imgs = []
    var sumOfWidth = 0
    for (let i = 0; i < this.nbImages; i++) {
        let currentImg = this.images[i]
        let nextImg = this.images[i+1] != undefined ? this.images[i+1] : null

        sumOfWidth = Math.floor(sumOfWidth + currentImg.width)

        imgs.push(currentImg)

        if (nextImg == null || Math.floor(sumOfWidth + nextImg.width) > this.galleryWidth) {
            rows.push(imgs)
            sumOfWidth = 0
            imgs = []
        }
    }

    rows.forEach(imgs => {
        let sumOfWidth = 0 // sum of the width of the images
        imgs.forEach(img => sumOfWidth = Math.floor(sumOfWidth + img.width))
        imgs.forEach(img => {
            img.width = Math.floor((img.width * (img.height * this.galleryWidth / sumOfWidth) / img.height) - this.margin * 2)
            img.height = Math.floor((img.height * this.galleryWidth / sumOfWidth) - this.margin * 2)
            img.style.margin = this.margin + 'px'
        })
    })
}