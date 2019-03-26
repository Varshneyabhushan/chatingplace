

self.addEventListener('install',function(event){
    console.log('installed..')
    event.waitUntil(caches.open('static').then(cache=>{
        cache.addAll([
            '/','home/script.js','home/style.css','home/timer.js',
            'assets/144.png','assets/bg.png','manifest.json',
        'socket.io/socket.io.js','assets/d-loading.js','/db.js'])
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