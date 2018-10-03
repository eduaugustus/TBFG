/*Função que carrega todo documento HTML, para depois usar as funções JavaScript*/
$(document).ready(function(){

	/*Variável usuada para armazenar um objeto contendo informações do usuário logado*/
	var usuarioLogado;

	/*Variável usada para facilitar a busca de de arquivos pelo projeto*/
	var PATH = '../../';
	
	/*Função que pega o nascimento vindo do banco de dados e converte no formato ISO*/
	formataDataParaSringISO = function(nascimentoBackEnd){

		var arrayData = nascimentoBackEnd.split("/");

		var dataFormatada = arrayData[2] + "-" + arrayData[1] + "-" + arrayData[0];

		return dataFormatada;

	}
	

	/*Função que valida a autenticidade do login do usuário*/
	validaUsuario = function(){
		$.ajax({
			type: "POST",
			url: PATH + "ValidaSessao",
			data: "p=1",
			success: function (usuario) {
				if (usuario.apelido!=null){
					usuarioLogado = new Object();
					usuarioLogado.nome = usuario.nome;
					usuarioLogado.apelido = usuario.apelido;
					usuarioLogado.email = usuario.email;
					console.log(usuario.nascimento);
					usuarioLogado.nascimento = formataDataParaSringISO(usuario.nascimento);
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
	
	/*Função que carrega as páginas dinâmicamente e carregando seus respectivos dados, mantendo
	 * o cabeçalho e também o rodapé*/
	carregaPagina= function(){
		var pagename = window.location.search.substring(1);  
		if (pagename==''){
			pagename='main';
		}

		$('#content').load(pagename+'.html',function(response, status, info) {
			if (status == "error") {
				var msg = "Houve um erro ao encontrar a página: "+ info.status + " - " + info.statusText;
				$("#content").html(msg);
			}else{
				carregaDados(pagename);
			}
		})
	}
	
	/*Função que carrega os dados das páginas quando ativas*/
	carregaDados= function(pagename){
		switch(pagename){
		case "controle":
			document.title = 'Controle';
			var login=$("#input_consultar").val();
			consultaUsuario(pagename,0,login);
			break;
		case "cadastro":
			document.title = 'Cadastro';
			consultaUsuario(pagename,1,"");
			break;
		case "main":
			document.title = 'Gráficos';
			constChart();
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
			break;	
		}
	}

	/*Função que chama a servlet para fazer o cadastro dos usuários*/
	cadastro = function(){
		$.ajax({
			type: "POST",
			url: PATH+"CadastraUsuario",
			data: $("#cadastraForm").serialize()+"&txt_fruta=Y734FG75YG454TANGIRINAGINAHINAFINA5G745GY7",
			success: function(msg){
				if(!msg.error){
					carregaPagina();
				}
				$("#msg").html(msg.msg);
				chamaModal();
			},
			error: function(info){

				$("#msg").html("Erro ao cadastrar um novo jogador: "+ info.status + " - " + info.statusText);
				chamaModal();
			}
		});
	}

	/*Função que chama a servlet para edição das informações do usuário*/
	editaUsuario = function(){
		$.ajax({
			type: "POST",
			url: PATH + "EditaUsuario",
			data: modalPerfil.serialize()+"&txt_id="+usuarioLogado.id+"&txt_nickAntigo="+usuarioLogado.apelido,
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

	/*Função que faz a validação do cadastro*/
	validaCadastro= function(){
		if(validaCampo('#nome')&&validaCampo('#nickname')&&validaCampo('#nascimento')&&validaCampo('#senha')&&validaCampo('#email')&&validaCampo('#confirmaSenha')&&validaCampo('#confirmaEmail')){
			var dataAtual = pegaDataAtual();
			var nasc = $("#nascimento").val();
			if(moment(nasc).isAfter(dataAtual)){
				$('#msg').html("Não é permitido cadastrar uma data de nascimento futura");
				chamaModal();
				return false;
			}else if (($('#email').val()==$('#confirmaEmail').val())){

				if ($('#confirmaSenha').val()==$('#senha').val()){
					cadastro();
				}else{
					$('#msg').html("Os campos de senha e confirma senha não tem o mesmo valor");
					chamaModal();
					return false;
				}

			}else{
				$('#msg').html("Os campos de e-mail não tem o mesmo valor");
				chamaModal();
				return false;
			}

		}else
			return false;
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

	/*Função que chama a abertura de uma modal como callback*/
	chamaModal = function(){
		$("#msgModal").modal();
	}

	/*Função que pega a hora do sistema e converte no formato ISO*/
	pegaDataAtual = function(){
		var hoje = moment().format("YYYY-MM-DD"); 
		return hoje;
	}

	/*==============================================
	 * === INICIO - FUNÇÕES ESPECIFICAS DO ADMIN ===
	 * =============================================
	 */
	
	/*Função que carrega e mostra os administradores cadastrados*/
	carregaCadastro = function(usuarios) { 
		var html="<table id='table_adms''>" +
		"<thead>" +
		"<tr>" +
		"<th>Nome</th>" +
		"<th>Apelido</th>" +
		"<th>E-mail</th>" +
		"<th>Ação</th>" +
		"<tr>" +
		"</thead>" +
		"<tbody>";
		if(usuarios!=undefined&&usuarios!=null){
			for(var i=0;Object.keys(usuarios).length>i;i++){
				html +="<tr>" +
				"<td id='nome_ADM td_BanNick'>"+usuarios[i].nome+"</td>" +
				"<td id='apelido_ADM'>"+usuarios[i].apelido+"</td>" +
				"<td id='email_ADM'>"+usuarios[i].email+"</td>" +
				"<td>" +
				"<button class='btn btn-danger' type='button' id='btn_excluir' onclick='exibirExclusaoDeUsuario("+usuarios[i].id+")'>Excluir</button>" +
				"</td>" +
				"</tr>";
			}
		}else{
			html+="<tr><td colspan='4'>Nenhum ADM encontrado</td></tr>"
		}
		html+="</tbody></table>";
		$("#table_cadastro").html(html);
		
	
	}

	/*Função que carrega os jogador(es) que um administrador pretende banir*/
	carregaControle= function(usuarios){
		var html="<table>" +
		"<thead>" +
		"<tr>" +
		"<th>Apelido</th>" +
		"<th>Nome</th>" +
		"<th>E-mail</th>" +
		"<th>Data de Nascimento</th>" +
		"<th>Ação</th>" +
		"<tr>" +
		"</thead>" +
		"<tbody>";
		if(usuarios!=undefined&&usuarios!=null&&usuarios!=""){
			for(var i=0;Object.keys(usuarios).length>i;i++){
				html +="<tr>" +
				"<td id='td_BanNick'>"+usuarios[i].apelido+"</td>" +
				"<td>"+usuarios[i].nome+"</td>" +
				"<td>"+usuarios[i].email+"</td>" +
				"<td>"+usuarios[i].nascimento+"</td>" +
				"<td>" +
				"<button class='btn btn-danger' type='button' id='btn_excluir' onclick='exibirExclusaoDeUsuario("+usuarios[i].id+")'>Excluir</button>" +
				"</td>" +
				"</tr>";
			}
		}else{
			html+="<tr><td colspan='5'>Nenhum usuário encontrado</td></tr>"
		}
		html+="</tbody></table>";
		$("#div_jogador").html(html);
	}
	
		/*Função que monta a moda 'msgModal' com informações para o admin banir*/
		exibirExclusaoDeUsuario = function(id){
			
			var nickBan = "";
			nickBan = $("#td_BanNick").text();
			$("#div_banido").html("<h6 id='h6_jogadorBanido'>Deseja excluír o usuário " + nickBan + "?</h6>");
			
			$("#modalExcluir").html(
					"<div class='modal-footer' id='excluirUser'>" +
					"<button class='btn btn-danger' type='button' id='btn_excluir' onclick='excluiUsuario("+id+")'>Excluir</button>"+
					"</div>");
			
			$("#exclui_usuario").modal();
		}
		
	/*Função que chama a servlet para excluir um usuário*/
	excluiUsuario = function(id){
		$("#exclui_usuario").modal('hide');
		
			$.ajax({
				type:'POST',
				data: 'id='+id,
				url: PATH + 'ExcluiUsuario',
				success: function(msg){
					$('#msg').html(msg.msg);
					$('#msgModal').modal();
					carregaDados('controle');
					carregaPagina();
				},
				error: function(info){
					$('#msg').html('Erro -' + info);
					$('#msgModal').modal();
				}
			});
	}
	
	/*Função que carrega as informações do(s) usuário(s)*/
	consultaUsuario = function(pagename,permissao,login){
		if((login==""||login==undefined)){
			login=null;
		}
		if(pagename=="cadastro")
			login=""
				if(login!=null){
					$.ajax({
						type: "POST",
						url: PATH+"ConsultaPorLogin",
						data: 'permissao='+permissao+'&&login='+login,
						success: function(usuarios){
							switch(pagename){
							case "controle":
								carregaControle(usuarios);
								break;
							case "cadastro":
								carregaCadastro(usuarios);
								break;
							}
						}
					})
				}else{
					carregaControle(null);
				}
	}	

	/*Variáveis que se tornam um array para armazenar informções dos gráficos*/
	var cadastros = new Array();
	var ativos = new Array();

	/*Função que armazena os dados dos relatórios nas variáveis (array) em ordem de 
	 * Janeiro a Dezembro (0 a 11) */
	arrumaDadosChart = function(listaDeRelatorios){
		if((listaDeRelatorios != undefined) && (listaDeRelatorios != null)){

			for(var i = 0 ; i < Object.keys(listaDeRelatorios).length; i++){

				if(parseInt(listaDeRelatorios[i].mes)){
					cadastros.push(listaDeRelatorios[i].numeroCadastros);
				}

				if(parseInt(listaDeRelatorios[i].mes)){
					ativos.push(listaDeRelatorios[i].numeroVisitas);
				}

			}
		}

	}

	/*Função que constroi os gráficos para visualização dos dados mensais*/
	drawCharts = function(cadastros, ativos){

		var ctx = $('#canvas_ativos');

		new Chart(ctx, {
			type: 'bar',
			data: {
				labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set',
					'Out', 'Nov', 'Dez'],
					datasets: [{
						label: 'Acessos Mensais',
						backgroundColor: 'rgb(0, 0, 0)',
						borderColor: 'rgb(255, 255, 255)',
						data: cadastros,
					}]
			},
			options: {
				title:{
					display: true,
					fontsize: '20',
					text: 'Relatório de acessos mensais'
				}
			}
		});

		var ctx = $('#canvas_cadastrados');

		new Chart(ctx, {
			type: 'bar',
			data: {
				labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set',
					'Out', 'Nov', 'Dez'],
					datasets: [{
						label: 'Cadastros Mensais',
						backgroundColor: 'rgb(0, 0, 255)',
						borderColor: 'rgb(255, 255, 255)',
						data: ativos,
					}]
			},
			options: {
				title:{
					display: true,
					fontsize: '20',
					text: 'Relatório de cadastros mensais'
				}
			}
		});

	}
	
	/*Função que chama a servlet com os dados vindo do bd para construção dos gráficos*/
	constChart = function(){
		$.ajax({
			type: 'POST',
			url: PATH + "ConstroiCharts",
			success: function(listaDeRelatorios){

				arrumaDadosChart(listaDeRelatorios);

				console.log(listaDeRelatorios);

				drawCharts(cadastros, ativos);
			},
			error: function(info){
				$('#msg').html("Error " + info);
				chamaModal();
			}
		});
	}

	/*==============================================
	 * ==== FIM - FUNÇÕES ESPECIFICAS DO ADMIN =====
	 * =============================================
	 */

});


