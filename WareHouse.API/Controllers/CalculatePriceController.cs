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
    public class CalculatePriceController : Controller
    {
        private readonly IRepository<GoodsEntity> _goodEntity; 
        private readonly IRepository<CustomersEntity> _customerEntity; 
        public CalculatePriceController(ApplicationDbContext context)
        {
            _goodEntity = context.GetRepository<GoodsEntity>();
            _customerEntity = context.GetRepository<CustomersEntity>();
        }
        
        
        [HttpPost("CalculatePriceForCustomer")]
        [ProducesResponseType(typeof(IEnumerable<OfferModel>), 200)]
        public async Task<IActionResult> CalculatePriceForCustomer([FromBody] OfferParamsModel offerParamsModel)
        {
            var quantityCoefficient= (float)0.0001;
            var quantityDiscount = offerParamsModel.Quantity * quantityCoefficient;

            var userId = HttpContext.GetCurrentUserId();
            if (userId is null) return Unauthorized();
            var customersEntity =  _customerEntity.Queryable.FirstOrDefault(t=>t.Name.Equals(offerParamsModel.CustomerName));
            var goodsEntity =  _goodEntity.Queryable.FirstOrDefault(t=>t.Name.Equals(offerParamsModel.GoodsName));

            if (customersEntity==null|| goodsEntity==null)
                return BadRequest("customer or good doesn't exist");
            
            var totalDiscount = offerParamsModel.Rebate +  offerParamsModel.SpecialDeal + offerParamsModel.SeasonDeal+ customersEntity.Rebate+ quantityDiscount ;

            if(customersEntity.SellRate<30 && totalDiscount>30)
                return BadRequest("Total Discount can't be over 30 when user's sell rate is below 30 units");
            if (totalDiscount > 50)
                return BadRequest("Discount is over 50%");
            var pricePerUnit = goodsEntity.Price * (100-totalDiscount) / 100;
            var pricePerCommand = pricePerUnit *  offerParamsModel.Quantity;
            var offer =new OfferModel()
            {
                Customer = customersEntity,
                Goods = goodsEntity,
                Quantity = offerParamsModel.Quantity,
                Rebate = offerParamsModel.Rebate,
                SpecialDeal = offerParamsModel.SpecialDeal,
                SeasonDeal = offerParamsModel.SeasonDeal,
                PricePerComand = pricePerCommand,
                PricePerUnit = pricePerUnit,
                TotalDiscount = totalDiscount,
                QuantityDiscount = quantityDiscount
                
                
            };
            return Ok(offer);
        }
    }
}