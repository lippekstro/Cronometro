window.addEventListener('onWidgetLoad', function (obj) {
    // Seleciona os elementos do cronômetro
    const horaElement = document.querySelector('.hora');
    const minutoElement = document.querySelector('.minuto');
    const segundoElement = document.querySelector('.segundo');

    const txtTitulo = document.getElementById('titulo');
    const entTitulo = document.getElementById('txttitulo');
    const btnNovoTitulo = document.getElementById('novotitulo');

    const entHora = document.getElementById('hora');
    const entMin = document.getElementById('minuto');
    const entSeg = document.getElementById('segundo');
    const btnPlay = document.getElementById('play');
    const btnReset = document.getElementById('reset');
    const btnAtualizar = document.getElementById('atualizar');

    // Define o tempo inicial em segundos e se o cronômetro está pausado
    let tempo = 0;
    let pausado = false;

    // Atualiza o cronômetro a cada segundo
    const intervalID = setInterval(() => {
        if (!pausado) {
            // Calcula as horas, minutos e segundos
            const horas = Math.floor(tempo / 3600);
            const minutos = Math.floor((tempo % 3600) / 60);
            const segundos = tempo % 60;
            // Atualiza os elementos do cronômetro
            horaElement.textContent = horas < 10 ? `0${horas}` : horas;
            minutoElement.textContent = minutos < 10 ? `0${minutos}` : minutos;
            segundoElement.textContent = segundos < 10 ? `0${segundos}` : segundos;

            // Incrementa o tempo
            tempo++;
        }
    }, 1000);

    btnNovoTitulo.addEventListener('click', () => {
        txtTitulo.innerHTML = entTitulo.value;
    });

    // Adiciona um ouvinte de eventos para pausar/iniciar o cronômetro quando o botao eh clicado
    btnPlay.addEventListener('click', () => {
        // Alterna o estado de pausa
        pausado = !pausado;
        // Altera o texto do botão com base no estado de pausa
        btnPlay.innerHTML = pausado ? '<span class="material-symbols-outlined">play_arrow</span>' : '<span class="material-symbols-outlined">pause</span>';
    });
    // Adiciona um ouvinte de eventos para pausar/iniciar o cronômetro quando o botao eh clicado
    window.addEventListener('onEventReceived', function (obj) {
        const data = obj.detail.event;
        if (data.listener === 'widget-button') {
            if (data.field === 'pause') {
                pausado = !pausado;
                btnPlay.innerHTML = pausado ? '<span class="material-symbols-outlined">play_arrow</span>' : '<span class="material-symbols-outlined">pause</span>';
            }
            window.dispatchEvent(emulated);
        }
    });

    // Adiciona um ouvinte de eventos para resetar o cronômetro quando o botao eh clicado
    btnReset.addEventListener('click', () => {
        horaElement.textContent = '00';
        minutoElement.textContent = '00';
        segundoElement.textContent = '00';
        tempo = 0;
        pausado = true;
        btnPlay.innerHTML = '<span class="material-symbols-outlined">play_arrow</span>'
    });
    // Adiciona um ouvinte de eventos para resetar o cronômetro quando o botao eh clicado
    window.addEventListener('onEventReceived', function (obj) {
        const data = obj.detail.event;
        if (data.listener === 'widget-button') {
            if (data.field === 'reset') {
                horaElement.textContent = '00';
                minutoElement.textContent = '00';
                segundoElement.textContent = '00';
                tempo = 0;
                pausado = true;
                btnPlay.innerHTML = '<span class="material-symbols-outlined">play_arrow</span>'
            }
            window.dispatchEvent(emulated);
        }
    });

    btnAtualizar.addEventListener('click', () => {
        const horas = parseInt(entHora.value);
        const minutos = parseInt(entMin.value);
        const segundos = parseInt(entSeg.value);

        horaElement.textContent = horas < 10 ? `0${horas}` : horas;
        minutoElement.textContent = minutos < 10 ? `0${minutos}` : minutos;
        segundoElement.textContent = segundos < 10 ? `0${segundos}` : segundos;

        tempo = (horas * 3600) + (minutos * 60) + segundos;
        pausado = true;
        btnPlay.innerHTML = '<span class="material-symbols-outlined">play_arrow</span>'
    });
    // Adiciona um ouvinte de eventos para atualizar o cronômetro com os valores colocados nos campos quando o botao eh clicado
    const { fieldData } = obj.detail;
    window.addEventListener('onEventReceived', function (obj) {
        const data = obj.detail.event;
        if (data.listener === 'widget-button') {
            if (data.field === 'atualiza') {
                horaElement.textContent = fieldData.hora;
                minutoElement.textContent = fieldData.minuto;
                segundoElement.textContent = fieldData.segundo;
                tempo = (fieldData.hora * 3600) + (fieldData.minuto * 60) + fieldData.segundo;
                pausado = false;
            }
            window.dispatchEvent(emulated);
        }
    });
});
