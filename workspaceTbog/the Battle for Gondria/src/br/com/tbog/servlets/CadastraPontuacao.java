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
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;

import br.com.tbog.classes.Pontuacao;
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
    	
    	try {
    		
    		Conexao conec = new Conexao();
        	Connection conexao = conec.abrirConexao();
        	
    		HttpSession sessao = request.getSession();

    		Usuario usuario = new Usuario();

    		usuario.setApelido(sessao.getAttribute("apelido").toString());
    		
        	JDBCUsuarioDAO jdbc = new JDBCUsuarioDAO(conexao);
        	
        	Usuario usuariobd = jdbc.buscarPorUsuario(usuario);
        	
        	Pontuacao pontuacao = new Pontuacao();
        	
        	pontuacao.setPontuacao(request.getParameter("pontuacao"));
        	pontuacao.setFase(request.getParameter("fase"));
        	pontuacao.setTempo(request.getParameter("tempo"));
        	pontuacao.setUsuario(usuariobd.getId());
        	
        	int pontuacaoFase = Integer.parseInt(pontuacao.getPontuacao());
        	int bonusDeTempo = jdbc.somaPontuacaoBonus(pontuacao);
        	
        	String pontuacaoTotal = Integer.toString(pontuacaoFase + bonusDeTempo);
        	pontuacao.setPontuacao(pontuacaoTotal);
        	
        	Pontuacao pontuacaobd = jdbc.buscaPontuacaoPorFase(pontuacao.getFase(), usuariobd.getId());
        	
        	if(pontuacaobd.getFase() == null) {
        		jdbc.cadastraNovaPontucao(pontuacao);
        	}else{
        		
        		int pontFront = Integer.parseInt(pontuacao.getPontuacao());
        		int pontbd = Integer.parseInt(pontuacaobd.getPontuacao())
;        		
        		if(pontFront > pontbd){ 
        			jdbc.atualizaPontuacao(pontuacao);
        		}    			
        		
    		}
        	
        	int[] pontuacoes = new int[2];
        	pontuacoes[0] = Integer.parseInt(pontuacao.getPontuacao()) ;
        	pontuacoes[1] = bonusDeTempo;
        	
        	conec.fecharConexao();
        	
			String json = new Gson().toJson(pontuacoes);

			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(json);
        	
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
