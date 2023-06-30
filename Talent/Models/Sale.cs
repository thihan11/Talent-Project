using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Talent.Models
{
    public class Sale
    {
        [Key]
        public int Id { get; set; }

        


        public int CustomerId { get; set; }
        public virtual Customer? Customer { get; set; }

        public int ProductId { get; set; }
        public virtual Product? Product { get; set; }

        public int StoreId { get; set; }
        public virtual Store? Store { get; set; }

        [Column (TypeName = "Date")]
        public DateTime DateSold { get; set; }

    }

}
