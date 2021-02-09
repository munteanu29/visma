using System.Threading.Tasks;
using WareHouse.Entities;
using WareHouse.Models;
using WareHouse.Models.Requests;

namespace WareHouse.Services
{
    public interface IIdentityService
    {
        Task<AuthenticationResult> RegisterAsync(UserRegistrationRequest request);
        Task<AuthenticationResult> LoginAsync(string email, string password);
        Task<AuthenticationResult> UpdateAsync(User user, UserUpdateRequest request);
    }
}