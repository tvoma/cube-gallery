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
    }
}

CubeGallery.prototype.create = function () {
    // gallery container
    const gallery = document.querySelector('#' + this.id)
    // remove white spaces
    gallery.style.fontSize = '0'
    gallery.style.lineHeight = '0'

    
    // gallery width
    const galleryWidth = gallery.offsetWidth
    
    // images
    const images = document.querySelectorAll('#' + this.id + ' img')
    images.forEach(img => {
        img.width = Math.floor(img.naturalWidth * this.minHeight / img.naturalHeight), // default width
        img.height = this.minHeight // default height
    })

    // generate rows
    var nbImgs = images.length
    var rows = []
    var row = []
    var sum = 0
    for (let i = 0; i < nbImgs; i++) {
        let current = images[i]
        let next = images[i+1] != undefined ? images[i+1] : null

        sum = Math.floor(sum + current.width)

        row.push(current)

        if (next == null || Math.floor(sum + next.width) > galleryWidth) {
            rows.push(row)
            sum = 0
            row = []
        }
    }

    rows.forEach(imgs => {
        let sum = 0 // sum of the width of the images
        imgs.forEach(img => sum = Math.floor(sum + img.width))
        imgs.forEach(img => {
            img.width = Math.floor((img.width * (img.height * galleryWidth / sum) / img.height) - this.margin * 2)
            img.height = Math.floor((img.height * galleryWidth / sum) - this.margin * 2)
            img.style.height = img.height + this.unit // set image height
            img.style.margin = this.margin + 'px'
        })
    })
}