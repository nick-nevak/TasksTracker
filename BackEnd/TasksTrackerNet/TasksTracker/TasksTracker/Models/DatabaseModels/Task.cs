using System;
using System.ComponentModel.DataAnnotations.Schema;
using TasksTracker.Models.Requests;

namespace TasksTracker.Models.DatabaseModels
{
    public class Task
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        public string Title { get; set; }
        public bool Status { get; set; }
        public DateTime DueDate { get; set; }
        public string Description { get; set; }
        public bool IsDeleted { get; set; }

        public long PriorityId { get; set; }
        public Priority Priority { get; set; }

        public void UpdateFieldsFromRequest(TaskRequest request)
        {
            Title = request.Title;
            Status = request.Status;
            DueDate = request.DueDate;
            Description = request.Description;
            IsDeleted = request.IsDeleted;
            PriorityId = request.PriorityId;
        }
    }
}
