package br.com.tbog.servlets;

import java.io.IOException;
import java.sql.Connection;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import br.com.tbog.classes.RandomInt;
import br.com.tbog.classes.Usuario;
import br.com.tbog.conexao.Conexao;
import br.com.tbog.jdbc.JDBCUsuarioDAO;

/**
 * Servlet implementation class CadastraPontuacao
 */
@WebServlet("/CadastraPontuacao")
public class CadastraPontuacao extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public CadastraPontuacao() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
    private void process(HttpServletRequest request, HttpServletResponse response) 
    		throws ServletException, IOException {
    	
    	Conexao conec = new Conexao();
    	Connection conexao = conec.abrirConexao();
    	
    	JDBCUsuarioDAO jdbc = new JDBCUsuarioDAO(conexao);
    	
    	Usuario usuarioFront = new Usuario();
    	usuarioFront.setApelido(request.getParameter("apelido"));
    	
    	Usuario usuario = jdbc.buscarPorUsuario(usuarioFront);
    	
    	System.out.println(usuario.getId());
    	if(request.getParameter("teste").equals("0")) {
    		jdbc.inserePontuacao(request.getParameter("fase"),request.getParameter("pontuacao"),usuario,request.getParameter("tempo") );
    	}else {
    		System.out.println("Randomizando");
    		RandomInt ri = new RandomInt();
    		String tempo= "00:"+ ri.anyRandomInt(10, 13)+":"+ri.anyRandomInt(10, 59);
    		String fase= ri.anyRandomInt(1, 4);
    		String pontuacao = ri.anyRandomInt(1, 9999);    		    	
    		boolean result=	jdbc.inserePontuacao(fase, pontuacao, usuario, tempo);
    		
    		conec.fecharConexao();
    		
    		Map<String,String> msg = new HashMap<String,String>();
    		if(result) {
    			msg.put("msg", "Pontua��o cadastrada");
    		}else {
    			msg.put("msg", "Erro ao cadastrar Pontua��o");
    		}
    		
    		
    		String json = new Gson().toJson(msg);
    		response.setContentType("application/json");
    		response.setCharacterEncoding("UTF-8");
    		response.getWriter().write(json);
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
