using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using TasksTracker.Models.DatabaseModels;
using TasksTracker.Models.Requests;

namespace TasksTracker.Models.Profiles
{
    public class TaskProfile : Profile
    {
        public TaskProfile()
        {
            CreateMap<Task, TaskRequest>();
        }
    }
}
