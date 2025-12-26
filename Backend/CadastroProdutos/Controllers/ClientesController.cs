using CadastroProdutos.Models;
using CadastroProdutos.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CadastroProdutos.Controllers;

[ApiController]
[Route("api/clientes")]
[Authorize]
public class ClientesController : ControllerBase
{
    private readonly ClienteService _service;

    public ClientesController(ClienteService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<IActionResult> Criar([FromBody] Cliente cliente)
    {
        try
        {
            var c = await _service.CriarClienteAsync(cliente.Nome, cliente.Email);
            return Ok(c);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }

    [HttpGet]
    public async Task<IActionResult> Listar()
    {
        try
        {
            var clientes = await _service.ListarClientesAsync();
            return Ok(clientes);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Obter(int id)
    {
        try
        {
            var cliente = await _service.ObterClienteAsync(id);
            if (cliente == null) return NotFound();
            return Ok(cliente);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Excluir(int id)
    {
        try
        {
            var sucesso = await _service.ExcluirClienteAsync(id);
            if (!sucesso) return NotFound(new { message = "Cliente não encontrado" });

            return NoContent(); // 204
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }
}
