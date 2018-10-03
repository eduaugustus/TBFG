package br.com.tbog.servlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
/**
 * Servlet implementation class Logout
 */
@WebServlet("/Logout")
public class Logout extends HttpServlet {
	private static final long serialVersionUID = 1L;
       	       
	    /**
	     * @see HttpServlet#HttpServlet()
	     */
	    public Logout() {
	        super();
	        // TODO Auto-generated constructor stub
	    }

	    private void process(HttpServletRequest request, HttpServletResponse response) 
	    		throws ServletException, IOException {
	    	
	    	/*Pega a sessão do usuárip*/
	   		HttpSession sessao = request.getSession();
	   		
	   		/*Invalida a sessão do usuário*/
	    	sessao.invalidate();	
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
