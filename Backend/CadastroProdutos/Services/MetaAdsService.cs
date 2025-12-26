using System.Net.Http.Headers;
using Microsoft.Extensions.Configuration;

namespace CadastroProdutos.Services;

public class MetaAdsService
{
    private readonly HttpClient _http;
    private readonly IConfiguration _config;

    public MetaAdsService(HttpClient http, IConfiguration config)
    {
        _http = http;
        _config = config;
    }

    private string BaseUrl =>
        $"https://graph.facebook.com/{_config["Meta:ApiVersion"]}";

    public async Task<string> GetAdAccountsAsync(string accessToken)
    {
        var request = new HttpRequestMessage(
            HttpMethod.Get,
            $"{BaseUrl}/me/adaccounts");

        request.Headers.Authorization =
            new AuthenticationHeaderValue("Bearer", accessToken);

        var response = await _http.SendAsync(request);
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStringAsync();
    }

    public async Task<string> CreateCampaignAsync(
    string accessToken,
    string name,
    string objective)
{
    var adAccountId = _config["Meta:AdAccountId"];

    var url = $"{BaseUrl}/act_{adAccountId}/campaigns";

    var payload = new Dictionary<string, string>
    {
        ["name"] = name,
        ["objective"] = objective,
        ["status"] = "PAUSED",
        ["special_ad_categories"] = "[]"
    };

    var request = new HttpRequestMessage(HttpMethod.Post, url)
    {
        Content = new FormUrlEncodedContent(payload)
    };

    request.Headers.Authorization =
        new AuthenticationHeaderValue("Bearer", accessToken);

    var response = await _http.SendAsync(request);
    var content = await response.Content.ReadAsStringAsync();

    if (!response.IsSuccessStatusCode)
        throw new Exception(content);

    return content;
}

}
