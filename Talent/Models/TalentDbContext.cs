using Microsoft.EntityFrameworkCore;

namespace Talent.Models
{
    public class TalentDbContext : DbContext
    {
        public TalentDbContext(DbContextOptions<TalentDbContext> options) : base(options) { }


        public DbSet<Customer> Customers { get; set; }

        public DbSet<Product> Products { get; set; }
        public DbSet<Store> Stores { get; set; }
        public DbSet<Sale> Sales { get; set; }
    }
}
