document.getElementById('botao-pesquisar').addEventListener('click', function() {
    const cidadePesquisada = document.getElementById('campo-pesquisa').value;
    buscarPrevisaoDoTempoParaCidade(cidadePesquisada);
});

async function buscarPrevisaoDoTempoParaCidade(cidade) {
    const url = `http://api.weatherapi.com/v1/current.json?key=d67fdd95b7d34449953235809241703&q=${cidade}&aqi=no&lang=pt`;

    try {
        const resposta = await fetch(url);
        if (!resposta.ok) throw new Error(`Erro na API: ${resposta.statusText}`);
        const dados = await resposta.json();
        const temperaturaAtual = dados.current.temp_c;
        const condicaoClimatica = dados.current.condition.text;
        const iconeClima = escolherEmoticon(dados.current.condition.code);
        exibirResultadoPesquisa(cidade, temperaturaAtual, condicaoClimatica, iconeClima);
    } catch (erro) {
        console.error("Erro ao buscar dados da API", erro);
        alert("Não foi possível buscar a previsão do tempo. Verifique o console para mais detalhes.");
    }
}


function escolherEmoticon(codigoClima) {
    // Exemplo simplificado. Adapte conforme necessário.
    if (codigoClima === 1000) { // Código para 'Ensolarado'
        return '☀️';
    } else if (codigoClima >= 1003 && codigoClima <= 1030) { // Códigos para 'Parcialmente nublado' até 'Nevoeiro'
        return '⛅';
    } else if (codigoClima >= 1063) { // Considerando qualquer coisa acima como chuvoso/nublado para simplificar
        return '🌧️';
    }
    return ''; // Retorne um padrão ou um ícone específico se necessário
}

function exibirResultadoPesquisa(cidade, temperatura, condicao, icone) {
    const lista = document.getElementById('lista-cidades');
    lista.innerHTML = ''; // Limpa resultados anteriores
    const item = document.createElement('li');
    item.innerHTML = `<strong>${cidade}:</strong> ${temperatura}°C, ${condicao} ${icone}`;
    lista.appendChild(item);
}
