package br.com.tbog.servlets;

import java.io.IOException;
import java.sql.Connection;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import br.com.tbog.classes.Pontuacao;
import br.com.tbog.conexao.Conexao;
import br.com.tbog.jdbc.JDBCUsuarioDAO;

/**
 * Servlet implementation class ConsultaRanking
 */
@WebServlet("/ConsultaRanking")
public class ConsultaRanking extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ConsultaRanking() {
        super();
        // TODO Auto-generated constructor stub
    }
    private void process(HttpServletRequest request, HttpServletResponse response) 
    		throws ServletException, IOException {
    	
    	try {
			
    		/*Abre uma conexao com o BD*/
        	Conexao conec = new Conexao();
        	Connection conexao = conec.abrirConexao();
        	
        	/*Cria umas instacia da classe JDBCUsuarioDAO com a variável conexao*/
        	JDBCUsuarioDAO jdbc = new JDBCUsuarioDAO(conexao);
        	
        	/*Método que gera uma lista de pontuções baseado no parâmetro 'fase' vindo do FrontEnd*/
        	List<Pontuacao> listapon = jdbc.consultaRanking(request.getParameter("fase"));
        	
        	/*Método que ordena a lista de pontuções do maior para o menor*/
        	Collections.sort(listapon, Collections.reverseOrder());
        	
        	/*Fecha a conexão com o BD*/
        	conec.fecharConexao();
        	
        	/*Converte o hash em JSON para enviar ao FrontEnd*/
        	String json = new Gson().toJson(listapon);
        	
        	/*Configura e manda uma resposta ao FrontEnd*/
        	response.setContentType("application/json");
        	response.setCharacterEncoding("UTF-8");
        	System.out.println(json.toString());
        	response.getWriter().write(json);
    		
		} catch (Exception e) {
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
