const clicarNome = document.querySelector("#nome-completo");
const clicarCPF = document.querySelector("#cpf");
const clicarEmail = document.querySelector("#email");
const clicarConfirma = document.querySelector("#confirma-email");
const clicarTelefone = document.querySelector("#telefone");

function mudarNome(event){
	document.querySelector('label[for="nome-completo"]').innerHTML = "Nome sobrenome";
}

function voltarNome(event){
	document.querySelector('label[for="nome-completo"]').innerHTML = "Seu nome completo é";
}

function mudarCPF(event){
	document.querySelector('label[for="cpf"]').innerHTML = "Somente números, ex: 00000000000";
}

function voltarCPF(event){
	document.querySelector('label[for="cpf"]').innerHTML = "Seu CPF";
}

function mudarEmail(event){
	document.querySelector('label[for="email"]').innerHTML = "seuemail@dominio.com.br";
}

function voltarEmail(event){
	document.querySelector('label[for="email"]').innerHTML = "Seu e-mail pessoal";
}

function mudarConfirma(event){
	document.querySelector('label[for="confirma-email"]').innerHTML = "seuemail@dominio.com.br";
}

function voltarConfirma(event){
	document.querySelector('label[for="confirma-email"]').innerHTML = "Confirmar e-mail";
}

function mudarTelefone(event){
	document.querySelector('label[for="telefone"]').innerHTML = "(00) 00000-0000";
}

function voltarTelefone(event){
	document.querySelector('label[for="telefone"]').innerHTML = "Seu telefone celular/fixo";
}

clicarNome.addEventListener("click", mudarNome, true);
clicarNome.addEventListener("blur", voltarNome, true);
clicarCPF.addEventListener("click", mudarCPF, true);
clicarCPF.addEventListener("blur", voltarCPF, true);
clicarEmail.addEventListener("click", mudarEmail, true);
clicarEmail.addEventListener("blur", voltarEmail, true);
clicarConfirma.addEventListener("click", mudarConfirma, true);
clicarConfirma.addEventListener("blur", voltarConfirma, true);
clicarTelefone.addEventListener("click", mudarTelefone, true);
clicarTelefone.addEventListener("blur", voltarTelefone, true);