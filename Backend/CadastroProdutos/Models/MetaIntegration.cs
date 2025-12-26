namespace CadastroProdutos.Models;

public class MetaIntegration
{
    public int Id { get; set; }
    public string AdAccountId { get; set; } = string.Empty;
    public string AccessToken { get; set; } = string.Empty;
    public DateTime? ExpiresAt { get; set; }
    public int ClienteId { get; set; }
    public Cliente Cliente { get; set; } = null!;

    // Relação inversa
    
}
