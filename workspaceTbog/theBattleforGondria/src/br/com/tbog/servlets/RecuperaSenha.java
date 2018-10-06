package br.com.tbog.servlets;

import java.io.IOException;
import java.sql.Connection;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import javax.mail.Address;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import br.com.tbog.classes.Criptografia;
import br.com.tbog.classes.NovaSenha;
import br.com.tbog.classes.Usuario;
import br.com.tbog.conexao.Conexao;
import br.com.tbog.jdbc.JDBCUsuarioDAO;

/**
 * Servlet implementation class RecuperaSenha
 */
@WebServlet("/RecuperaSenha")
public class RecuperaSenha extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public RecuperaSenha() {
		super();
		// TODO Auto-generated constructor stub
	}

	protected void process(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException {

		/*pega o email do usuário do FrontEnd e coloca em uma variável*/
		String email = request.getParameter("email");

		/*Cria uma instancia da classe Usuario*/
		Usuario user = new Usuario();

		/*Seta o email do usuário no objeto usuario*/
		user.setEmail(email);

		/*Abre uma conexao com o BD*/
		Conexao conec =  new Conexao();
		Connection conexao = conec.abrirConexao();

		/*Cria umas instacia da classe JDBCUsuarioDAO com a variável conexao*/
		JDBCUsuarioDAO jdbc = new JDBCUsuarioDAO(conexao);

		/*Busca um usuário com o apelido ou o email iguais no BD*/
		Usuario usuariobd = jdbc.buscarPorUsuario(user);
		
		/*Cria um Hash de campo e valor para depois ser enviado ao FrontEnd*/
		Map<String, String> msg = new HashMap<String, String>();

		try{

			/*Verifica se há algum usuário com o email digitado pelo usuário*/
			if(usuariobd == null || usuariobd.getEmail().equals("")) {
				
				msg.put("msg", "nenhum usuário com esse e-mail foi encontrado");
				
			}else {
				
				/*Cria uma instancia da classe NovaSenha*/
				NovaSenha ns = new NovaSenha();
				
				/*Armazena em uma String a nova senha do usuário*/
				String senha= ns.novaSenha();
				
				/*Armazena em uma variável String o texto do email a ser mandado*/
				String texto = "Caro " + usuariobd.getNome() + "\n\nFoi solicitado uma nova senha e esta foi enviada a você: \n"+senha+"\n Atenciosamente, equipe do The battle for gondria";
				
				/*Faz a encriptação da nova senha do usuário*/
				String senhacrip = Criptografia.criptografaSenha(senha);
				
				/*Seta a nova senha do usuário e logo depois atualiza ela no BD*/
				usuariobd.setSenha(senhacrip);
				jdbc.novaSenha(usuariobd);
				
				/*Cria uma instacia da classe Properties*/
				Properties props = new Properties();
				
				/** Parâmetros de conexão com servidor Gmail */
				props.put("mail.smtp.host", "smtp.gmail.com");
				props.put("mail.smtp.socketFactory.port", "587");
				props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
				props.put("mail.smtp.auth", "true");
				props.put("mail.smtp.port", "587");
				props.put("mail.smtp.starttls.enable", "true");

				/*Cria uma sessão com o email do remetente para enviar o email*/
				Session session = Session.getDefaultInstance(props, new javax.mail.Authenticator() {
					protected PasswordAuthentication getPasswordAuthentication() {
						return new PasswordAuthentication("battleforgondria@gmail.com", "CUMM8819");
					}
				});
				
				/** Ativa Debug para sessão*/
				session.setDebug(true);

				/*Cria uma instancia da classe Message com a sessão do remetente */
				Message message = new MimeMessage(session);
				
				/*Seta o remetente do email a ser enviado*/
				message.setFrom(new InternetAddress("battleforgondria@gmail.com"));
				
				/*Seta o destinatario do email a ser enviado*/
				Address[] toUser = InternetAddress.parse(usuariobd.getEmail());
				
				/*Seta as informações no email a ser enviado*/
				message.setRecipients(Message.RecipientType.TO, toUser);
				message.setSubject("Nova senha - Battle For Gondria");//Assunto
				message.setText(texto);
				
				/**Método para enviar a mensagem criada*/
				Transport.send(message);
				msg.put("msg", "E-mail enviado com sucesso!");
			}

		}catch( NullPointerException n) {
			msg.put("msg", "Erro ao achar esse e-mail no banco");
			n.printStackTrace();
		}catch(MessagingException m) {
			msg.put("msg", "Erro no servidor ao mandar nova senha");
			m.printStackTrace();
		}
		
		/*Fecha a conexão com o BD*/
		conec.fecharConexao();
		
		/*Converte o hash em JSON para enviar ao FrontEnd*/
		String json = new Gson().toJson(msg);

		/*Configura e manda uma resposta ao FrontEnd*/
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(json);
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
