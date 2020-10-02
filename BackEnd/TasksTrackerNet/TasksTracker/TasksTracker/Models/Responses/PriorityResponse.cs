using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TasksTracker.Models.Responses
{
    public class PriorityResponse
    {
        public Guid Id { get; set; }
        public long Value { get; set; }
        public string Description { get; set; }
    }
}
