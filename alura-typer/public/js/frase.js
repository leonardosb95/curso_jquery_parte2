$('#botao-frase').click(fraseAleatoria);

function fraseAleatoria() {
    $.get("http://localhost:3000/frases", trocaFraseAleatoria)
        .fail(function() {
            //$('#erro').show(); // ao falhar mostra a mensagem de erro
            $('#erro').toggle();
            setTimeout(function() {
                $('#erro').toggle();
            }, 1500);
        })
        .always(function() { //sempre escondendo o spinner
            $('#spinner').toggle();
        });


}

function trocaFraseAleatoria(data) {
    var frase = $('.frase');
    var numeroAleatorio = Math.floor(Math.random() * data.length);
    frase.text(data[numeroAleatorio].texto);
    atualizarTamanhoFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo);
}

$('#spinner').toggle(); //mostrando o spinner