namespace CadastroProdutos.Models;

public class MetaIntegration
{
    public int Id { get; set; }
    public int ClienteId { get; set; }
    public string AdAccountId { get; set; } = null!;
    public string AccessTokenEncrypted { get; set; } = null!;
    public DateTime TokenExpiresAt { get; set; }
    public string AppId { get; set; } = null!;
    public string PageId { get; set; } = null!;
    public bool Ativo { get; set; } = true;

    // Relação inversa
    public Cliente Cliente { get; set; } = null!;
}
