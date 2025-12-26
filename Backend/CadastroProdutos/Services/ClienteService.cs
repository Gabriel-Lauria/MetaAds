using CadastroProdutos.Models;
using Microsoft.EntityFrameworkCore;
using CadastroProdutos.Database;

namespace CadastroProdutos.Services;

public class ClienteService
{
    private readonly ApplicationDbContext _context;

    public ClienteService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Cliente> CriarClienteAsync(string nome, string email)
    {
        var cliente = new Cliente { Nome = nome, Email = email, Ativo = true };
        _context.Clientes.Add(cliente);
        await _context.SaveChangesAsync();
        return cliente;
    }

    public async Task<List<Cliente>> ListarClientesAsync()
    {
        return await _context.Clientes.ToListAsync();
    }

    public async Task<Cliente?> ObterClienteAsync(int id)
    {
        return await _context.Clientes.FindAsync(id);
    }

    public async Task<bool> ExcluirClienteAsync(int id)
    {
        var cliente = await _context.Clientes.FindAsync(id);
        if (cliente == null) return false;

        _context.Clientes.Remove(cliente);
        await _context.SaveChangesAsync();
        return true;
    }
}
