document.getElementById("loginForm").addEventListener("submit", e => {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const contrasena = document.getElementById("contrasena").value;

    const tx = db.transaction("usuarios", "readonly");
    const store = tx.objectStore("usuarios");
    const index = store.index("USUARIO");
    const req = index.get(usuario);

    req.onsuccess = () => {
        if (req.result && req.result.CONTRASENA === contrasena) {
			sessionStorage.setItem("login", JSON.stringify({COD_USUARIO:req.result.COD_USUARIO,USUARIO:req.result.USUARIO}));
            window.location.href = "panel.html";
        } else {
			
			let data = new FormData();
			data.append('Request','Login')
			data.append('USUARIO',usuario)
			data.append('CONTRASENA',contrasena)
			
			Fetch({url,data,type:'json',method:'POST'}).then(res=>{
				console.log(res);

            if(res){
                if(res.data && Array.isArray(res.data)){
                    // NUEVA transacción en modo escritura
                    const tx2 = db.transaction("usuarios", "readwrite");
                    const store2 = tx2.objectStore("usuarios");
                    store2.add({...res.data[0]});

                    sessionStorage.setItem("login", JSON.stringify(res.data[0]));
                    window.location.href = "panel.html";
                } else {
                    alert("Credenciales incorrectas");
                }
            }

			})
        }
    };
});
