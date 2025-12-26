namespace CadastroProdutos.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        public string UsuarioNome { get; set; } = null!;
        public string SenhaHash { get; set; } = null!;
        public string Role { get; set; } = "cliente";
    }
}
