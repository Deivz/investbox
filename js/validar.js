const nome = document.querySelector('[data-tipo="nome"]')
const cpf = document.querySelector('[data-tipo="cpf"]')
const nascimento = document.querySelector('[data-tipo="dataNascimento"]')
const email = document.querySelector('[data-tipo="email"]')
const confirmaEmail = document.querySelector('[data-tipo="confirmaEmail"]')
const telefone = document.querySelector('[data-tipo="telefone"]')
const cep = document.querySelector('[data-tipo="cep"]')
const numeroCasa = document.querySelector('[data-tipo="numeroCasa"]')
const complemento = document.querySelector('[data-tipo="complemento"]')
const senha = document.querySelector('[data-tipo="senha"]')
const confirmaSenha = document.querySelector('[data-tipo="confirmaSenha"]')
const username = document.querySelector('[data-tipo="username"]')
const checar = document.querySelector('[data-tipo="checar"]')

const botao = document.querySelector("[data-botao]")

var j = 0;

export function valida(input) {
    const tipoDeInput = input.dataset.tipo
    if(validadores[tipoDeInput]) {
        validadores[tipoDeInput](input)
    }

    if(input.validity.valid) {
        input.classList.remove('dado-errado')
        input.classList.add('dado-certo')
        input.parentElement.querySelector('.erro1').innerHTML = ""
        input.parentElement.querySelector('.erro2').innerHTML = "&#10004"
        input.parentElement.querySelector('.erro3').innerHTML = ""
    } else {
        input.classList.add('dado-errado')
        input.classList.remove('dado-certo')
        input.parentElement.querySelector('.erro1').innerHTML = ""
        input.parentElement.querySelector('.erro2').innerHTML = "!"
        input.parentElement.querySelector('.erro3').innerHTML = mostraMensagemDeErro(tipoDeInput, input)
        j=j+1;
    }
}

export function criarCampos(input){
    const verificaSpans = input.parentElement.querySelectorAll("span").length;
    if(verificaSpans == 3){
        return
    }

    const criarSpan = [
        document.createElement("span"),
        document.createElement("span"),
        document.createElement("span")
    ]
    
    for(let i = 0; i <3; i++){
        criarSpan[i].classList.add(`erro${i+1}`)
        input.parentElement.appendChild(criarSpan[i]);
    }
}

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
]

const mensagensDeErro = {
    nome: {
        valueMissing: 'O campo de nome não pode estar vazio.',
        customError: 'Seu nome não pode possuir números!'
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        customError: 'O CPF digitado não é válido.' 
    },
    dataNascimento: {
        valueMissing: 'Você deve ser maior que 18 anos para se cadastrar.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    email: {
        valueMissing: 'O campo de email não pode estar vazio.',
        customError: 'O e-mail digitado não é válido, por favor verifique se está correto!'
    },
    confirmaEmail: {
        valueMissing: 'O campo de email não pode estar vazio.',
        customError: 'O email digitado não coincide com o anterior, por favor verifique!'
    },
    telefone:{
        valueMissing: 'O campo de telefone não pode estar vazio.',
        customError: 'O telefone digitado não é válido, por favor verifique se está correto!'
    },
    cep: {
        valueMissing: 'O campo de CEP não pode estar vazio.',
        patternMismatch: 'O CEP deve conter 8 dígitos e apenas números!',
        customError: "Não foi possível encontrar o CEP informado."
    },
    numeroCasa: {
        valueMissing: 'O campo de número não pode estar vazio.',
        customError: "O número da casa deve possuir apenas letras e números e no máximo 5 caracteres."
    },
    complemento: {
        customError: "O complemento deve possuir no máximo 50 caracteres."
    },
    username:{
        valueMissing: 'O campo de nome de usuário não pode estar vazio.',
        customError: 'O nome de usuário deve conter entre 6 e 15 caracteres e são aceitos somente "." e "_" como carceter especial.'
    },
    senha: {
        valueMissing: 'O campo de senha não pode estar vazio.',
        customError: 'A senha deve conter entre 6 a 12 caracteres, deve conter pelo menos uma letra maiúscula, um número e não deve conter símbolos.'
    },
    confirmaSenha: {
        valueMissing: 'O campo de senha não pode estar vazio.',
        customError: 'A senha digitada não coincide com a anterior, por favor verifique!'
    },
    checar: {
        valueMissing: 'Você deve sinalizar que concorda com nossos termos.',
        customError: 'Você deve sinalizar que concorda com nossos termos.'
    }
}

const validadores = {
    nome:input => validaNome(input),
    cpf:input => validaCPF(input),
    dataNascimento:input => validaDataNascimento(input),
    email:input => validaEmail(input),
    confirmaEmail:input => validaEmailConfirma(input),
    telefone:input => validaTelefone(input),
    cep:input => recuperarCEP(input),
    numeroCasa:input => validaNumero(input),
    complemento:input => validaComplemento(input),
    username:input => validaUsername(input),
    senha:input => validaSenha(input),
    confirmaSenha:input => validaSenhaConfirma(input),
    checar:input => validaCheck(input)
}

