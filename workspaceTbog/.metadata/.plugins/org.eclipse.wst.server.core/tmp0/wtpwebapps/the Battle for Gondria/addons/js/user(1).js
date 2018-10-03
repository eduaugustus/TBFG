/*Função que faz a atualização dos dados do jogador */
validaPerfil = function() {
    //linha abaixo valida se todos os campos menos os de nova senha e confirmação preeenchidos
    if(validaCampo('#nicknameUpdate')&&validaCampo('#nomeUpdate')&&validaCampo('#emailUpdate')&&validaCampo('#nascimentoUpdate')){
            if(validaCampo('#senha')){
            // linha abaixo valida se os campos de nova senha est~ao preenchidos
                if(validaCampo('#novaSenha')&&validaCampo('#confirmaSenha')){
                    if($('#novaSenha').val() == $('#confirmaSenha').val()){
                        return true;
                    }else{
                        alert("Os campos de nova senha não tem os mesmo valor");
                        $('#novaSenha').focus();
                        return false;
                    }
                }
            return false;
        }else{
            $('#senha').focus();
            return false;
        }
    }else{
        return false;
    }
}

/*Função que faz a validação dos campos vazios*/
validaCampo = function(nome){
    if($(nome).val()==""){
        $(nome).focus();
        return false;
    }else{
        return true;
    }
}

/*Função que abre as informações dos desenvolvedores */
$(document).ready(function(){

    $("#img_cabral").click(function(){
        $("#div_cabralInfo").toggle(2000);
    });

    $("#img_eduardo").click(function(){
        $("#div_eduardoInfo").toggle(2000);
    });

    $("#img_nones").click(function(){
        $("#div_nonesInfo").toggle(2000);
    });

});