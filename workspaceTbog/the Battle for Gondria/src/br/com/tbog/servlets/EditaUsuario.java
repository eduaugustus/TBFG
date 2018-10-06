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

import br.com.tbog.classes.Criptografia;
import br.com.tbog.classes.Usuario;
import br.com.tbog.conexao.Conexao;
import br.com.tbog.jdbc.JDBCUsuarioDAO;

/**
 * Servlet implementation class EditaUsuario
 */
@WebServlet("/EditaUsuario")
public class EditaUsuario extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public EditaUsuario() {
        super();
        // TODO Auto-generated constructor stub
    }
    
    private void process(HttpServletRequest request, HttpServletResponse response)
    		throws ServletException, IOException  {
    	
    	try {
    		
    		/*Abre uma conexao com o BD*/
    		Conexao conec = new Conexao();
    		Connection conexao = conec.abrirConexao();
    		
    		/*Cria umas instacia da classe JDBCUsuarioDAO com a variável conexao*/
    		JDBCUsuarioDAO jdbcUsuario = new JDBCUsuarioDAO(conexao);
    		
    		/*Cria uma instancia da classe Usuario*/
    		Usuario usuario = new Usuario();
    		
    		/*Seta o apelido do usuário para fazer uma busca das informações dele no BD*/
    		usuario.setApelido(request.getParameter("txt_nick"));
    		Usuario usuariobd = jdbcUsuario.buscarPorUsuario(usuario);
    		
    		/*Cria um hash de campo e valor onde ficará as mensagens para o FrontEnd*/
    		Map<String, String> msg = new HashMap<String, String>();
			
    		/*Pega a senha do usuário vindo do FrontEnd e faz a incripitação dela*/
			String senhaAtualCript = Criptografia.criptografaSenha(request.getParameter("pwd_senha")); 
			
			/*Verifica se a senha do usuário vindo do FrontEnd é condizente com a 
			 * senha do BD*/
			if (senhaAtualCript.equals(usuariobd.getSenha())) {
				
				/*Seta as informações do FrontEnd no objeto usuario*/
				usuario.setId(request.getParameter("txt_id"));
	    		usuario.setApelido(request.getParameter("txt_nick"));
	    		usuario.setNome(request.getParameter("txt_nome"));
	    		usuario.setNascimento(request.getParameter("date_nascimento"));
	    		usuario.setEmail(request.getParameter("txt_email"));
	    		
	    		/*Verifica se a senha do usuário foi altera ou continua a mesma*/
	    		if((request.getParameter("pwd_novaSenha") == "")&&(request.getParameter("pwd_confirmaSenha") == "")){
	    			usuario.setSenha(request.getParameter("pwd_senha"));
	    		}else{
	    			usuario.setSenha(request.getParameter("pwd_novaSenha"));
	    		}
	    		
	    		/*Faz uma busca no BD para verificar se tem algum usuário com o mesmo
	    		 * email já cadastrado*/
	    		Usuario usuariobd_2 = jdbcUsuario.buscarPorUsuario(usuario);
	    		
	    		/*Verifica se tem algum usuário com o mesmo email comparando
	    		 * os ID se for diferente*/
	    		if((usuario.getEmail().equals(usuariobd_2.getEmail()))&&(!usuario.getId().equals(usuariobd_2.getId()))){
        			msg.put("msg", "Há outro usuário com esse E-mail");
        			msg.put("erro", "true");
        			
        		}else{	
        			
        			/*Faz a atualização do usuário*/
        			boolean retorno = jdbcUsuario.atualizarUsuario(usuario);
    	    		if (retorno) {
    		    		msg.put("msg", "Usuário editado com sucesso.");
    		    	} else {
    		    		msg.put("msg", "Não foi possível editar o usuário.");
    		    		msg.put("erro", "true");
    		    	}
        		}
	    		
    		} else {
    			msg.put("msg", "Senha não corresponde com o cadastro");
    			msg.put("erro", "true");
    		}

			/*Fecha a conexão com o BD*/
    		conec.fecharConexao();
    		
    		/*Configura e manda uma resposta ao FrontEnd*/
    		response.setContentType("application/json");
    	   	response.setCharacterEncoding("UTF-8");
    	   	response.getWriter().write(new Gson().toJson(msg));
    		
		} catch (Exception e) {
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
