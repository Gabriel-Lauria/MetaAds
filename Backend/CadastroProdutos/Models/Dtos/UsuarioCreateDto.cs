namespace CadastroProdutos.DTOs
{
    public class UsuarioCreateDto
    {
        public string UsuarioNome { get; set; } = string.Empty;
        public string Senha { get; set; } = string.Empty;
        public string Role { get; set; } = "cliente";
    }
}
