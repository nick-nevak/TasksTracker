using System.ComponentModel.DataAnnotations.Schema;

namespace TasksTracker.Models.DatabaseModels
{
    public class Priority
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        public long Value { get; set; }
        public string Description { get; set; }
    }
}
