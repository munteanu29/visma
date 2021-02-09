using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace WareHouse.Entities
{
    public class Entity
    {
        public Entity(bool deleted, string id)
        {
            Deleted = deleted;
            Id = id;
        }
        [Key]
        [ReadOnly(true)] public string Id { get; set; }
        [JsonIgnore]
        public bool Deleted { get; set; }
    }
}