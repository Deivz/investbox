let menuAberto = document.querySelector(".abrir-menu");

function toggle(event){
	if(menuAberto.classList.contains("change")){
		document.documentElement.classList.remove('menu-ativo');
		menuAberto.classList.remove("change");
	}else{
		document.documentElement.classList.add('menu-ativo');
		menuAberto.classList.add("change");
	}
}

menuAberto.addEventListener("click", toggle, false);

document.documentElement.onclick = function(event) {
    if (event.target === document.documentElement) {
        document.documentElement.classList.remove('menu-ativo');
        menuAberto.classList.remove("change");
    }
}

