package br.com.tbog.servlets;

import java.io.IOException;
import java.sql.Connection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import br.com.tbog.classes.Usuario;
import br.com.tbog.conexao.Conexao;
import br.com.tbog.jdbc.JDBCUsuarioDAO;

/**
 * Servlet implementation class CadastraUsuario
 */
@WebServlet("/CadastraUsuario")
public class CadastraUsuario extends HttpServlet {
	
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public CadastraUsuario() {
		super();
		// TODO Auto-generated constructor stub
	}

	private void process(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{

		/*Cria uma instacia da classe Usuario*/
		Usuario usuario = new Usuario();


		try{

			/*Pega os valores que vieram da requisição via AJAX*/
			usuario.setNome(request.getParameter("txt_nome"));
			usuario.setApelido(request.getParameter("txt_nick"));
			usuario.setNascimento(request.getParameter("date_nascimento"));
			usuario.setEmail(request.getParameter("txt_email"));
			usuario.setSenha(request.getParameter("pwd_senha"));

			/*Essa parte do código, pega a data no sistema no dia em que o usuário se cadastrou*/
			Date dataCadastro = new Date(); 
			usuario.setDataCadastro(usuario.converteDateParaStringISO(dataCadastro));

			/*Verifica o tipo de permissão para cadastrar o usuário*/
			if(request.getParameter("txt_fruta").equals("SDFHBSDFABACAXIGHJRW67U356")){
				usuario.setPermissao("0");// Permissão 0 = Jogador
			}else if(request.getParameter("txt_fruta").equals("Y734FG75YG454TANGIRINAGINAHINAFINA5G745GY7")){
				usuario.setPermissao("1");//Permissão 1 = Administrador
			}

			/*Abre uma conexao com o BD*/
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();

			/*Cria umas instacia da classe JDBCUsuarioDAO com a variável conexao*/
			JDBCUsuarioDAO jdbcUsuario = new JDBCUsuarioDAO(conexao);

			/*Busca um usuário com o apelido ou o email iguais no BD*/
			Usuario usuariobd = jdbcUsuario.buscarPorUsuario(usuario);

			/*Cria um Hash de campo e valor para depois ser enviado ao FrontEnd*/
			Map<String, String> msg = new HashMap<String, String>();

			/*Verifica se há algum apelido igual já registrado*/
			if (usuario.getApelido().equals(usuariobd.getApelido())) {
				msg.put("msg", "Esse Nickname já foi cadastrado.");
				msg.put("error", "true");

				/*Verifica se há algum email igual já registrado*/	
			} else if(usuario.getEmail().equals(usuariobd.getEmail())){
				msg.put("msg", "Esse Email já foi cadastrado.");
				msg.put("error", "true");
			}else{

				/*returna uma variável boolean, verificando se foi possível ou não
				 * fazer a inserção de um usuário no BD*/
				boolean retorno = jdbcUsuario.inserir(usuario);
				if (retorno) {
					msg.put("msg", "Usuário cadastrado com sucesso.");
				} else {
					msg.put("msg", "Não foi possível cadastrar o usuário.");
					msg.put("error", "true");
				}
			}

			/*Fecha a conexão com o BD*/
			conec.fecharConexao();

			/*Converte o hash em JSON para enviar ao FrontEnd*/
			String json = new Gson().toJson(msg);

			/*Configura e manda uma resposta ao FrontEnd*/
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(json);

		}catch (IOException e){
			e.printStackTrace();
		}
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		process(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		process(request, response);
	}

}
