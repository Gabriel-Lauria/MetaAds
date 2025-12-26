using Microsoft.AspNetCore.Mvc;
using CadastroProdutos.Models;
using CadastroProdutos.Services;
using CadastroProdutos.DTOs;


namespace CadastroProdutos.Controllers
{
    [ApiController]
    [Route("api/usuarios")]
    public class UsuariosController : ControllerBase
    {
        private readonly UsuarioService _service;

        public UsuariosController(UsuarioService service)
        {
            _service = service;
        }

        // GET: api/usuarios
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var usuarios = await _service.ObterTodosAsync();

            // IMPORTANTE: não devolver SenhaHash
            var result = usuarios.Select(u => new
            {
                u.Id,
                u.UsuarioNome,
                u.Role
            });

            return Ok(result);
        }

        // GET: api/usuarios/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var usuario = await _service.ObterPorIdAsync(id);
            if (usuario == null) return NotFound();

            return Ok(new
            {
                usuario.Id,
                usuario.UsuarioNome,
                usuario.Role
            });
        }

        // POST: api/usuarios
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CriarUsuarioDto dto)
        {
            var usuario = await _service.CriarUsuarioAsync(
                dto.UsuarioNome,
                dto.Senha,
                dto.Role
            );

            return Ok(new
            {
                usuario.Id,
                usuario.UsuarioNome,
                usuario.Role
            });
        }

        // PUT: api/usuarios/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] AtualizarUsuarioDto dto)
        {
            var usuarioAtualizado = new Usuario
            {
                UsuarioNome = dto.UsuarioNome,
                Role = dto.Role
            };

            var usuario = await _service.AtualizarUsuarioAsync(
                id,
                usuarioAtualizado,
                dto.NovaSenha
            );

            if (usuario == null) return NotFound();

            return Ok(new
            {
                usuario.Id,
                usuario.UsuarioNome,
                usuario.Role
            });
        }

        // DELETE: api/usuarios/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var sucesso = await _service.RemoverUsuarioAsync(id);
            if (!sucesso) return NotFound();

            return NoContent();
        }
    }
}
