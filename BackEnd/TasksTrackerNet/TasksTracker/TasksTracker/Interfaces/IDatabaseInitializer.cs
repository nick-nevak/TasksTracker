using TasksTracker.Database.Context;

namespace TasksTracker.Interfaces
{
    interface IDatabaseInitializer
    {
        public void Initialize(DatabaseContext context);
    }
}
