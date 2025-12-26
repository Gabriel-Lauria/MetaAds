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
        var c = await _service.CriarClienteAsync(cliente.Nome, cliente.Email);
        return Ok(c);
    }

    [HttpGet]
    public async Task<IActionResult> Listar()
    {
        var clientes = await _service.ListarClientesAsync();
        return Ok(clientes);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Obter(int id)
    {
        var cliente = await _service.ObterClienteAsync(id);
        if (cliente == null) return NotFound();
        return Ok(cliente);
    }
}
