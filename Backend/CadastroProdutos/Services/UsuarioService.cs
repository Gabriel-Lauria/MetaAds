using CadastroProdutos.Database;
using CadastroProdutos.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace CadastroProdutos.Services
{
    public class UsuarioService
    {
        private readonly ApplicationDbContext _db;
        private readonly PasswordHasher<Usuario> _hasher = new();

        public UsuarioService(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<List<Usuario>> ObterTodosAsync()
        {
            return await _db.Usuarios.ToListAsync();
        }

        public async Task<Usuario?> ObterPorUsuarioAsync(string usuarioNome)
        {
            return await _db.Usuarios.FirstOrDefaultAsync(u => u.UsuarioNome == usuarioNome);
        }

        public async Task<Usuario?> ObterPorIdAsync(int id)
        {
            return await _db.Usuarios.FindAsync(id);
        }

        public async Task<Usuario> CriarUsuarioAsync(string usuarioNome, string senha, string role = "cliente")
        {
            var usuario = new Usuario
            {
                UsuarioNome = usuarioNome,
                Role = role
            };
            usuario.SenhaHash = _hasher.HashPassword(usuario, senha);

            _db.Usuarios.Add(usuario);
            await _db.SaveChangesAsync();
            return usuario;
        }

        public async Task<Usuario?> AtualizarUsuarioAsync(int id, Usuario usuarioAtualizado, string? novaSenha = null)
        {
            var usuario = await _db.Usuarios.FindAsync(id);
            if (usuario == null) return null;

            usuario.Role = usuarioAtualizado.Role;
            usuario.UsuarioNome = usuarioAtualizado.UsuarioNome;

            if (!string.IsNullOrEmpty(novaSenha))
            {
                usuario.SenhaHash = _hasher.HashPassword(usuario, novaSenha);
            }

            await _db.SaveChangesAsync();
            return usuario;
        }

        public async Task<bool> RemoverUsuarioAsync(int id)
        {
            var usuario = await _db.Usuarios.FindAsync(id);
            if (usuario == null) return false;

            _db.Usuarios.Remove(usuario);
            await _db.SaveChangesAsync();
            return true;
        }

        public bool ValidarSenha(Usuario usuario, string senha)
        {
            var resultado = _hasher.VerifyHashedPassword(usuario, usuario.SenhaHash, senha);
            return resultado == PasswordVerificationResult.Success;
        }
    }
}
