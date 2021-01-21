class CubeGallery {
    constructor(id, { minHeight, margin }) {
        // selector
        this.id = id
        // min height
        this.minHeight = minHeight && minHeight > 0 ? minHeight : 150
        // unit
        this.unit = 'px'
        // margin
        this.margin = margin && margin > 0 ? margin : 0
        
        // gallery container
        this.gallery = document.querySelector(`#${ this.id }`)
        this.gallery.style.fontSize = '0' // remove white spaces
        this.gallery.style.lineHeight = '0' // remove white spaces

        // extra borders or padding or margins that can be added with css
        this.extra = 0
        
        // img wrapper <a>
        let wrapper = document.querySelectorAll(`#${ this.id } a`)
        if (wrapper.length > 0) {
            this.findExtraWidth(wrapper[0])
            wrapper.forEach(a => {
                a.style.display = 'inline-block'
                a.style.position = 'relative'
            })
        }

        let imgs = document.querySelectorAll(`#${ this.id } img`)
        this.findExtraWidth(imgs[0])
        
        window.addEventListener('resize', () => {
            this.resize()
        })

        // wait for all images loaded
        var loadData = () => this.loadData()
        var create = () => this.create()
        var counter = 0

        imgs.forEach.call(imgs, function(img) {
            if (img.complete) {
                counter++;
                if (counter === imgs.length) {
                    console.log('All images loaded!');
                    loadData() // load varible datas
                    create() // build gallery
                }
            }
            else {
                img.addEventListener('load', () => {
                    counter++;
                    if (counter === imgs.length) {
                        console.log('All images loaded!');
                        loadData() // load varible datas
                        create() // build gallery
                    }
                }, false)
            }
        })
    }

    loadData () {
        // gallery width
        this.galleryWidth = this.gallery.offsetWidth

        // images
        this.images = document.querySelectorAll(`#${ this.id } img`)
        this.images.forEach(img => {
            img.width = Math.floor(img.naturalWidth * this.minHeight / img.naturalHeight), // default width
            img.height = this.minHeight // default height
        })
        // count images
        this.nbImages = this.images.length
    }

    // check if element has borders
    findExtraWidth (elm) {
        let borders = getComputedStyle(elm)
        let borderLeft = Number(borders.borderLeftWidth.substr(0, borders.borderLeftWidth.length - 2))
        let borderRight = Number(borders.borderRightWidth.substr(0, borders.borderLeftWidth.length - 2))
        this.extra = this.extra + borderLeft + borderRight
    }
}

CubeGallery.prototype.resize = function () {
    this.loadData()
    return this.create()
}

CubeGallery.prototype.create = function () { 
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