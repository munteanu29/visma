using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WareHouse.Data;
using WareHouse.Entities;
using WareHouse.Extensions;
using WareHouse.Models;

namespace WareHouse.API.Controllers
{
    [Route("/api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Produces("application/json")]
    [ProducesResponseType(typeof(UnauthorizedResult), 401)]
    public class CustomerController: Controller
    {
        
          private readonly IRepository<CustomersEntity> _customerEntity; 
        public CustomerController(ApplicationDbContext context)
        {
            _customerEntity = context.GetRepository<CustomersEntity>();
        }
        
        [HttpPost("AddCustomer")]
        public async Task<IActionResult> AddCustomer([FromBody] CustomerModel customerModel)
        {
            var userId = HttpContext.GetCurrentUserId();
            if (userId is null) return Unauthorized();
            var customersEntity =  _customerEntity.Queryable.FirstOrDefault(t => t.Name == customerModel.Name);
            if (customersEntity != null)
            {
                return BadRequest("A customer with the same name exists");
            }

            var customerEntity = new CustomersEntity(customerModel.Name, customerModel.Rebate, customerModel.SellRate,
                Guid.NewGuid().ToString(), false);
           
            await _customerEntity.AddAsync(customerEntity);
            return Ok();
        }
        
        [HttpGet("GetCustomers")]
        [ProducesResponseType(typeof(IEnumerable<GoodsEntity>), 200)]
        [ProducesResponseType(typeof(NotFoundResult), 404)]
        public async Task<IActionResult> GetCustomers()
        {
            var userId = HttpContext.GetCurrentUserId();
            if (userId is null) return Unauthorized();
          
            var customersEntity =  _customerEntity.Queryable.Where(t=>!String.IsNullOrEmpty(t.Name));
            return Ok(customersEntity);
        }
        
        [HttpGet("GetCustomerByName")]
        [ProducesResponseType(typeof(IEnumerable<GoodsEntity>), 200)]
        [ProducesResponseType(typeof(NotFoundResult), 404)]
        public async Task<IActionResult> GetCustomerByName(string customerName)
        {
            var userId = HttpContext.GetCurrentUserId();
            if (userId is null) return Unauthorized();
          
            var customersEntity =  _customerEntity.Queryable.Where(t=>customerName.Contains(t.Name));
            return Ok(customersEntity);
        }

        [HttpDelete("DeleteCustomerByName")]
                 [ProducesResponseType(typeof(NotFoundResult), 404)]
                 public async Task<IActionResult> DeleteCustomerByName(string customerName)
                 {
                     var customersEntity =  _customerEntity.Queryable.FirstOrDefault(t => t.Name == customerName);
                     if (customersEntity != null)
                     {
                         await _customerEntity.DeleteAsync(customersEntity);
                     }
                     return Ok();
                 }
    }
}