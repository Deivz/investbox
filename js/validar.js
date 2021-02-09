const dataNascimento = document.querySelector("#nascimento");

dataNascimento.addEventListener("blur", function(evento){
	validaNascimento(evento.target);
});

function validaNascimento(input){
	const dataInput = new Date(input.value);
	let mensagem = "";

	if(!maioridade(dataInput)){
		mensagem = "Você deve ter mais de 18 anos para se cadastrar";
	}
	input.setCustomValidity(mensagem)
}

function maioridade(data){
	const dataAtual = new Date();
	const dataMaioridade = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());
	return dataMaioridade <= dataAtual
}