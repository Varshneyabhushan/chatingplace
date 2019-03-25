

self.addEventListener('install',function(event){
    console.log('installed..')
    event.waitUntil(caches.open('static').then(cache=>{
        cache.addAll([
            '/','script.js','style.css','timer.js',
            'images/144.png','images/bg.png','manifest.json',
        'socket.io/socket.io.js'])
    }))
})

self.addEventListener('activate',function(){
    console.log('activated..')
})

self.addEventListener('fetch',function(event){
    if(navigator.onLine)
        event.respondWith(fetch(event.request).catch(_=>caches.match(event.request)))
    else{
        return event.respondWith(caches.match(event.request))
    }
})