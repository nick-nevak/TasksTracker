using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using TasksTracker.Database.Context;
using TasksTracker.Interfaces;
using TasksTracker.Models.DatabaseModels;

namespace TasksTracker.Database.Initializers
{
    public class PrioritiesInitializer : IDatabaseInitializer
    {
        public void Initialize(DatabaseContext context)
        {
            context.Database.Migrate();
            if (context.Priorities.Any()) { return; }
            var priorities = GetPriorities();
            context.Priorities.AddRange(priorities);
            context.SaveChanges();
        }

        public List<Priority> GetPriorities()
        {
            return new List<Priority>
            {
              new Priority
              {
                Value = 1,
                Description = "Very low"
              },
              new Priority
              {
                Value=2,
                Description= "Low"
              },
              new Priority
              {
                Value=3,
                Description= "Normal"
              },
              new Priority
              {
                Value=4,
                Description= "High"
              },
              new Priority
              {
                Value= 5,
                Description= "Very high"
              }
            };
        }

    }
}
