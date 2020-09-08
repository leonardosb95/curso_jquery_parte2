var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

// $(document).ready(function() {
//     atualizarTamanhoFrase();
//     inicializaContadores();
//     inicializaCronometro();
//     $("#botao-reiniciar").click(reiniciaJogo);
// });

$(function() { //É uma função ready também
    atualizarTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);

    atualizaPlacar();

    $('#usuarios').selectize({
        create: true,
        sortField: 'text'
    });

    $('.tooltip').tooltipster({
        trigger: "custom"
    });

});

function atualizarTamanhoFrase() {
    var frase = $(".frase").text(); //seletor de css que retorna o elemento que eu quero
    var tamanhoFrase = frase.split(" "); // quebra as palavras por espaço
    var numPlavras = tamanhoFrase.length; //tamanho de palavras na frase
    var tamanhoFrase = $("#tamanho-frase"); //pega o span
    tamanhoFrase.text(numPlavras); //passa o num de palavras
}

function inicializaMarcadores() {

    var frase = $(".frase").text();
    campo.on("input", function() {
        var digitado = campo.val();

        var comparavel = frase.substr(0, digitado.length);

        if (digitado == comparavel) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    });

}



function inicializaContadores() {
    campo.on("input", function() {
        var conteudo = campo.val();
        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#contador-palavras").text(qtdPalavras);

        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);
    });
}


function inicializaCronometro() {
    var tempoRestante = $("#tempo-digitacao").text();
    campo.one("focus", function() {
        var cronometroID = setInterval(() => {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante < 1) {
                campo.attr("disabled", true);
                clearInterval(cronometroID);
                finalizaJogo();
            }
        }, 1000);

    });
}

function finalizaJogo() {
    campo.attr('disabled', true);
    campo.toggleClass("campo-desativado");
    inserePlacar();

}

function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.toggleClass("campo-desativado");

    campo.removeClass("borda-vermelha"); //novo
    campo.removeClass("borda-verde"); //novo
}


function atualizaTempoInicial(tempo) {
    tempoInicial = tempo;
    $('#tempo-digitacao').text(tempo);
}