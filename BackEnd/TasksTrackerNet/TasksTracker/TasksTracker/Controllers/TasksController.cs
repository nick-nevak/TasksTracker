using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TasksTracker.Database.Context;
using TasksTracker.Models.Requests;
using Task = TasksTracker.Models.DatabaseModels.Task;

namespace TasksTracker.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly DatabaseContext db;
        private readonly IMapper mapper;

        public TasksController(DatabaseContext db,
                               IMapper mapper)
        {
            this.db = db;
            this.mapper = mapper;
        }

        [HttpGet("{id}")]
        public Task GetSingle(long id)
        {
            return db.Tasks.SingleOrDefault(t => t.Id == id);
        }

        [HttpGet]
        public IEnumerable<Task> Get(bool? includePriority, DateTime? toDate, bool? filterByStatus, bool? filterByDeleted)
        {
            var tasks = db.Tasks.AsQueryable();
            if (includePriority == true)
            {
                tasks = tasks.Include(t => t.Priority);
            }
            if (toDate != null)
            {
                tasks = tasks.Where(t => t.DueDate <= toDate);
            }
            if (filterByStatus == true)
            {
                tasks = tasks.Where(t => t.Status == true);
            }
            if (filterByDeleted == true)
            {
                tasks = tasks.Where(t => t.IsDeleted == true);
            }
            return tasks;
        }

        [HttpPost]
        public Task Post(TaskRequest createdTask)
        {
            var task = new Task();
            task.UpdateFieldsFromRequest(createdTask);
            db.Add(task);
            db.SaveChanges();
            return task;
        }

        [HttpPut]
        public Task Put(TaskRequest updatedTask)
        {
            var task = db.Tasks.SingleOrDefault(t => t.Id == updatedTask.Id);
            task.UpdateFieldsFromRequest(updatedTask);
            db.SaveChanges();
            return task;
        }

        // TBD
        //[HttpPatch]
        //public Task Patch(TaskRequest updatedTask)
        //{
        //    var task = db.Tasks.SingleOrDefault(t => t.Id == updatedTask.Id);
        //    task.UpdateFieldsFromRequest(updatedTask);
        //    db.SaveChanges();
        //    return task;
        //}

        [HttpDelete]
        public long Delete(long id)
        {
            var task = db.Tasks.SingleOrDefault(t => t.Id == id);
            db.Remove(task);
            db.SaveChanges();
            return id;
        }
    }

    public class TaskRequestTest
    {
        public string Title { get; set; }
    }
}