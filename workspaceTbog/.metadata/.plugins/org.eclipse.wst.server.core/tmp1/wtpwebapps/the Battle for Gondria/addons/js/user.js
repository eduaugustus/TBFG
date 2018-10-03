/*Função que carrega todo documento HTML, para depois usar as funções JavaScript*/
$(document).ready(function(){

	/*Variável usuada para armazenar um objeto contendo informações do usuário logado*/
	var usuarioLogado;

	/*Variável usada para facilitar a busca de de arquivos pelo projeto*/
	var PATH = "../../";

	/*Função que pega o nascimento vindo do banco de dados e converte no formato ISO*/
	formataDataFrontEnd = function(nascimentoBackEnd){

		var arrayData = nascimentoBackEnd.split("/");

		var dataFormatada = arrayData[2] + "-" + arrayData[1] + "-" + arrayData[0];

		return dataFormatada;

	}

	/*Função que valida a autenticidade do login do usuário*/
	validaUsuario = function(){
		$.ajax({
			type: "POST",
			url: PATH + "ValidaSessao",
			data: "p=0",
			success: function (usuario) {
				if (usuario.apelido!=null){

					usuarioLogado = new Object();
					usuarioLogado.nome = usuario.nome;
					usuarioLogado.apelido = usuario.apelido;
					usuarioLogado.email = usuario.email;
					usuarioLogado.nascimento = usuario.nascimento;
					usuarioLogado.nascimento = formataDataFrontEnd(usuarioLogado.nascimento);
					usuarioLogado.id = usuario.id;
					carregaPagina();
				} else {
					sair();
				}	
			},
			error: function (info) {
				sair();
			}
		});
	}
	/*Chama a função assim que a página(DOM) for carregada*/
	validaUsuario();

	/*Função que chama a servlet para edição das informações do usuário*/
	editaUsuario = function(){
		$.ajax({
			type: "POST",
			url: PATH + "EditaUsuario",
			data: $("#perfilForm").serialize()+"&txt_id="+usuarioLogado.id,
			success: function (msg) {
				$("#atualizaInfo").modal("hide");

				$("#msg").html(msg.msg);
				chamaModal();

				if(!msg.erro){
					validaUsuario();
				}

			},
			error: function (info) {
				$("#msg").html("Erro ao alterar seus dados: "+ info.status + " - " + info.statusText);
				chamaModal();
			}
		});
	}

	/*==============================================
	 * === INICIO - FUNÇÕES ESPECIFICAS DO USER ===
	 * =============================================
	 */

	/*Função que cria o ranking de pontuações e tempo dos jogadores e também 
	 * mostra a pontuação e tempo das fases do jogador logado separadamente*/
	carregaRanking= function(dados){
		
		var u = 0;
		
		var html = "<table id='table_seuranking' class='tabela'>" +
		"<thead>" +
		"<tr>" +
		"<th class='posicao'>Posição</th>" +
		"<th class='nick'>Jogador</th>" +
		"<th class='pontuacao'>Pontuação</th>" +
		"<th class='tempo'> Tempo</th>" +
		"</tr>" +
		"<tbody>" +
		"<tr>";
		
		if(Object.keys(dados).length>0){
			for(var i = 0 ; i<Object.keys(dados).length;i++){
				if(dados[i].usuario == usuarioLogado.apelido){
					html+="<tr>" +
					"<td class='posicao jogadorT'>"+(i+1)+"</td>" +
					"<td class='nick jogadorT'>"+dados[i].usuario+"</td>" +
					"<td class='pontuacao jogadorT'>"+dados[i].pontuacao+"</td>" +
					"<td class='tempo jogadorT'>"+dados[i].tempo+"</td>" +
					"</tr>";
				}else{
					u++;
				}
			}
		}
		
		if(u == Object.keys(dados).length){
			html+="<tr>" +
			"<td colspan='4'>Você não possue pontuação nessa fase ainda</td>" +
			"</tr>"
		}
		
		html += "</tbody>" +
		"</table>"

		html += "<table id = 'table_ranking' class='tabela'>" +
		"<thead>" +
		"<tr>" +
		"<th class='posicao'>Posição</th>" +
		"<th class='nick'>Jogador</th>" +
		"<th class='pontuacao'>Pontuação</th>" +
		"<th class='tempo'> Tempo</th>" +
		"</tr>" +
		"</thead>" +
		"<tbody>";
		
		if(Object.keys(dados).length>0){
			
			for(var i = 0 ; i<Object.keys(dados).length;i++){
				if(dados[i].usuario==""||dados[i].usuario==null||dados[i].usuario==undefined){
				}else{
					html +="<tr>" +
					"<td class='posicao'>"+(i+1)+"</td>" +
					"<td class='nick'>"+dados[i].usuario+"</td>" +
					"<td class='pontuacao'>"+dados[i].pontuacao+"</td>" +
					"<td class='tempo'>"+dados[i].tempo+"</td>" +
					"</tr>";
				}
			}
			
		}else{
			html+="<tr>" +
			"<td colspan='4'>Você não têm pontuação nessa fase</td>" +
			"</tr>"
		}
		html+="</tbody>" +
		"</table>"
		$("#div_ranking").html(html);
		$("#table_ranking").dataTable({
			"pageLength": 10,
			"bFilter" : false,               
			"bLengthChange": false
		});
		$("#table_seuranking").dataTable({
			"bFilter" : false,               
			"bLengthChange": false,
			"pagination":false
		});
	}


	/*Função que consulta as pontuações e tempo dos jogadores em cada fase
	 * e também a soma de todas elas*/
	consultaRanking = function(i){
		$.ajax({
			type:"POST",
			data:"fase="+i,
			url: PATH+"ConsultaRanking",
			success:function(msg){
				carregaRanking(msg);
			}
		});
	}

	/*============================================================*/
	Randomiza = function(){
		$.ajax({
			type:"POST",
			url: PATH+"CadastraPontuacao",
			data:"teste=1&&apelido="+usuarioLogado.apelido,
			success: function(msg){
				alert(msg.msg);
			}
		})
	}

	/*==============================================
	 * ==== FIM - FUNÇÕES ESPECIFICAS DO USER =====
	 * =============================================
	 */



	/*Função que carrega os dados das páginas quando ativas*/
	carregaDados = function(pagename){
		switch(pagename){
		case 'main':
			document.title = 'Início';
			break;
		case "perfil":
			document.title = 'Perfil';
			$("#nomeLogado").val(usuarioLogado.nome);
			$("#emailLogado").val(usuarioLogado.email);
			$("input[type='date']").val(usuarioLogado.nascimento);
			$("#nicknameLogado").val(usuarioLogado.apelido);

			/*Modal de Editar perfil*/
			$("#nomeUpdate").val(usuarioLogado.nome);
			$("#emailUpdate").val(usuarioLogado.email);
			$("#nascimentoUpdate").val(usuarioLogado.nascimento);
			$("#nicknameUpdate").val(usuarioLogado.apelido);
			$("#senha").val("");
			$("#novaSenha").val("");
			$("#confirmaSenha").val("");

			console.log("============= - 2");
			console.log(usuarioLogado);
			console.log("============= - 2");

			break;
		case "ranking":
			document.title = 'Ranking';
			consultaRanking(0);
			break;
		case "contato":
			document.title = 'Contato';
			/*Função que abre as informações dos desenvolvedores */
			$("#img_cabral").click(function(){
				$("#div_cabralInfo").toggle(2000);
			});

			$("#img_eduardo").click(function(){
				$("#div_eduardoInfo").toggle(2000);
			});

			$("#img_nones").click(function(){
				$("#div_nonesInfo").toggle(2000);
			});
			break;
		case 'jogo':
			document.title = 'Jogo';
			break;
		}
	}

	/*Função que carrega as páginas dinâmicamente e carregando seus respectivos dados, mantendo
	 * o cabeçalho e também o rodapé*/
	carregaPagina= function(){
		var pagename = window.location.search.substring(1);
		if (pagename==''){
			pagename='main';
		}  
		$('#content').load(pagename+'.html', function(response, status, info) {

			if (status == "error") {
				var msg = "Houve um erro ao encontrar a página: "+ info.status + " - " + info.statusText;
				$("#content").html(msg);
			}else{
				carregaDados(pagename);
			}
		});
	}

	/*Função que invalida a sessão de um usuário*/
	sair = function(){
		$.ajax({
			type: "POST",
			url: PATH + "Logout",
			success: function (data) {
				window.location.href = (PATH+"index.html");	
			},
			error: function (info) {
				alert("Erro ao tentar encerrar sua sessão: "+ info.status + " - " + info.statusText);	
			}
		});
	}


	/*Função que faz a atualização dos dados do jogador */
	validaPerfil = function() {
		if(validaCampo('#nicknameUpdate')&&validaCampo('#nomeUpdate')&&validaCampo('#emailUpdate')&&validaCampo('#nascimentoUpdate')){
			var dataAtual = pegaDataAtual();
			var nasc = $("#nascimentoUpdate").val();
			if(moment(nasc).isAfter(dataAtual)){
				$('#msg').html("Não é permitido cadastrar uma data de nascimento futura");
				chamaModal();
				return false;
			}else if(validaCampo('#senha')){
				if((validaCampo('#novaSenha'))&&(validaCampo('#confirmaSenha'))){
					if($("#senha").val() == $("#novaSenha").val()){
						$('#msg').html("Os campos senha e nova senha não podem ser iguais");
						chamaModal();
						return false;
					}else if($('#novaSenha').val() != $('#confirmaSenha').val()){
						$('#msg').html("Nova senha e Confirma Senha não são iguais!");
						chamaModal();
						return false;
					}else if(($('#novaSenha').val() == $('#confirmaSenha').val()) != $('#senha')){
						editaUsuario();
					}
				}else if(($("#novaSenha").val() == "") && ($("#confirmaSenha").val() == "")){
					editaUsuario();
				}else{
					$('#msg').html("Campos de nova senha ou confirma senha não são iguais ou estão em branco");
					chamaModal();
				}
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

	/*Função que chama a abertura de uma modal como callback*/
	chamaModal = function(){
		$("#msgModal").modal();
	}

	/*Função que pega a hora do sistema e converte no formato ISO*/
	pegaDataAtual = function(){
		var hoje = moment().format("YYYY-MM-DD"); 
		return hoje;
	}


});


