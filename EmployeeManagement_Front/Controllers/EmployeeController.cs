using EmployeeManagement_Front.Models;
using EmployeeManagement_Front.Services;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagement_Front.Controllers
{
    public class EmployeeController : Controller
    {

        private readonly IEmployeeService employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            this.employeeService = employeeService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public async Task<JsonResult> GetEmployees()
        {
            List<Employee> employees =await employeeService.GetAllEmployeesAsync();
            return Json(employees);
        }

        [HttpPost]
        public async Task<JsonResult> Insert(EmployeeDto createDto)
        {
            if(ModelState.IsValid)
            {
                await employeeService.AddEmployee(createDto);
                return Json("Employee details saved.");
            }
            else
            {
                return Json("Model validation failed");
            }
        }

        [HttpGet]
        public async Task<JsonResult> Edit(int id)
        {
            var employee =await employeeService.GetEmployeeById(id);
            return Json(employee);
        }

        [HttpPut]
        public async Task<JsonResult> Update(Employee employee)
        {
            if(ModelState.IsValid)
            {
                var result = await employeeService.UpdateEmployee(employee);
                return Json("Product details updated");
            }

            return Json("Model validation failed");
        }

        [HttpPost]
        public async Task<JsonResult> Delete(int id)
        {
            employeeService.DeleteEmployee(id);
            return Json("Employee Deleted Successfully");
        }
    }
}
