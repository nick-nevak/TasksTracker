using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TasksTracker.Database.Context;
using TasksTracker.Database.Initializers;
using TasksTracker.Interfaces;

namespace TasksTracker
{
    public class Startup
    {
        private readonly string corsPolicyName = "cors";
        private readonly string DatabaseConnectionString = "TasksProjectConnection";
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            ConfigureDatabase(services);
            ConfigureCors(services);
            ConfigureDependencies(services);
            services.AddAutoMapper(typeof(Startup));
            services.AddControllers()
                .AddNewtonsoftJson(o =>
            {
                o.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Serialize;
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseDeveloperExceptionPage();
            app.UseCors(corsPolicyName);
            //app.UseHttpsRedirection();
            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        private void ConfigureDependencies(IServiceCollection services)
        {
            services.AddTransient<IDatabaseInitializer, PrioritiesInitializer>();
        }

        private void ConfigureDatabase(IServiceCollection services)
        {
            services.AddDbContext<DatabaseContext>(options => options.UseSqlServer(Configuration.GetConnectionString(DatabaseConnectionString)));
        }


        private void ConfigureCors(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(corsPolicyName,
                    policy =>
                    {
                        policy.AllowCredentials()
                            .WithOrigins(
                            "http://localhost:4300",
                            "https://localhost:4300")
                            .AllowAnyMethod()
                            .AllowAnyHeader();
                        //policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
                    });
            });
        }
    }
}
