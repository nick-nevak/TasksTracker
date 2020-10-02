using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TasksTracker.Models.Responses
{
    public class TaskResponse
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public bool? Status { get; set; }
        public DateTime? DueDate { get; set; }
        public string Description { get; set; }
        public bool IsDeleted { get; set; }

        public Guid? PriorityId { get; set; }
        public PriorityResponse Priority { get; set; }
    }
}
