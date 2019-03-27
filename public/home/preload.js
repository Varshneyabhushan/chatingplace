

let username = ""

function Timer(val,chat,badge){
    let interval
    let started = false

    this.start = function(){
        chat.appendChild(badge)
        chat.scrollTop = chat.scrollHeight
        interval = setInterval(this.stop,val)
        started = true
    }

    this.stop = function(){
        clearInterval(interval)
        chat.removeChild(badge)
        started = false
    }

    this.reset = function(){
        if(started) this.stop()
        this.start()
    }
}

if(navigator.serviceWorker)
    navigator.serviceWorker.register('/serviceWorker.js')
    .then(_=>console.log('registerd'))

let load = document.getElementById('loading')
let img = document.getElementById('dp')
load.text = 'loading..'

database.load().then(result=>{
    if(result){
        setTimeout(_=>{
            let {given_name , image_url } = result
            username = given_name
            document.getElementById('name').innerText = given_name
            load.parentNode.removeChild(load)
            document.getElementById('content').style.display = 'block'
            img.src = image_url || '../assets/144.png'
        },200)
    }else{
        setTimeout(_=>{
            window.location = "/login/"
        },100)
    }
})

img.addEventListener('click',function(){
    database.delete().then(_=>{
        window.location = '/login/'
    }).catch(err=>{
        console.log(err)
    })
})