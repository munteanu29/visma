using System.ComponentModel.DataAnnotations;

namespace WareHouse.Models.Requests
{
    public class UserRegistrationRequest
    {
        [EmailAddress]
        public string Email { get; set; }
        public string Password { get; set; }
        
    }
}