namespace CadastroProdutos.Models;

public class Cliente
{
    public int Id { get; set; }
    public string Nome { get; set; } = null!;
    public string Email { get; set; } = null!;
    public bool Ativo { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Relação com MetaIntegration
    public MetaIntegration? MetaIntegration { get; set; }
}
