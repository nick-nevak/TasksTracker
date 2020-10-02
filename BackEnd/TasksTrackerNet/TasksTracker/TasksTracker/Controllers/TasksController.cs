using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TasksTracker.Database.Context;
using TasksTracker.Models.Requests;
using TasksTracker.Models.Responses;
using Task = TasksTracker.Models.DatabaseModels.Task;

namespace TasksTracker.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly DatabaseContext db;
        private readonly IMapper _mapper;

        public TasksController(DatabaseContext db,
                               IMapper mapper)
        {
            this.db = db;
            this._mapper = mapper;
        }

        [HttpGet("{id}")]
        public Task GetSingle(Guid id)
        {
            return db.Tasks.SingleOrDefault(t => t.Id == id);
        }

        [HttpGet]
        public IEnumerable<TaskResponse> Get(bool? includePriority, DateTime? toDate, bool? filterByStatus, bool? filterByDeleted)
        {
            var query = db.Tasks.AsQueryable();
            if (includePriority == true)
            {
                query = query.Include(t => t.Priority);
            }
            if (toDate != null)
            {
                query = query.Where(t => t.DueDate <= toDate);
            }
            if (filterByStatus == true)
            {
                query = query.Where(t => t.Status == true);
            }
            query = query.Where(t => t.IsDeleted == (filterByDeleted ?? false));
            var tasks = query.ToList();
            var results = _mapper.Map<List<TaskResponse>>(tasks);
            return results;
        }

        [HttpPost]
        public TaskResponse Post(TaskRequest createdTask)
        {
            var task = new Task();
            task.UpdateFieldsFromRequest(createdTask);
            db.Add(task);
            db.SaveChanges();
            var result = _mapper.Map<TaskResponse>(task);
            return result;
        }

        [HttpPut]
        public TaskResponse Put(TaskRequest updatedTask)
        {
            var task = db.Tasks.SingleOrDefault(t => t.Id == updatedTask.Id);
            task.UpdateFieldsFromRequest(updatedTask);
            db.SaveChanges();
            var result = _mapper.Map<TaskResponse>(task);
            return result;
        }

        [HttpDelete("{id}")]
        public Guid Delete(Guid id)
        {
            var task = db.Tasks.SingleOrDefault(t => t.Id == id);
            task.MoveToTrash();
            db.SaveChanges();
            return id;
        }

        // TBD
        [HttpPatch("{id}")]
        public Task Patch(Guid id, [FromBody] JsonPatchDocument<Task> updatedTask)
        {
            var task = db.Tasks.SingleOrDefault(t => t.Id == id);
            updatedTask.ApplyTo(task);
            db.SaveChanges();
            return task;
        }
    }
}