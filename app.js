/* 
    Notas:
   *1 - Muitas validações foram feitas "2 vezes" para dificultar a inserção de caracteres inválidos
    , como desabilita o botão de sortear no carregar da página e o alerta de campo vazio.
*/

// Desabilitar o botão de sortear se a lista de amigos estiver vazia no carregar da página
document.addEventListener('DOMContentLoaded', function () {
    const listaAmigos = document.querySelectorAll('#listaAmigos li');
    const botaoSortear = document.getElementById('botaoSortear');
    botaoSortear.disabled = listaAmigos.length === 0;
});

// Função para adicionar o nome à lista
function adicionarAmigo() {
    //Removendo espaços desnecessários para armazenar o nome
    const nomeAmigo = document.getElementById('amigo').value.trim();
    
    //Validação para verificar se o campo está vazio
    if (nomeAmigo === '') {
        alert('Por favor, insira um nome válido.');
        return;
    }
    
    //Validando se o nome contém apenas caracteres válidos (alfabéticos)
    if (!/^[A-Za-záéíóúãõâêîôûàèìòùçÁÉÍÓÚÃÕÂÊÎÔÛÀÈÌÒÙÇ ]+$/.test(nomeAmigo)) {
        alert('O nome não deve conter caracteres especiais (,!.;:?).');
        return;
    }

    //Verificando se o nome já foi inserido
    const listaAmigos = document.querySelectorAll('#listaAmigos li');
    for (let i = 0; i < listaAmigos.length; i++) {
        if (listaAmigos[i].textContent.toLowerCase() === nomeAmigo.toLowerCase()) {
            alert('Este nome já foi adicionado à lista.');
            return;
        }
    }

    //Criando o item
    const li = document.createElement('li');
    li.textContent = nomeAmigo;

    //Criando o botão de remoção
    const botaoRemover = document.createElement('button');
    botaoRemover.innerHTML = '<i class="fas fa-trash-alt"></i>';
    // botaoRemover.textContent = ' X ';
    botaoRemover.title = ' Remover amigo ';
    botaoRemover.classList.add('remove-button');
    botaoRemover.onclick = function () {
        removerAmigo(li);
    };

    //Adicionando o botão de remoção ao item da lista
    li.appendChild(botaoRemover);

    //Adicionando o item à lista de amigos
    const listaAmigosContainer = document.getElementById('listaAmigos');
    listaAmigosContainer.appendChild(li);

    // Limpando o campo de entrada
    document.getElementById('amigo').value = '';
    
    // Habilitar o botão de sortear após adicionar um amigo
    document.getElementById('botaoSortear').disabled = false;
}

// Função para remover um amigo da lista
function removerAmigo(item) {
    // Remover o item da lista
    item.remove();

    // Verificar se a lista está vazia após a remoção
    const listaAmigos = document.querySelectorAll('#listaAmigos li');
    const botaoSortear = document.getElementById('botaoSortear');
    botaoSortear.disabled = listaAmigos.length === 0;

    // Se a lista estiver vazia, limpa a mensagem de resultado
    if (listaAmigos.length === 0) {
        document.getElementById('resultado').innerHTML = '';
    }
}

// Função para sortear um amigo aleatoriamente
function sortearAmigo() {
    // Obtendo a lista de amigos
    const listaAmigos = document.querySelectorAll('#listaAmigos li');

    // Verificando se há pelo menos um amigo na lista
    if (listaAmigos.length === 0) {
        alert('Adicione pelo menos um amigo para sortear!');
        return;
    }

    // Verificando se todos os amigos já foram sorteados
    if (listaAmigos.length === document.querySelectorAll('.sorteado').length) {
        alert('Todos os amigos já foram sorteados. Reinicie o sorteio ou adicione novos amigos.');
        return;
    }

    // Gerando um índice aleatório
    let indiceAleatorio;
    let amigoSorteado;

    // Procurando um amigo que ainda não foi sorteado
    do {
        indiceAleatorio = Math.floor(Math.random() * listaAmigos.length);
        amigoSorteado = listaAmigos[indiceAleatorio].textContent.replace('X', '').trim();
    } while (listaAmigos[indiceAleatorio].classList.contains('sorteado'));

    // Marcando o amigo como sorteado
    listaAmigos[indiceAleatorio].classList.add('sorteado');

    // Exibindo o nome sorteado na lista de resultados
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `<li><strong>${amigoSorteado}</strong> foi o seu amigo secreto!</li>`;
}