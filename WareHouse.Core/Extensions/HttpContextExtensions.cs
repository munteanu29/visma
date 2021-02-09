using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using WareHouse.Entities;

namespace WareHouse.Extensions
{
    public static class HttpContextExtensions
    { 
        public static async Task<User> GetCurrentUserAsync(this HttpContext http,
            UserManager<User> userManager)
        {
            var userId = http.GetCurrentUserId();
            if (userId is null)
                return null;
            
            var user = await userManager.FindByIdAsync(userId);
            return user;
        }

        public static string GetCurrentUserId(this HttpContext http)
        {
            var userClaim = http.User.FindFirst("id");
            return userClaim?.Value;
        }
    }
}