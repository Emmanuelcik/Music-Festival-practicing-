
document.addEventListener("DOMContentLoaded", ()=>{
    crearGaleria();
    scrollNav();
    navegacionFija();
})
function crearGaleria(){
    const galeria = document.querySelector(".galeria-imagenes");

    for (let i = 1; i <= 12; i++) {
        let imagen = document.createElement("IMG");
        imagen.src = `build/img/thumb/${i}.webp`;
        //añadimos el evento de click en una imagen 
        imagen.onclick = mostrarImagen;

        imagen.dataset.imagenId = i;

        let lista = document.createElement("LI");
        lista.appendChild(imagen);
        
        galeria.appendChild(lista);
    }
}

function mostrarImagen(e){
    const id = parseInt(e.target.dataset.imagenId);
    let imagen = document.createElement("IMG");
    imagen.src = `build/img/grande/${id}.webp`;

    let overlay = document.createElement("DIV");
    overlay.appendChild(imagen);
    overlay.classList.add("overlay");
    
    //cerrar imagen
    const cerrarImagen = document.createElement("P");
    cerrarImagen.textContent = "X";
    cerrarImagen.classList.add("btn-cerrar");
    overlay.appendChild(cerrarImagen);

    //Cuando se de click se cierre la imagen
    overlay.onclick = function (){
        overlay.remove();
        body.classList.remove("fijar-body");
    }

    //Cuando se preciona se cierra la imagen
    cerrarImagen.onclick = function (){
        overlay.remove();
        body.classList.remove("fijar-body");
    }
   
    let body = document.querySelector("body");
    body.appendChild(overlay);

    //clase para que no se mueva cuando agregamos overlay al body
    body.classList.add("fijar-body");   
}

function scrollNav(){
    let enlaces = document.querySelectorAll(".navegacion-principal a");
    for (const enlace of enlaces) {
        enlace.addEventListener("click", (e) =>{
            e.preventDefault();
            let seccion = document.querySelector(e.target.attributes.href.value);
            seccion.scrollIntoView({
                behavior: "smooth"
            })
        });
    }
}

function navegacionFija(){

    //Registrar el intersection of server
    const barra = document.querySelector(".header");
    let observer = new IntersectionObserver( (entries) =>{ 
        console.log(entries[0]);
        if(entries[0].isIntersecting){
            barra.classList.remove("fijo")
        }else{
            barra.classList.add("fijo");
        }
    });

   observer.observe(document.querySelector(".sobre-festival"));
    
    //Elemenot a observar 
}