function mostraMensagemDeErro(tipoDeInput, input) {
    let mensagem = ''
    tiposDeErro.forEach(erro => {
        if(input.validity[erro]) {
            mensagem = mensagensDeErro[tipoDeInput][erro]
        }
    })
    
    return mensagem
}

function validaNome(input){
    let mensagem = ""
    const regexNome = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/
    
    if(input.value == "" || input.parentElement.querySelector('.erro1')==null){
        criarCampos(input)
        return false;
    }

    if (!regexNome.test(input.value)){
        mensagem = "O e-mail digitado não é válido, por favor verifique se está correto!";
    }

    input.setCustomValidity(mensagem)
    return true;
    
}

function validaDataNascimento(input) {
    const dataRecebida = new Date(input.value)
    let mensagem = ''

    if(!maiorQue18(dataRecebida)) {
        criarCampos(input)
        mensagem = 'Você deve ser maior que 18 anos para se cadastrar.'
        return false;
    }

    input.setCustomValidity(mensagem)
    return true;
}

function maiorQue18(data) {
    const dataAtual = new Date()
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate())

    return dataMais18 <= dataAtual
}

function validaCPF(input) {
    const cpfFormatado = input.value.replace(/\D/g, '')
    let mensagem = ''
    if(input.value == "" || input.parentElement.querySelector('.erro1')==null){
        criarCampos(input)
        mensagem = "O campo de CPF não pode estar vazio."
        return false;
    }else if(!validarCPF(cpfFormatado)) {
        mensagem = 'O CPF digitado não é válido.'
    }

    input.setCustomValidity(mensagem);

    return true;

}

function validarCPF(cpf) {		
	if(cpf == '') return false;	
	// Elimina CPFs invalidos conhecidos	
	if (cpf.length != 11 || 
		cpf == "00000000000" || 
		cpf == "11111111111" || 
		cpf == "22222222222" || 
		cpf == "33333333333" || 
		cpf == "44444444444" || 
		cpf == "55555555555" || 
		cpf == "66666666666" || 
		cpf == "77777777777" || 
		cpf == "88888888888" || 
		cpf == "99999999999")
			return false;		
	// Valida 1o digito	
	let add = 0;
    let rev = 0;	
	for (let i=0; i < 9; i ++)		
		add += parseInt(cpf.charAt(i)) * (10 - i);	
		rev = 11 - (add % 11);	
		if (rev == 10 || rev == 11)		
			rev = 0;	
		if (rev != parseInt(cpf.charAt(9)))		
			return false;		
	// Valida 2o digito	
	add = 0;	
	for (let i = 0; i < 10; i ++)		
		add += parseInt(cpf.charAt(i)) * (11 - i);	
	rev = 11 - (add % 11);	
	if (rev == 10 || rev == 11)	
		rev = 0;	
	if (rev != parseInt(cpf.charAt(10)))
		return false;		
	return true;   
}

function validaEmail(input){
    let mensagem ="";
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(input.value == "" || input.parentElement.querySelector('.erro1')==null){  
        criarCampos(input)
        return false;
    }

    if(!re.test(input.value)) {
        mensagem = "O e-mail digitado não é válido, por favor verifique se está correto!";
    }

    input.setCustomValidity(mensagem)
    return true
}

function validaEmailConfirma(input) {
    const emailDigitado = input.value
    const emailOriginal = document.getElementById("email").value;
    let mensagem = ''

    if(input.value == "" || input.parentElement.querySelector('.erro1')==null){  
        criarCampos(input)
        return false;
    }

    if(emailDigitado != emailOriginal) {
        mensagem = 'O email digitado não coincide com o anterior.'
    }
    
    input.setCustomValidity(mensagem);
    return true;
}

function validaTelefone(input){
    let mensagem ="";
    const re = /(\(?\d{2}\)?\s?)(\d{4,5}\-?\d{4})/;
    
    if(input.value == "" || input.parentElement.querySelector('.erro1')==null){  
        criarCampos(input)
        return false;
    }

    if(!re.test(input.value)) {
        mensagem = "O telefone digitado não é válido, por favor verifique se está correto!";
    }

    input.setCustomValidity(mensagem)
    return true;
}

function recuperarCEP(input) {
    const cep = input.value.replace(/\D/g, '')
    const url = `https://viacep.com.br/ws/${cep}/json/`

    if(input.value == "" || input.parentElement.querySelector('.erro1')==null){  
        criarCampos(input)
        return false;
    }

    const options = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'content-type': 'application/json;charset=utf-8'
        }
    
    }

    if(!input.validity.patternMismatch && !input.validity.valueMissing) {
        fetch(url,options).then(
            response => response.json()
        ).then(
            data => {
                if(data.erro) {
                    input.setCustomValidity('Não foi possível buscar o CEP.')
                    return false;
                }
                input.setCustomValidity('')
                preencheCamposComCEP(data)
            }
        )
    }
    return true;
}

function preencheCamposComCEP(data) {
    const logradouro = document.querySelector('[data-tipo="logradouro"]')
    const cidade = document.querySelector('[data-tipo="cidade"]')
    const estado = document.querySelector('[data-tipo="estado"]')

    logradouro.value = data.logradouro
    cidade.value = data.localidade
    estado.value = data.uf
}

