using CadastroProdutos.Models;
using Microsoft.EntityFrameworkCore;
using CadastroProdutos.Database;

namespace CadastroProdutos.Services;

public class ClienteService
{
    private readonly ApplicationDbContext _db;

    public ClienteService(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<Cliente> CriarClienteAsync(string nome, string email)
    {
        var cliente = new Cliente { Nome = nome, Email = email };
        _db.Clientes.Add(cliente);
        await _db.SaveChangesAsync();
        return cliente;
    }

    public async Task<List<Cliente>> ListarClientesAsync()
        => await _db.Clientes.Include(c => c.MetaIntegration).ToListAsync();

    public async Task<Cliente?> ObterClienteAsync(int id)
        => await _db.Clientes.Include(c => c.MetaIntegration)
                             .FirstOrDefaultAsync(c => c.Id == id);
}
