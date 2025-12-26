using Microsoft.EntityFrameworkCore;
using CadastroProdutos.Models;

namespace CadastroProdutos.Database
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Usuario> Usuarios { get; set; } = null!;
        public DbSet<Cliente> Clientes => Set<Cliente>();
        public DbSet<MetaIntegration> MetaIntegrations => Set<MetaIntegration>();
    }
}
