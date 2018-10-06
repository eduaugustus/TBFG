package br.com.tbog.servlets;

import java.io.IOException;
import java.sql.Connection;
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
 * Servlet implementation class ExcluiUsuario
 */
@WebServlet("/ExcluiUsuario")
public class ExcluiUsuario extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	protected void process(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException {

		try {
			/*Cria uma instancia da classe Usuario*/
			Usuario usuario = new Usuario();
			
			/*Seta o ID vindo do FrontEnd no objeto usuario*/
			usuario.setId(request.getParameter("id"));
			
			/*Abre uma conexao com o BD*/
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			
			/*Cria umas instacia da classe JDBCUsuarioDAO com a variável conexao*/
			JDBCUsuarioDAO jdbc = new JDBCUsuarioDAO(conexao);
			
			/*Executa o método deletaUsuario*/
			boolean delete = jdbc.deletaUsuario(usuario);
			
			/*Cria um Hash de campo e valor para depois ser enviado ao FrontEnd*/
			Map<String, String> msg = new HashMap<String,String>();
			if(delete == false){
				msg.put("msg", "Erro ao deletar Usuário");
			}else{
				msg.put("msg", "Usuário Deletado com sucesso");
			}

			/*Fecha a conexão com o BD*/
			conec.fecharConexao();
			
			/*Converte o hash em JSON para enviar ao FrontEnd*/
			String json = new Gson().toJson(msg);
			
			/*Configura e manda uma resposta ao FrontEnd*/
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(json);
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}

	}
	public ExcluiUsuario() {
		super();
		// TODO Auto-generated constructor stub
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
		process(request, response);
		// TODO Auto-generated method stub
	}

}
