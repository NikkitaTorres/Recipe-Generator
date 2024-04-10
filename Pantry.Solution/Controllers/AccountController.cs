using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Pantry.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authorization;

namespace Pantry.Controllers;

[ApiController]
[Route("[controller]")]
public class AccountsController : ControllerBase
{

    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly IConfiguration _configuration;

    public AccountsController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IConfiguration configuration)
    {
        _userManager = userManager; ;
        _signInManager = signInManager;
        _configuration = configuration;
    }
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto user)
    {
        var userExists = await _userManager.FindByEmailAsync(user.Email);
        if (userExists != null)
        {
            return BadRequest(new { status = "error", message = "Email already exists" });
        }

        var newUser = new ApplicationUser() { Email = user.Email, UserName = user.UserName };
        var result = await _userManager.CreateAsync(newUser, user.Password);
        if (result.Succeeded)
        {
            return Ok(new { status = "success", message = "User has been successfully created" });
        }
        else
        {
            return BadRequest(result.Errors);
        }
    }

    [HttpPost("SignIn")]
    public async Task<IActionResult> SignIn(SignInDto userInfo)
    {
        ApplicationUser user = await _userManager.FindByEmailAsync(userInfo.Email);
        if (user != null)
        {
            var signInResult = await _signInManager.PasswordSignInAsync(user, userInfo.Password, isPersistent: false, lockoutOnFailure: false);
            if (signInResult.Succeeded)
            {
                var authClaims = new List<Claim>
            {
               new Claim("UserId", user.Id)
            };

                var newToken = CreateToken(authClaims);

                return Ok(new { status = "success", message = $"{userInfo.Email} signed in", token = newToken });
            }
        }
        return BadRequest(new { status = "error", message = "Unable to sign in" });
    }

   private string CreateToken(List<Claim> authClaims)
{
    if (authClaims == null || authClaims.Count == 0)
    {
        throw new ArgumentException("Auth claims cannot be null or empty.");
    }

    var secret = _configuration["JWT:Secret"];
    if (string.IsNullOrEmpty(secret))
    {
        throw new ArgumentException("JWT secret is missing or empty in the configuration.");
    }

    var issuer = _configuration["JWT:ValidIssuer"];
    if (string.IsNullOrEmpty(issuer))
    {
        throw new ArgumentException("JWT issuer is missing or empty in the configuration.");
    }

    var audience = _configuration["JWT:ValidAudience"];
    if (string.IsNullOrEmpty(audience))
    {
        throw new ArgumentException("JWT audience is missing or empty in the configuration.");
    }

    var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));

    var token = new JwtSecurityToken(
        issuer: issuer,
        audience: audience,
        expires: DateTime.Now.AddHours(3),
        claims: authClaims,
        signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
    );

    return new JwtSecurityTokenHandler().WriteToken(token);
}
}