/*Função que carrega todo documento HTML, para depois usar as funções JavaScript*/
$(document).ready( function(){

	/*Função que carrega as páginas dinâmicamente e carregando seus respectivos dados, mantendo
	 * o cabeçalho e também o rodapé*/
	carregaPagina= function(){

		var pagename = window.location.search.substring(1);  
		if (pagename==''){
			pagename='main';
		}

		$('#content').load('system/guest/'+pagename+'.html', function(response, status, info) {
			if (status == 'error') {
				var msg = 'Houve um erro ao encontrar a página: '+ info.status +  ' - '  + info.statusText;
				$('#content').html(msg);
			}else{
				carregaDados(pagename);
			}
		});
	}
	
	/*Função que cria o ranking de pontuações e tempo dos jogadores*/
	criaTabelaRanking= function(dados){
		var html = '<table id="table_ranking">' +
		'<thead>' +
		'<tr>' +
		'<th class="posicao">Posição</th>' +
		'<th class="nick">Jogador</th>' +
		'<th class="pontuacao">Pontuação</th>' +
		'<th class="tempo"> Tempo</th>' +
		'</tr>' +
		'</thead>' +
		'<tbody>';
		if(Object.keys(dados).length>0){
			for(var i = 0 ; i<Object.keys(dados).length;i++){
				if(dados[i].usuario==''||dados[i].usuario==null||dados[i].usuario==undefined){
				}else{
					html += '<tr>' +
					'<td class="posicao">' + (i+1) + '</td>' +
					'<td class="nick">' + dados[i].usuario + '</td>' +
					'<td class="pontuacao">' + dados[i].pontuacao + '</td>' +
					'<td class="tempo">' + dados[i].tempo + '</td>' +
					'</tr>';
				}
			}
		}else{

			html+='<tr>' +
			'<td colspan="4">Nenhum usuário foi encontrado com pontuação nessa fase</td>' +
			'</tr>'

		}
		
		html += '</tbody>' +
		'</table>'
		$('#div_ranking').html(html);
		$('#table_ranking').dataTable({
			'pageLength': 10,
			'bFilter' : false,               
			'bLengthChange': false
		});
	}
	
	/*Função que chama a servlet os dados para criar o ranking*/
	carregaRanking = function(i){
		$.ajax({
			type:'POST',
			data:'fase='+i,
			url:'ConsultaRanking',
			success:function(msg){
				criaTabelaRanking(msg);
			}
		})
	}

	/*Função que carrega os dados das páginas quando ativas*/
	carregaDados = function(pagename){
		switch(pagename){
		case 'main':
			document.title = 'Início';
			break;
		case 'cadastro':
			document.title = 'Cadastro';
			break;
		case 'ranking':
			document.title = 'Ranking';
			carregaRanking(0);
			break;
		case 'contato':
			document.title = 'Contato';
			/*Funções que abrem as informações dos desenvolvedores */
			$('#img_cabral').click(function(){
				$('#div_cabralInfo').toggle(2000);
			});

			$('#img_eduardo').click(function(){
				$("#div_eduardoInfo").toggle(2000);
			});

			$('#img_nones').click(function(){
				$('#div_nonesInfo').toggle(2000);
			});
			break;
		}
	}

	/*Função que coleta os dados do usuário para fazer o login. Assim posibilitando
	 * a entrada como usuário jogador ou usuário administrador*/
	autenticaLogin=function(){
		$.ajax({
			type:'POST' ,
			url: 'Login',			
			data: $('#frmLog').serialize(),
			datatype: 'json',
			success: function (msg) {
				if (msg.msg!=null){
					$('#msg').html(msg.msg);
					chamaModal();

				}else if(msg.url!=null){
					window.location.replace(msg.url);				
				}

			},
			error: function (info) {
				alert(JSON.stringify(info));
				alert('Erro ao tentar login: ' + info.status + ' - ' + info.statusText);		   
			},
		});
	}

	/*Função que chama a servlet para fazer o cadastro dos usuários*/
	cadastro = function(){
		$.ajax({
			type: 'POST',
			url: 'CadastraUsuario',
			data: $('#cadastraForm').serialize()+'&txt_fruta=SDFHBSDFABACAXIGHJRW67U356',
			success: function(msg){
				if(!msg.error){
					carregaPagina();
				}
				$('#msg').html(msg.msg);
				chamaModal();

				if(msg.msg.equals('Usuário cadastrado com sucesso.'))
					window.location.replace();
			},
			error: function(info){

				$('#msg').html('Erro ao cadastrar um novo jogador: ' + info.status + ' - ' + info.statusText);
				chamaModal();
			}
		});
	}


	/*Função que faz a validação do cadastro*/
	validaCadastro= function(){
		if(validaCampo('#nome')&&validaCampo('#nickname')&&validaCampo('#nascimento')&&validaCampo('#senha')&&validaCampo('#email')&&validaCampo('#confirmaSenha')&&validaCampo('#confirmaEmail')){
			var dataAtual = pegaDataAtual();
			var nasc = $('#nascimento').val();
			if(moment(nasc).isAfter(dataAtual)){
				$('#msg').html('Não é permitido cadastrar uma data de nascimento futura');
				chamaModal();
				return false;
			}else if (($('#email').val()==$('#confirmaEmail').val())){

				if ($('#confirmaSenha').val()==$('#senha').val()){
					cadastro();
				}else{
					$('#msg').html('Os campos de senha e confirma senha não tem o mesmo valor');
					chamaModal();
					return false;
				}

			}else{
				$('#msg').html('Os campos de e-mail não tem o mesmo valor');
				chamaModal();
				return false;
			}

		}else
			return false;
	}

	/*Função que chama a servlet de recuperação de senha*/
	esqueceuSenha = function(){
		var email =$('#email').val();
		$('#EsqueciSenha').modal('hide');
		$.ajax({
			type:'POST',
			data:'email='+email,
			url:'RecuperaSenha',
			success: function(dados){
				$('#msg').html(dados.msg);
				chamaModal();
			}
		})
	}
	
	/*Função que faz a validação da modal de recuperação de senha*/
	validaEsqueci = function() {
		if(validaCampo('#email')){
			esqueceuSenha();
		}
		return false;
	}

	/*Função que faz a validação dos campos do Login*/
	validaLogin = function() {
		if(validaCampo('#nicknameLog')&&validaCampo('#senhaLog')){
			autenticaLogin();
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
		$('#msgModal').modal();
	}

	/*Função que pega a hora do sistema e converte no formato ISO*/
	pegaDataAtual = function(){
		var hoje = moment().format('YYYY-MM-DD'); 
		return hoje;
	}

	/*Função que carrega as páginas*/
	carregaPagina();
});




