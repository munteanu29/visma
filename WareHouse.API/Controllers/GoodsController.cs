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
    public class GoodsController:Controller
    {
        private readonly IRepository<GoodsEntity> _goodEntity; 
        public GoodsController(ApplicationDbContext context)
        {
            _goodEntity = context.GetRepository<GoodsEntity>();
        }
        
        [HttpPost("AddGoods")]
        public async Task<IActionResult> AddGoods([FromBody] GoodsModel goodsModel)
        {
            var userId = HttpContext.GetCurrentUserId();
            if (userId is null) return Unauthorized();
            var existGoodsEntity =  _goodEntity.Queryable.FirstOrDefault(t => t.Name == goodsModel.Name);
            if (existGoodsEntity != null)
            {
                existGoodsEntity.Quantity += goodsModel.Quantity;
                await _goodEntity.UpdateAsync(existGoodsEntity);
                return Ok();
            }
            var goodsEntity = new GoodsEntity(goodsModel.Name, goodsModel.Price, goodsModel.Quantity, false, Guid.NewGuid().ToString());
            await _goodEntity.AddAsync(goodsEntity);
            return Ok();
        }
        
        [HttpGet("GetGoods")]
        [ProducesResponseType(typeof(IEnumerable<GoodsEntity>), 200)]
        [ProducesResponseType(typeof(NotFoundResult), 404)]
        public async Task<IActionResult> GetGoods()
        {
            var userId = HttpContext.GetCurrentUserId();
            if (userId is null) return Unauthorized();
          
            var goods =  _goodEntity.Queryable.Where(t=>!String.IsNullOrEmpty(t.Name));
            return Ok(goods);
        }
        
        [HttpGet("GetGoodsByName")]
        [ProducesResponseType(typeof(IEnumerable<GoodsEntity>), 200)]
        [ProducesResponseType(typeof(NotFoundResult), 404)]
        public async Task<IActionResult> GetGoodsByName(string goodsName)
        {
            var userId = HttpContext.GetCurrentUserId();
            if (userId is null) return Unauthorized();
          
            var doorEntity =  _goodEntity.Queryable.FirstOrDefault(t=>goodsName.Contains(t.Name));
            if (doorEntity == null )
                return NoContent();
            return Ok(doorEntity);
        }

        [HttpDelete("DeleteGoodsByName")]
                 [ProducesResponseType(typeof(NotFoundResult), 404)]
                 public async Task<IActionResult> DeleteGoodsByName(string goodsName)
                 {
                     var doorEntity =  _goodEntity.Queryable.FirstOrDefault(t => t.Name == goodsName);
                     if (doorEntity != null)
                     {
                         await _goodEntity.DeleteAsync(doorEntity);
                     }
         
                     return Ok();
                 }
                 
                 [HttpDelete("SellGoodsByName")]
                 [ProducesResponseType(typeof(NotFoundResult), 404)]
                 public async Task<IActionResult> SellGoodsByName(string goodsName, int quantity)
                 {
                     var doorEntity =  _goodEntity.Queryable.FirstOrDefault(t => t.Name == goodsName);
                     if (doorEntity != null && doorEntity.Quantity >= quantity)
                     {
                         doorEntity.Quantity -= quantity;
                         await _goodEntity.UpdateAsync(doorEntity);
                     }
                     else return BadRequest("Quantity isn't avalaible");
                     

                     return Ok();
                 }
    }
}