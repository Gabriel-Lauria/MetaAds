namespace CadastroProdutos.DTOs
{
    public class UsuarioUpdateDto
    {
        public string UsuarioNome { get; set; } = string.Empty;
        public string Role { get; set; } = "cliente";
        public string? NovaSenha { get; set; }
    }
}
