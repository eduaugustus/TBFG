package br.com.tbog.servlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;

import br.com.tbog.conexao.Conexao;
import br.com.tbog.jdbc.JDBCUsuarioDAO;
import br.com.tbog.classes.Criptografia;
import br.com.tbog.classes.Usuario;
import java.sql.Connection;
import java.util.HashMap;
import java.util.Map;
/**
 * Servlet implementation class Login
 */
@WebServlet("/Login")
public class Login extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Login() {
        super();
        // TODO Auto-generated constructor stub
    }
    private void process(HttpServletRequest request, HttpServletResponse response)
    		throws ServletException, IOException{
    	
    	try {
    		
    		/*Abre uma conexao com o BD*/
    		Conexao conec = new Conexao();
    		Connection conexao =  conec.abrirConexao();
    		
    		/*Cria umas instacia da classe JDBCUsuarioDAO com a variável conexao*/
    		JDBCUsuarioDAO jusuario = new JDBCUsuarioDAO(conexao);
    		
    		/*Pega as informações que usuário digitou no FrontEnd*/
    		Usuario usuarioFront = new Usuario();
    		usuarioFront.setApelido(request.getParameter("txt_nickname"));
    		usuarioFront.setSenha(request.getParameter("pwd_senha"));
    		
    		/*Faz um busca e coleta as informações para ver se tem usuário que o digitou */
    		Usuario usuariobd = jusuario.buscarPorUsuario(usuarioFront);
    		
    		/*Cria um Hash de campo e valor para depois ser enviado ao FrontEnd*/
    		Map<String, String> msg = new HashMap<String, String>();
    		
    		
    		/*Verifica se o nickname digitado no FrontEnd é igual o do BD*/
    		if (request.getParameter("txt_nickname").equals(usuariobd.getApelido())) {
    			
    			/*Pega a senha do usuário vindo do FrontEnd e faz a incripitação dela*/
    			String senhaFormCript = Criptografia.criptografaSenha(request.getParameter("pwd_senha"));
    			
    			/*Verifica se a senha do usuário vindo do FrontEnd é condizente com a 
    			 * senha do BD*/
    			if (senhaFormCript.equals(usuariobd.getSenha())) {	
    				
    				/*Cria uma sessão para o usuário baseado em seu apelido e sua sessão*/
    				HttpSession sessao = request.getSession();
    				sessao.setAttribute("apelido", usuariobd.getApelido());
    				sessao.setAttribute("permissao", usuariobd.getPermissao());
    				
    				/*Permissão 0 = usuário loga no sistema como jogador*/
    				if(sessao.getAttribute("permissao").equals("0")) {
    					
    					msg.put("url", "system/user/index.html");
    				
					/*Permissão 1 = usuário loga no sistema como admin*/
    				} else {
    					
    					msg.put("url", "system/admin/index.html");
    					
    				}
    				
	    		} else {
	    			msg.put("msg", "Senha não corresponde com o cadastro.");
	    		}
    			
    		} else {	
	    		msg.put("msg", "Usuário não encontrado.");
    		}
    		
    		/*Fecha a conexão com o BD*/
    		conec.fecharConexao();
    		
    		/*Converte o hash em JSON para enviar ao FrontEnd*/
    		String json = new Gson().toJson(msg);
    		
    		/*Configura e manda uma resposta ao FrontEnd*/
    		response.setContentType("application/json");
    		response.setCharacterEncoding("UTF-8");
    		response.getWriter().write(json);
    		System.out.println(json);
    		
    	}catch(Exception e) {
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
