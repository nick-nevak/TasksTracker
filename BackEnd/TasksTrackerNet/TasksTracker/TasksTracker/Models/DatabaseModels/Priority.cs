using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TasksTracker.Models.DatabaseModels
{
    public class Priority
    {
        [Key]
        public Guid Id { get; set; }
        public long Value { get; set; }
        public string Description { get; set; }
    }
}
