package br.com.tbog.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import java.sql.Connection;
import java.util.List;

import br.com.tbog.classes.Usuario;
import br.com.tbog.conexao.Conexao;
import br.com.tbog.jdbc.JDBCUsuarioDAO;

/**
 * Servlet implementation class ConsultaPorLogin
 */
@WebServlet("/ConsultaPorLogin")
public class ConsultaPorLogin extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	private void process(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException {

		try {
			
			/*Abre uma conexao com o BD*/
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();

			/*Cria umas instacia da classe JDBCUsuarioDAO com a variável conexao*/
			JDBCUsuarioDAO jdbcUsuario = new JDBCUsuarioDAO(conexao);

			/*Método que buscará usuários com o apelido parecido e permissão igual*/
			List<Usuario> listaDeUsuarios = jdbcUsuario.buscarUsuarios(request.getParameter("login"),request.getParameter("permissao"));

			/*Fecha a conexão com o BD*/
			conec.fecharConexao();

			/*Converte o hash em JSON para enviar ao FrontEnd*/
			String json = new Gson().toJson(listaDeUsuarios);
			
			/*Configura e manda uma resposta ao FrontEnd*/
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(json);
			
		} catch (IOException e) {
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
