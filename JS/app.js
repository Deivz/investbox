import { valida } from './validar.js'

const inputs = document.querySelectorAll('input')

inputs.forEach(input => {
    input.addEventListener('blur', (evento) => {
        valida(evento.target)
    })
})


/* import{valida} from "./validar.js"

const inputs = document.querySelectorAll("input");

inputs.forEach(input => {
	input.addEventListener("blur", (evento) =>{
		valida(evento.target);
	});
}); */