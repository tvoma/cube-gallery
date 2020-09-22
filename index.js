class CubeGallery {
    constructor(id, options) {
        // selector
        this.id = id
        // min height
        this.minHeight = options && options.minHeight ? options.minHeight : 150
        // unit
        this.unit = 'px'
    }
}

CubeGallery.prototype.create = function () {
    // gallery container
    const gallery = document.querySelector('#' + this.id)
    gallery.setAttribute('class', 'cube-gallery')
    
    // gallery width
    const galleryWidth = gallery.offsetWidth
    
    // images
    const images = document.querySelectorAll('#' + this.id + ' img')
    images.forEach(img => {
        img.width = img.naturalWidth * this.minHeight / img.naturalHeight, // default width
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

        sum = sum + current.width

        row.push(current)

        if (next == null || sum + next.width > galleryWidth) {
            rows.push(row)
            sum = 0
            row = []
        }
    }

    rows.forEach(imgs => {
        let sum = 0 // sum of the width of the images
        imgs.forEach(img => sum = sum + img.width)
        imgs.forEach(img => {
            img.width = img.width * (img.height * galleryWidth / sum) / img.height
            img.height = img.height * galleryWidth / sum
            img.style.width = img.width + this.unit // set image width
            img.style.height = img.height + this.unit // set image height
        })
    })
}