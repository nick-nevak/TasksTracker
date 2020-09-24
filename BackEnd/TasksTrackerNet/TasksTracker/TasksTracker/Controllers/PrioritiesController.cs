using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using TasksTracker.Database.Context;
using TasksTracker.Models.DatabaseModels;

namespace TasksTracker.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PrioritiesController : ControllerBase
    {
        private readonly DatabaseContext db;

        public PrioritiesController(DatabaseContext db)
        {
            this.db = db;
        }

        [HttpGet]
        public IEnumerable<Priority> Get()
        {
            return db.Priorities.ToList();
        }
    }
}