using EmployeeManagement_Front.Models;
using System.Net;

namespace EmployeeManagement_Front.Services
{
    public class EmployeeService : IEmployeeService
    {

        private static List<Employee> _employees = new List<Employee>();
        private readonly HttpClient _httpClient;
        private readonly string baseUri;

        public EmployeeService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            baseUri = configuration["BaseUri"];
        }

        public async Task<Boolean> AddEmployee(EmployeeDto dto)
        {
            HttpResponseMessage response = await _httpClient.PostAsJsonAsync<EmployeeDto>(baseUri + "Employee", dto);

            return true;
        }

        public async Task<Boolean> DeleteEmployee(int id)
        {
            Employee employee = await _httpClient.DeleteFromJsonAsync<Employee>(baseUri + $"Employee/{id}");

            if(employee != null )
            {
                return true;
            }
            return false;
        }

        public async Task<List<Employee>> GetAllEmployeesAsync()
        {
            string uri = baseUri + "Employee";
            List<Employee> result =await _httpClient.GetFromJsonAsync<List<Employee>>(uri);
            return result;
        }

        public async Task<Employee> GetEmployeeById(int id)
        {
            var employee = await _httpClient.GetFromJsonAsync<Employee>(baseUri + $"Employee/{id}");
            return employee;
        }

        public async Task<Boolean> UpdateEmployee(Employee employee)
        {
            var existingEmployee = await _httpClient.GetFromJsonAsync<Employee>(baseUri + $"Employee/{employee.Id}");
            if (existingEmployee != null)
            {
                existingEmployee.FirstName = employee.FirstName;
                existingEmployee.LastName = employee.LastName;
                existingEmployee.Email = employee.Email;
                existingEmployee.Age = employee.Age;

                await _httpClient.PutAsJsonAsync<Employee>(baseUri+$"Employee/{employee.Id}" ,existingEmployee);
                return true;
            }
            return false;
        }

    }
}
