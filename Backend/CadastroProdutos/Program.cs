using System.Text;
using CadastroProdutos.Database;
using CadastroProdutos.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// JWT
var jwtConfig = builder.Configuration.GetSection("Jwt");
var key = Encoding.ASCII.GetBytes(jwtConfig["Key"]!);


// Meta Ads
builder.Services.AddHttpClient();
builder.Services.AddScoped<MetaAdsService>();
builder.Services.AddScoped<ClienteService>();


// Services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite("Data Source=Usuarios.db"));

// Registrar UsuarioService
builder.Services.AddScoped<UsuarioService>();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Autenticação JWT
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtConfig["Issuer"],
        ValidAudience = jwtConfig["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(key)
    };
});

var app = builder.Build();

// Middleware CORS deve vir antes de qualquer endpoint
app.UseCors("ReactApp");

await CriarUsuariosIniciais(app.Services);

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
  
app.Run();

// Criar usuários iniciais
static async Task CriarUsuariosIniciais(IServiceProvider services)
{
    using var scope = services.CreateScope();
    var usuarioService = scope.ServiceProvider.GetRequiredService<UsuarioService>();

    if (await usuarioService.ObterPorUsuarioAsync("admin") == null)
        await usuarioService.CriarUsuarioAsync("admin", "1234", "admin");

    if (await usuarioService.ObterPorUsuarioAsync("cliente") == null)
        await usuarioService.CriarUsuarioAsync("cliente", "1234", "cliente");
}