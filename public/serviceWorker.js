
const links = [
    '/','home/script.js','home/style.css','home/preload.js','home/room.html',
    'assets/144.png','assets/bg.png','assets/d-loading.js','manifest.json',
    '/socket.io/socket.io.js','/db.js',
'/login/login.html','/login/script.js','/login/','/serviceWorker.js']

const cacheName = 'chatpages-v5'

self.addEventListener('install',function(event){
    console.log('installing..')
    event.waitUntil(caches.open(cacheName).then(cache=>cache.addAll(links)))
})
 
self.addEventListener('activate',function(event){
    console.log('activated..')
    event.waitUntil((async function(){  
        try{
            let names = await caches.keys()
            names = names.filter( name => name !== cacheName )
            return Promise.all(names.map(name=>caches.delete(name)))
        }catch(err){
            console.log(err)
            return Promise.reject(err)
        }
    })())
})

self.addEventListener('fetch',function(event){
    let prom = caches.match(event.request).then(res =>
        res || fetch(event.request))
    
    event.respondWith(prom)
})