function validaNumero(input){
    const regexNumeroCasa = /^[A-Za-z0-9]*$/;
    let mensagem =""

    if(input.value.length > 5){
        mensagem = "O número da casa deve possuir apenas letras e números e no máximo 5 caracteres."
    }

    if(input.value == "" || input.parentElement.querySelector('.erro1')==null){  
        criarCampos(input)
        return false;
    }

    if(!regexNumeroCasa.test(input.value)) {
        mensagem = "O número da casa deve possuir apenas letras e números e no máximo 5 caracteres.";
    }

    input.setCustomValidity(mensagem)
    return true;
}

function validaComplemento(input){
    let mensagem =""

    if(input.value.length > 50){
        mensagem = "O complemento deve possuir no máximo 50 caracteres."
    }

    input.setCustomValidity(mensagem)
    return true;
}

function validaUsername(input) {
    let mensagem = "";
    const regexUsername = /^[A-Za-z0-9_.]*$/

    if(input.value.length > 15 || input.value.length < 6){
        mensagem = 'O nome de usuário deve conter entre 6 e 15 caracteres e são aceitos somente ".", "-" e "_" como carceter especial';
    }

    if(input.value == "" || input.parentElement.querySelector('.erro1')==null){  
        criarCampos(input)
        return false;
    }

    if(!regexUsername.test(input.value)) {
        mensagem = 'O nome de usuário deve conter entre 6 e 15 caracteres e são aceitos somente ".", "-" e "_" como carceter especial';
    }

    input.setCustomValidity(mensagem)
    return true;
}

function validaSenha(input) {
    let mensagem = "";
    const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.*[ !@#$%^&*_=+-]).{6,12}$/

    if(input.value == "" || input.parentElement.querySelector('.erro1')==null){  
        criarCampos(input)
        return false;
    }

    if(!regexSenha.test(input.value)) {
        mensagem = "A senha deve conter entre 6 a 12 caracteres, deve conter pelo menos uma letra maiúscula, um número e não deve conter símbolos."
    }

    input.setCustomValidity(mensagem)
    return true;
}

function validaSenhaConfirma(input){
    const senhaDigitada = input.value
    const senhaOriginal = document.getElementById("senha").value;
    let mensagem = ''

    if(input.value == "" || input.parentElement.querySelector('.erro1')==null){  
        criarCampos(input)
        return false;
    }

    if(senhaDigitada != senhaOriginal) {
        mensagem = 'O email digitado não coincide com o anterior.'
    }
    
    input.setCustomValidity(mensagem);
    return true;
}

function validaCheck(input){
    let mensagem = ""
    if(input.value == "" || input.parentElement.querySelector('.erro1')==null){
        input.parentElement.classList.add('dado-errado') 
        criarCampos(input)
    }
    
    if(!input.checked == true){
        input.parentElement.classList.add('dado-errado')
        mensagem = 'Você deve sinalizar que concorda com nossos termos.'
        return false
    }
    input.parentElement.classList.remove('dado-errado')
    input.setCustomValidity(mensagem);
    return true
}

function enviarForm(event){
    
    event.preventDefault();
    if(validaNome(nome)==false){
        valida(nome)
    } 

    if(validaCPF(cpf)==false){
        valida(cpf)
    }

    if(validaDataNascimento(nascimento)==false){
        valida(nascimento)
    } 
    
    if(validaEmail(email)==false){
        valida(email)
    }

    if(validaEmailConfirma(confirmaEmail)==false){
        valida(confirmaEmail)
    }

   if(validaTelefone(telefone)==false){
        valida(telefone)
    }

    if(recuperarCEP(cep)==false){
        valida(cep)
    }

    if(validaNumero(numeroCasa)==false){
        valida(numeroCasa)
    }

    if(validaUsername(username)==false){
        valida(username)
    }

    if(validaSenha(senha)==false){
        valida(senha)
    }

    if(validaSenhaConfirma(confirmaSenha)==false){
        valida(confirmaSenha)
    }

    if (validaCheck(checar)==false){
        valida(checar)
    }

    if(validaNome(nome)==true && validaCPF(cpf)==true && validaDataNascimento(nascimento)==true && validaEmail(email)==true && validaEmailConfirma(confirmaEmail)==true && validaTelefone(telefone)==true && recuperarCEP(cep)==true && validaSenha(senha)==true && validaSenhaConfirma(senha)==true && validaNumero(numeroCasa)==true && validaComplemento(complemento)==true && validaUsername(username)==true && validaCheck(checar)==true) {
        j=0
        alert(`Bem vindo ${nome.value}! Seu pré-cadastro foi realizado. Em até 2 dias enviaremos um e-mail de confirmação após a validação de seu cadastro. Nos vemos novamente em breve!`)
        document.form.submit()
    }

    if (j>=1){
        alert("Formulário possui dados vazios e/ou inválidos! Por favor, preencha os campos corretamente.")
        return false
    }
}

//

botao.addEventListener("click", enviarForm)