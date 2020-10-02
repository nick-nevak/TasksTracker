using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TasksTracker.Models.DatabaseModels;
using TasksTracker.Models.Responses;

namespace TasksTracker.Models.Profiles
{
    public class PriorityProfile : Profile
    {
        public PriorityProfile()
        {
            CreateMap<Priority, PriorityResponse>().ReverseMap();
        }
    }
}
