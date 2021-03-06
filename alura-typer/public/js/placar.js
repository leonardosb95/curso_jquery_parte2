function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Leonardo";
    var numPalavras = $("#contador-palavras").text();
    var botaoRemover = `<a href='#'><i class='small material-icons'>delete</i></a>`;


    var linha = novaLinha(usuario, numPalavras);

    linha.find(".botao-remover").click(removeLinha);
    corpoTabela.prepend(linha);

    $('.placar').slideDown(500);
    scrollPlacar();
}

function removeLinha() {
    event.preventDefault();
    //$(this).parent().parent().remove();
    var linha = $(this).parent().parent();
    linha.fadeOut(1000);
    setTimeout(function() {
        linha.remove();
    }, 1000);


}

function scrollPlacar() {
    var posicaoPlacar = $('.placar').offset().top;
    console.log(posicaoPlacar);
    $("html, body").animate({
        scrollTop: posicaoPlacar + "px"
    }, 1000);


}

function novaLinha(usuario, palavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);
    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

$("#botao-placar").click(mostraPlacar);

function mostraPlacar() {
    $(".placar").stop().slideToggle(600);
}