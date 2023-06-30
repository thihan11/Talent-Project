using Talent.Models;
using Microsoft.EntityFrameworkCore;

namespace Talent
{
    public class Program
    {

        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var connectionString = builder.Configuration.GetConnectionString("MyConnection");
            // Add services to the container.
            builder.Services.AddDbContext<TalentDbContext>(options => options.UseSqlServer(connectionString));
           
            builder.Services.AddCors(setup =>
            {
                setup.AddDefaultPolicy(policyBuilder =>
                {
                    policyBuilder.WithOrigins("https://localhost:3000")
                    .AllowAnyOrigin()
                    .AllowAnyHeader()
                    .SetIsOriginAllowed(origin => true)
                    .AllowAnyMethod();
                }
                );
            });

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseCors();

            app.UseAuthorization();

            app.MapControllers();
            

            app.Run();
        }
    }
}