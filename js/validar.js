const nome = document.querySelector('[data-tipo="nome"]')
const nascimento = document.querySelector('[data-tipo="dataNascimento"]')
const cpf = document.querySelector('[data-tipo="cpf"]')

const botao = document.querySelector("[data-botao]")


export function valida(input) {
    const tipoDeInput = input.dataset.tipo

    if(validadores[tipoDeInput]) {
        validadores[tipoDeInput](input)
    }

    if(input.validity.valid) {
        input.parentElement.classList.remove('dado-errado')
        input.parentElement.querySelector('.erro1').innerHTML = ""
        input.parentElement.querySelector('.erro2').innerHTML = "&#10004"
        input.parentElement.querySelector('.erro3').innerHTML = ""
    } else {
        input.parentElement.classList.add('dado-errado')
        input.parentElement.querySelector('.erro1').innerHTML = ""
        input.parentElement.querySelector('.erro2').innerHTML = "!"
        input.parentElement.querySelector('.erro3').innerHTML = mostraMensagemDeErro(tipoDeInput, input)
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
        patternMismatch: 'Seu nome não pode possuir números!'
    },
    email: {
        valueMissing: 'O campo de e-mail não pode estar vazio.',
        customError: 'O e-mail digitado não é válido, por favor verifique se está correto!'
    },
    confirmaEmail: {
        valueMissing: 'O campo de email não pode estar vazio.',
        customError: 'O email digitado não coincide com o anterior, por favor verifique!'
    },
    senha: {
        valueMissing: 'O campo de senha não pode estar vazio.',
        patternMismatch: 'A senha deve conter entre 6 a 12 caracteres, deve conter pelo menos uma letra maiúscula, um número e não deve conter símbolos.'
    },
    confirmaSenha: {
        valueMissing: 'O campo de senha não pode estar vazio.',
        customError: 'A senha digitada não coincide com a anterior, por favor verifique!',
        patternMismatch: 'A senha digitada não coincide com a anterior, por favor verifique!'
    },
    dataNascimento: {
        valueMissing: 'Você deve ser maior que 18 anos para se cadastrar.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        customError: 'O CPF digitado não é válido.' 
    },
    cep: {
        valueMissing: 'O campo de CEP não pode estar vazio.',
        patternMismatch: 'O CEP deve conter 8 dígitos e apenas números!',
        customError: "Não foi possível encontrar o CEP informado."
    },
    logradouro: {
        valueMissing: 'O campo de logradouro não pode estar vazio.'
    },
    cidade: {
        valueMissing: 'O campo de cidade não pode estar vazio.'
    },
    estado: {
        valueMissing: 'O campo de estado não pode estar vazio.'
    },
    telefone:{
        valueMissing: 'O campo de telefone não pode estar vazio.',
        customError: 'O telefone digitado não é válido, por favor verifique se está correto!'
    },
    numeroCasa: {
        valueMissing: 'O campo de número não pode estar vazio.',
        patternMismatch: 'O campo deve conter apenas números, informar no complemento caso haja letras.'
    }
}

const validadores = {
    nome:input => validaNome(input),
    dataNascimento:input => validaDataNascimento(input),
    cpf:input => validaCPF(input),
    cep:input => recuperarCEP(input),
    email:input => validaEmail(input),
    confirmaEmail:input => validaEmailConfirma(input),
    telefone:input => validaTelefone(input),
    confirmaSenha:input => validaSenha(input)
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
        mensagem = "O campo de nome não pode estar vazio"
        return false;
    }else if (!regexNome.test(input.value)){
        mensagem = "Seu nome não pode possuir números!"
        return false;
    }else{
        input.setCustomValidity(mensagem)
        return true;
    }
    
}

function validaDataNascimento(input) {
    const dataRecebida = new Date(input.value)
    let mensagem = ''

    if(!maiorQue18(dataRecebida)) {
        mensagem = 'Você deve ser maior que 18 anos para se cadastrar.'
    }

    input.setCustomValidity(mensagem)
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
        mensagem = "O campo de CPF não pode estar vazio"
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
    
    if(!re.test(input.value)) {
        mensagem = "O e-mail digitado não é válido, por favor verifique se está correto!";
    }

    input.setCustomValidity(mensagem)
}

function validaEmailConfirma(input) {
    const emailDigitado = input.value
    const emailOriginal = document.getElementById("email").value;
    let mensagem = ''

    if(emailDigitado != emailOriginal) {
        mensagem = 'O email digitado não coincide com o anterior.'
        return false;
    }

    input.setCustomValidity(mensagem);
    return true;
}

function validaTelefone(input){
    let mensagem ="";
    const re = /(\(?\d{2}\)?\s?)(\d{4,5}\-?\d{4})/;
    
    if(!re.test(input.value)) {
        mensagem = "O telefone digitado não é válido, por favor verifique se está correto!";
        return false;
    }

    input.setCustomValidity(mensagem)
    return true;
}

function recuperarCEP(input) {
    const cep = input.value.replace(/\D/g, '')
    const url = `https://viacep.com.br/ws/${cep}/json/`
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
                return true;
            }
        )
    }
}

function preencheCamposComCEP(data) {
    const logradouro = document.querySelector('[data-tipo="logradouro"]')
    const cidade = document.querySelector('[data-tipo="cidade"]')
    const estado = document.querySelector('[data-tipo="estado"]')

    logradouro.value = data.logradouro
    cidade.value = data.localidade
    estado.value = data.uf
}

function validaSenha(input) {
    const senhaDigitada = input.value
    const senhaOriginal = document.getElementById("senha").value;
    let mensagem = ''

    if(senhaDigitada != senhaOriginal) {
        mensagem = 'A senha digitada não coincide com a anterior, por favor verifique!'
        return false;
    }

    input.setCustomValidity(mensagem)
    return true;
}

function enviarForm(event){
    event.preventDefault();
    if(validaNome(nome)==false){
        alert("Formulário possui dados vazios e/ou inválidos! Por favor, preencha os campos corretamente.")
        console.log(validaDataNascimento(nascimento))
        valida(nome)

    } 

    if(validaCPF(cpf)==false){
        alert("Formulário possui dados vazios e/ou inválidos! Por favor, preencha os campos corretamente.")
        
        valida(cpf)

    }

    if(validaDataNascimento(nascimento)==false){
        alert("Formulário possui dados vazios e/ou inválidos! Por favor, preencha os campos corretamente.");
        valida(nascimento)
        

    } 
    

    if(validaNome(nome)==true && validaCPF(cpf)==true && validaDataNascimento(nascimento)==true){
        alert(`Bem vindo ${nome.value}! Seu pré-cadastro foi realizado. Em até 2 dias enviaremos um e-mail de confirmação após a validação de seu cadastro. Nos vemos novamente em breve!`)
        document.form.submit()
    }
}


botao.addEventListener("click", enviarForm)