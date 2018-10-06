package br.com.tbog.jdbcinterfaces;


import java.util.List;

import br.com.tbog.classes.Pontuacao;
import br.com.tbog.classes.Usuario;

public interface UsuarioDAO {
	
	/*Interface buscarPorUsuario que define acesso e manipulação do BD*/
	public Usuario buscarPorUsuario(Usuario usuariobd);
	
	/*Interface inserir que define acesso e manipulação do BD*/
	public boolean inserir(Usuario usuario);
	
	/*Interface buscarUsuarios que define acesso e manipulação do BD*/
	public List<Usuario> buscarUsuarios(String login, String permissao);
	
	/*Interface consultaRanking que define acesso e manipulação do BD*/
	public List<Pontuacao> consultaRanking(String fase);
	
	/*Interface inserePontuacao que define acesso e manipulação do BD*/
	public boolean inserePontuacao(String fase, String pontuacao, Usuario usuario, String tempo);
	
	/*Interface atualizarUsuario que define acesso e manipulação do BD*/
	public boolean atualizarUsuario(Usuario usuarioFrontEnd);
	
	/*Interface novaSenha que define acesso e manipulação do BD*/
	public void novaSenha(Usuario usuariobd);
	
	/*Interface deletaUsuario que define acesso e manipulação do BD*/
	public boolean deletaUsuario(Usuario usuario);
	
}
