using Microsoft.EntityFrameworkCore;
using TasksTracker.Models.DatabaseModels;

namespace TasksTracker.Database.Context
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
            this.ChangeTracker.LazyLoadingEnabled = false;
        }

        public DbSet<Task> Tasks { get; set; }
        public DbSet<Priority> Priorities { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Task>().ToTable("Task");
            modelBuilder.Entity<Priority>().ToTable("Priority");
        }
    }
}
