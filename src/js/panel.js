if (!sessionStorage.getItem("login")) {
    window.location.href = "index.html";
}

const tablaLecturas = document.getElementById("tablaLecturas");
const lecturaForm = document.getElementById("lecturaForm");
const idEditar = document.getElementById("id_editar");
const navBotones=document.querySelector(".nav-botones")
const session=JSON.parse(sessionStorage.getItem("login"))

mostrarVista('lista')
listarLecturas();
console.log(sessionStorage.getItem("login"))

navBotones.insertAdjacentHTML('beforeend',`<span>${session.NOMBRES}</span>`)

/* GUARDAR / ACTUALIZAR */
lecturaForm.addEventListener("submit", e => {
    e.preventDefault();

    const lectura = {
        COD_CLIENTE_AP: cod_cliente_ap.value,
        NOMBRES: nombres.value,
        NRO_MEDIDOR: nro_medidor.value,
        DIRECCION: direccion.value,
        MES: mes.value,
        ANO: ano.value,
        LECTURA_ANT: lectura_ant.value,
        LECTURA_ACT: lectura_act.value,
        FECHA_LECTURA: fecha_lectura.value,
        COD_ESTADO: cod_estado.value
    };

    const tx = db.transaction("lecturas", "readwrite");
    const store = tx.objectStore("lecturas");

    if (idEditar.value === "") {
       // store.add(lectura);
        alert("No esta habilitado para guardada");
    } else {
        store.put(lectura, Number(idEditar.value));
        alert("Lectura actualizada");
        idEditar.value = "";
    }

    form.reset();
    listarLecturas();
});

/* LISTAR */
function listarLecturas() {
    tablaLecturas.innerHTML = "";
	
	new Promise((resolve,reject)=>{
		setTimeout(()=>resolve(db),1000)
	}).then(db=>{
		const tx = db.transaction("lecturas", "readonly");
		const store = tx.objectStore("lecturas");

		store.openCursor().onsuccess = e => {
			const cursor = e.target.result;
			if (cursor) {
				const l = cursor.value;
				let btnEdit=`${l.ESTADO_PLANILLA}`
				//console.log(l)
				
				if(!l.COD_EP)btnEdit=`<button class="btn-editar" onclick="editar(${cursor.key})">Editar</button>`

				tablaLecturas.innerHTML += `
					<tr>
						<td data-label="COD">${l.COD_CLIENTE_AP}</td>
						<td data-label="NRO MEDIDOR">${l.NRO_MEDIDOR}</td>
						<td data-label="NOMBRE">${l.NOMBRES}</td>
						<td data-label="LECT. ANT.">${l.LECTURA_ANT}</td>
						<td data-label="LECT. ACT.">${l.LECTURA_ACT}</td>
						<td data-label="MES">${l.MES}</td>
						<td data-label="AÑO">${l.ANO}</td>
						<td data-label="ACCIÓN">${btnEdit}</td>
					</tr>
				`;
				cursor.continue();
			}
		};
	})
}


/* EDITAR */
function editar(id) {
    const tx = db.transaction("lecturas", "readonly");
    const store = tx.objectStore("lecturas");
    const req = store.get(id);
	
    req.onsuccess = () => {
        const l = req.result;
		console.log(l);		
        idEditar.value = id;
        cod_cliente_ap.value = l.COD_CLIENTE_AP;
        nombres.value = l.NOMBRES;
        nro_medidor.value = l.NRO_MEDIDOR;
        direccion.value = l.DIRECCION;
        mes.value = l.MES;
        ano.value = l.ANO;
        lectura_ant.value = l.LECTURA_ANT;
        lectura_act.value = l.LECTURA_ACT;
        fecha_lectura.value = l.FECHA_LECTURA;
        cod_estado.value = l.COD_EP;
    };	
	
	// Desliza el scroll hasta ese elemento
	lecturaForm.scrollIntoView({
	  behavior: "smooth", // animación suave
	  block: "start"      // alineación: "start", "center", "end", "nearest"
	});

}

function mostrarVista(vista) {
	let vistas=document.querySelectorAll('.nav-section')
	let btnsLink=document.querySelectorAll(".nav-btn")
	
	vistas.forEach((v,i)=>{
		let id=v.id
		v.className=`nav-section hidden`
		btnsLink[i].classList.remove("active");
		
		if(id==`vista-${vista}`){
			v.className=`nav-section`
			btnsLink[i].classList.add("active");
		}
	})
}

function importarLectura(){
	if(!confirm('Al importar se borrara toda la informacion, desea continuar?'))return null

	let data = new FormData();
	data.append('Request','getClienteAP')
	tablaLecturas.innerHTML=''
	
	Fetch({url,data,type:'json',method:'POST'}).then(res=>{
		if(res){
			if(res.data && Array.isArray(res.data)){
				const tx = db.transaction("lecturas", "readwrite");
				const store = tx.objectStore("lecturas");
				
				/*Borra todos los registros del store*/
				const request = store.clear();

				res.data.forEach(x=>{
					//console.log(x)
					let tr=document.createElement('tr')
						tr.innerHTML=`<td>${x.COD_CLIENTE_AP}</td>
						<td>${x.NRO_MEDIDOR}</td>
						<td>${x.NOMBRES}</td>
						<td>${x.LECTURA_ANT}</td>
						<td>${x.LECTURA_ACT}</td>
						<td>${x.MES}</td>
						<td>${x.ANO}</td>
						<td><button type="button" class="btn-editar">${x.COD_CLIENTE_AP}</button></td>
						`
					tablaLecturas.append(tr)
					store.add({...x});
				})
			}
		}		
	})

}

function exportarLectura(){
	//tablaLecturas
	alert('En desarrollo')
}

function logout() {
    sessionStorage.clear();
    window.location.href = "index.html";
}
