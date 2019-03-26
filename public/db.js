database = {
    save(data){
        data.slno = '1'
        return new Promise((resolve,reject)=>{
            this.getUserInfo().then(userInfoObject=>{
                let old = userInfoObject.delete('1')
                    
                old.onerror = createNew
                old.onsuccess = createNew

                function createNew(){
                    let addingNew = userInfoObject.add(data)

                    addingNew.onsuccess = (event) => resolve(event)
                    addingNew.onerror = x=>reject(x.target.error)
                }
            })
        })
    },

    load(){
        return new Promise((resolve,reject)=>{
            this.getUserInfo().then(userInfoObject=>{
                let old = userInfoObject.get('1')
                old.onerror = x=>reject(x.target.error.code)
                old.onsuccess = _=>resolve(old.result)
            })
        })
    },

    delete(){
        return new Promise((resolve,reject)=>{
            this.getUserInfo().then(userInfoObject=>{
                let old = userInfoObject.delete('1')
                    
                old.onerror = x=>reject(x.target.error)
                old.onsuccess = x=>resolve()
            })
        })
    },

    getUserInfo(){
        return new Promise((resolve,reject)=>{

            let request = window.indexedDB.open("users", 1);
      
            request.onerror = event=>reject(event.target.error.code)

            request.onupgradeneeded = function(event){
                let db = event.target.result;
                db.createObjectStore("userInfo", { keyPath: "slno" });
            }

            request.onsuccess = function(event){
                let db = event.target.result

                if(!db.objectStoreNames.contains('userInfo'))
                    reject({ error : 404 })
                else {
                    let trans = db.transaction("userInfo", "readwrite")
                    trans.onerror = x=>reject(x.target.error.code)
                    let userInfo = trans.objectStore("userInfo") 
                    resolve(userInfo)
                }

            }
        })
    }
}