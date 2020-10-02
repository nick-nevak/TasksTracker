using System;

namespace TasksTracker.Models.Requests
{
    public class TaskRequest
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public bool? Status { get; set; }
        public DateTime? DueDate { get; set; }
        public string Description { get; set; }
        public bool IsDeleted { get; set; }

        public long? PriorityId { get; set; }
    }
}
