function abrirMenu(x) {
  if(x.classList.toggle("change")){
  	document.documentElement.classList.add('menu-ativo');
  } else{
  	document.documentElement.classList.remove('menu-ativo');
  }
}

document.documentElement.onclick = function(event) {
    if (event.target === document.documentElement) {
        document.documentElement.classList.remove('menu-ativo');
    }
};

