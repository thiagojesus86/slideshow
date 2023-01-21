class Slideshow{
    constructor(data){
        this.id=data.id
        this.images=data.images
        this.totalItems = 0
        this.slideContainer()
        this.active=0
        this.bullets()
        this.theme(data.theme)
    }
    slideContainer(){

        //let font1 = "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.eot"
        //let font2 = "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2"

        let linkFontAwesome = document.createElement("link")
        linkFontAwesome.rel="stylesheet"
        linkFontAwesome.href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        document.head.appendChild(linkFontAwesome)

        let container = document.createElement("div")
        container.setAttribute("id","slideshow--container")
        if(this.images.length>1){
            this.active = 0
            let slideshowContent = document.createElement("div")
            slideshowContent.setAttribute("id","slideshow--content")
            this.images.map( (i,k) => {
                let figure = document.createElement('figure')
                figure.classList.add("slideshow-figure")
                figure.dataset.slide = k+1
                figure.innerHTML = `<img src="${i.img}" class="slideshow-img" />`
                slideshowContent.appendChild(figure)
            })
            let pagination = document.createElement("div")
            pagination.classList.add("slideshow-pagination")
            container.appendChild(slideshowContent)
            container.appendChild(pagination)            
            document.getElementById(this.id).appendChild(container)
            //figcaption
            for(let i=0;i<slideshowContent.children.length;i++){
                this.totalItems = slideshowContent.children.length
                let figcaption = document.createElement('figcaption')
                figcaption.classList.add("slideshow-figcaption")
                //botões de prev e next
                figcaption.innerHTML += `<button class="slideshow-button" data-button="prev"><i class="fa fa-angle-left"></i></button>
                                        <button class="slideshow-button" data-button="next"><i class="fa fa-angle-right"></i></button>`
                
                //for(let f in this.images){
                for(let f=0;f<1;f++){
                    //legenda
                    let caption = document.createElement("div")
                    caption.classList.add("figcaption-caption")
                    caption.innerHTML += `<p><small>${i+1} de ${this.totalItems}</small></p>`
                    if(this.images[i].desc && this.images[i].desc!=""){
                        caption.innerHTML += `<p>${this.images[i].desc.length > 100 ? this.images[i].desc.substr(0,100)+"..." : this.images[i].desc}</p>`
                    }
                    figcaption.appendChild(caption)
                }
                slideshowContent.children[i].appendChild(figcaption)
                document.querySelector(".slideshow-pagination").innerHTML += `<span class="bullet" data-pag="${i+1}"></span>`
            }            
            document.querySelectorAll('[data-button="prev"]').forEach( prev => prev.addEventListener("click", () => this.prevImage() ))           
            document.querySelectorAll('[data-button="next"]').forEach( next => next.addEventListener("click", ev => this.nextImage() ))
            window.addEventListener("keydown", event => {
                //passar imagem através das setas right e left do teclado
                switch(event.key){
                    case "ArrowLeft":
                        this.prevImage()
                        break
                    case "ArrowRight":
                        this.nextImage()
                        break
                }
            })
            this.setActive(this.active)
        }
       
    }
    setActive(el){
        //for(let i=0;i<slideshowContent.children.length;i++){
        let slideshowContent = document.getElementById("slideshow--content")
        for(let i=0;i<slideshowContent.children.length;i++){
            //remove todos os actives
            slideshowContent.children[i].classList.remove("active")
            //add active apenas no item atual
            slideshowContent.children[el].classList.add("active")
            //incluir os bullets no pagination
            document.querySelectorAll(".slideshow-pagination").forEach( pag => {
                pag.children[i].classList.remove("active")
                pag.children[el].classList.add("active")
            })
        }
        this.transitionEffect()
    }
    prevImage(){
        let atual = document.querySelector(".slideshow-figure.active")
        if(atual.dataset.slide==1){
            this.active=this.totalItems-1
        }else{
            this.active-=1
        }
        this.setActive(this.active)
    }
    nextImage(){
        let atual = document.querySelector(".slideshow-figure.active")
        if(atual.dataset.slide==this.totalItems){
            this.active=0
        }else{
            this.active+=1
        }
        this.setActive(this.active)
    }
    bullets(){
        document.querySelectorAll(".bullet").forEach( bullet => {
            //bullets para selecionar a imagem
            bullet.addEventListener("click", ev => {
                this.active = parseInt(ev.target.dataset.pag) - 1
                this.setActive(this.active)
            })
        })
    }
    theme(tema){
        let body = document.body
        let container = document.getElementById("slideshow--container")
        switch(tema){
            case 'forest':
                container.classList.remove("apple","default")
                container.classList.add("forest")
                body.style.setProperty("--color-1","rgb(44 170 100)")
                body.style.setProperty("--color-1-transparent","rgb(44 170 100 / 35%)")
                body.style.setProperty("--color-2","rgb(255 255 255)")
                break
            case 'apple':
                container.classList.remove("forest","default")
                container.classList.add("apple")
                body.style.setProperty("--color-1","rgb(155 31 41)")
                body.style.setProperty("--color-1-transparent","rgb(155 31 41 / 35%)")
                body.style.setProperty("--color-2","rgb(255 255 255)")
                break
            default:
                container.classList.remove("apple","forest")
                container.classList.add("default")
                body.style.setProperty("--color-1","rgb(44 44 44)")
                body.style.setProperty("--color-1-transparent","rgb(255 255 255 / 35%)")
                body.style.setProperty("--color-2","rgb(255 255 255)")
                break
        }
    }
    transitionEffect(){
        let spinner = document.createElement("div")
        spinner.classList.add("slideshow-spinner-effect")
        //spinner.innerHTML = `<i class="fa fa-spin fa-spinner"></i>`
        spinner.innerHTML=`<div class="spinner"></div>`
        let slideshowContent = document.getElementById("slideshow--content")
        slideshowContent.appendChild(spinner)
        setTimeout( () =>  spinner.remove(), 600)
    }
}