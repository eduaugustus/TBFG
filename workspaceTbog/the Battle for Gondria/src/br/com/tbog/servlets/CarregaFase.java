package br.com.tbog.servlets;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;

import br.com.tbog.classes.Usuario;
import br.com.tbog.conexao.Conexao;
import br.com.tbog.jdbc.JDBCUsuarioDAO;

/**
 * Servlet implementation class CarregaFase
 */
@WebServlet("/CarregaFase")
public class CarregaFase extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public CarregaFase() {
        super();
        // TODO Auto-generated constructor stub
    }
    
    private void process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
    	
    	try{
    		
    		/*Pega a sessão registrada quando o usuário faz o login*/
			HttpSession sessao = request.getSession();

			/*Cria uma instancia da classe Usuario*/
			Usuario usuario = new Usuario();

			/*Seta no obejto usuario o apelido do usuário*/
			usuario.setApelido(sessao.getAttribute("apelido").toString());
			
			/*Abre uma conexao com o BD*/
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();

			/*Cria umas instacia da classe JDBCUsuarioDAO com a variável conexao*/
			JDBCUsuarioDAO jdbcUsuario = new JDBCUsuarioDAO(conexao); 
			
			/*Busca um usuário com o apelido ou o email iguais no BD*/
			Usuario usuariobd = jdbcUsuario.buscarPorUsuario(usuario);

			/*Busca um usuário com o apelido ou o email iguais no BD*/
			int faseParada = jdbcUsuario.buscaUltimaFase(usuariobd);
			
			
			/*Fecha a conexão com o BD*/
			conec.fecharConexao();

			/*Converte o hash em JSON para enviar ao FrontEnd*/
			String json = new Gson().toJson(faseParada);

			/*Configura e manda uma resposta ao FrontEnd*/
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(json);
			
    	}catch(IOException e){
    		e.printStackTrace();
    	}
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		process(request,response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		process(request,response);
	}

}
