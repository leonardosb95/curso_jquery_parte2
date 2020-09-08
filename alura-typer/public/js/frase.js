$('#botao-frase').click(fraseAleatoria);
$('#botao-frase-id').click(buscaFrase);

function fraseAleatoria() {
    $.get("http://192.168.0.83/frases", trocaFraseAleatoria)
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

function trocaFrase(data) {
    var frase = $('.frase');
    frase.text(data.texto);
    atualizarTamanhoFrase();
    atualizaTempoInicial(data.tempo);
}

$('#spinner').toggle(); //mostrando o spinner

function buscaFrase() {

    $('#spinner').toggle();

    var fraseId = $('#frase-id').val();
    var dados = { id: fraseId }; //criacao do objeto JS que guarda a id

    $.get('http://localhost:3000/frases', dados, trocaFrase)
        .fail(function() {
            $('#erro').toggle();
            setTimeout(function() {
                $('#erro').toggle();
            }, 2000);
        })
        .always(function() {
            $('#spinner').toggle();
        });

}