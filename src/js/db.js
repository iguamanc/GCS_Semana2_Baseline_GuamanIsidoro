let url="https://script.google.com/macros/s/AKfycbwodNGYIJyZi2G7zc3F-uvhoArf5mjgqZht_flspdCUW-zekH_qY2ps2YdLDKq0oe235g/exec"
let db;

const request = indexedDB.open("gap_caguanap", 1);

request.onupgradeneeded = e => {
    db = e.target.result;

    const usuarios = db.createObjectStore("usuarios", { keyPath: "COD_USUARIO" });
    usuarios.createIndex("USUARIO", "USUARIO", { unique: true });

    const lecturas = db.createObjectStore("lecturas", { autoIncrement: true });
	lecturas.createIndex("COD_CLIENTE_AP", "COD_CLIENTE_AP", { unique: true });
};

request.onsuccess = e => {
    db = e.target.result;
	//console.log(db.transaction)
    //crearUsuarioDemo();
};

function crearUsuarioDemo() {
    const tx = db.transaction("usuarios", "readwrite");
    const store = tx.objectStore("usuarios");

    store.add({
        COD_USUARIO: 1,
        USUARIO: "demo"
    });

    tx.oncomplete = () => {
        console.log("Usuario demo creado");
    };

    tx.onerror = e => {
        console.error("Error creando usuario demo:", e.target.error);
    };
}



function progressBar(){
	this.html=`<div class="progress-bar-container modal">
	  <div class="progress-bar">
		<div class="progress-bar-value"></div>
	  </div>
	</div>`
	this.show=function(mssg){
		document.querySelector('body').insertAdjacentHTML('afterend',this.html);
	}
	this.exit=function(){
		document.querySelector('.progress-bar-container').remove();
	}	
}

function Fetch(param){

	if(!param){alert("Falta parametros");return false}
	
	let url = param.url || "https://example.com/profile";
	let data = param.data || { username: "example" };
	let method=param.method || "GET"; // or 'PUT'
	let type=param.type??null;
	let success=param.success || function(response){return response};
	let error=param.error || function(error){console.log("error:", error)};
	let options={method,redirect:'follow'}
	let headers=new Headers();
	let responseType=(res)=>{		
		switch(type){
			case 'json':return res.json();break;
			case 'blob':return res.blob();break;
			case 'text':return res.text();break;
			default:return res
		}
	}
	
	//headers.append("User-Agent", "PostmanRuntime/7.29.2")
	//headers.append("Origin", "http://javascript.info")
	//headers.append("Content-Type", "application/x-www-form-urlencoded") //application/x-www-form-urlencoded, 
	//headers.append("X-Authorization", "Bearer Token 123456")
	
	if(method.toUpperCase() !="GET"){
		Object.assign(options,{		
			mode: 'cors',
			cache: 'default',
			credentials:'same-origin',
			redirect:'follow',
			body:Object.keys(data).length>0?JSON.stringify(data):data, // data can be `string` or {object}!
			headers
		})
	}
	
	const request = new Request(url,options)
	
	new progressBar().show()
	
	return fetch(request)
	.then((res) =>responseType(res))
	.catch((e) => error(e.message))
	.then((response) =>success(response) )
	.finally(()=>new progressBar().exit())
}