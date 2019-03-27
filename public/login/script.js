let load = document.getElementById('loading')
load.text = 'loading..'

if(navigator.serviceWorker){
    window.addEventListener('load',_=>{
        navigator.serviceWorker.register('../serviceWorker.js')
    .then(_=>{console.log('registered')})
    })
}
    
database.load().then(result=>{
    if(result){
        setTimeout(_=>window.location = '..' , 500)
    }else{
        setTimeout(switchDisplay,500)
    }
})

function switchDisplay(){
    let style1 = load.style.display
    let style2 = document.getElementById('content').style.display
    load.style.display = (style2 != 'none') ? 'inline-block' : 'none'
    document.getElementById('content').style.display = (style1 == 'none') ? 'none' : 'grid' 
}

function onSignIn(user){
    gapi.auth2.getAuthInstance().signOut();
    
    let profile = user.getBasicProfile()

    let data = {
      id : profile.getId(),
      full_name : profile.getName(),
      given_name : profile.getGivenName(),
      family_name : profile.getFamilyName(),
      image_url : profile.getImageUrl(),
      email : profile.getEmail()
    }

    save(data)
}

function onAnonymous(){
    let data = { full_name : 'anonymous' , given_name : '' }
    save(data)
}

function save(data){
    switchDisplay()
    load.text = 'loading..'
    database.save(data).then(event=>{
        setTimeout(_=>window.location = '..' , 100)
    }).catch(err=>{
        switchDisplay()
        load.text = 'signin-in'
    })
}