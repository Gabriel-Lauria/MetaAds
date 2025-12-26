using CadastroProdutos.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CadastroProdutos.DTOs;

namespace CadastroProdutos.Controllers;

[ApiController]
[Route("api/meta")]
[Authorize] // usa seu JWT atual
public class MetaAdsController : ControllerBase
{
    private readonly MetaAdsService _metaAdsService;

    public MetaAdsController(MetaAdsService metaAdsService)
    {
        _metaAdsService = metaAdsService;
    }

    [HttpGet("adaccounts")]
    public async Task<IActionResult> GetAdAccounts(
        [FromHeader(Name = "X-Meta-Access-Token")] string metaAccessToken)
    {
        if (string.IsNullOrEmpty(metaAccessToken))
            return BadRequest("Informe o access token da Meta");

        var result = await _metaAdsService.GetAdAccountsAsync(metaAccessToken);
        return Ok(result);
    }

    

[HttpPost("campaigns")]
public async Task<IActionResult> CreateCampaign(
    [FromHeader(Name = "X-Meta-Access-Token")] string metaAccessToken,
    [FromBody] CreateCampaignDto dto)
{
    if (string.IsNullOrEmpty(metaAccessToken))
        return BadRequest("Access Token da Meta é obrigatório");

    var result = await _metaAdsService.CreateCampaignAsync(
        metaAccessToken,
        dto.Name,
        dto.Objective);

    return Ok(result);
}

}
