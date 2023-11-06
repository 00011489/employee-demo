$(document).ready(function () {
    GetEmployees();
})

/* Read Data */
function GetEmployees() {
    $.ajax({
        url:'/employee/GetEmployees',
        type:'get',
        datatype:'json',
        contentType: 'application/json;charset=utf-8',
        success: function (response) {
            if (response == null || response == undefined || response.length == 0) {
                var object = '';
                object += '<tr>';
                object += '<td colspan="6">' + 'Employees not available' + '</td>';
                object += '</tr>';
                $('#tblBody').html(object);
            } else {
                var object = '';
                let i = 1;
                $.each(response, function (index, item) {
                    object += '<tr>';
                    object += '<td>' + i++ + '</td>';
                    object += '<td>' + item.firstName + '</td>';
                    object += '<td>' + item.lastName + '</td>';
                    object += '<td>' + item.age + '</td>';
                    object += '<td>' + item.email + '</td>';
                    object += '<td> <a href="#" class="btn btn-primary btn-sm" onclick="Edit(' + item.id +
                        ')">Edit</a> <a href="#" class="btn btn-danger btn-sm" onclick="Delete(' + item.id +
                        ')">Delete</a></td>';
                    object += "</tr>"
                });
                $('#tblBody').html(object);

            }
        },
        error: function () {
            alert('Unable to read the data.'); 
        }
    })
}

$('#btnAdd').click(function () {
    $('#EmployeeModal').modal('show');
    $('#modalTitle').text('Add Employee');
});

/*  Insert Data  */
function Insert() {
    var result = Validate();

    if (result == false) {
        return false;
    }

    var formData = new Object();
    formData.id = $('#Id').val();
    formData.firstName = $('#FirstName').val();
    formData.lastName = $('#LastName').val();
    formData.email = $('#Email').val();
    formData.age = $('#Age').val();

    $.ajax({
        url: '/employee/Insert',
        data: formData,
        type: 'post',
        success: function (response) {
            if (response == null || response == undefined || response.length == 0) {
                alert("Unable to save the data.");
            } else {
                GetEmployees();
                HideModal();
                alert(response);
            }
        },
        error: function () {
            alert("Unable to save the data.");
        }
    });
}

function HideModal() {
    ClearData();
    $('#EmployeeModal').modal('hide');
}

function ClearData() {
    $('#FirstName').val('');
    $('#LastName').val('');
    $('#Email').val('');
    $('#Age').val('');

    $('#FirstName').css('border-color', 'lightgrey');
    $('#LastName').css('border-color', 'lightgrey');
    $('#Age').css('border-color', 'lightgrey');
    $('#Email').css('border-color', 'lightgrey');
}

function Validate() {
    var isValid = true;

    if ($('#FirstName').val().trim() == "") {
        $('#FirstName').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#FirstName').css('border-color', 'lightgrey');
    }

    if ($('#LastName').val().trim() == "") {
        $('#LastName').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#LastName').css('border-color', 'lightgrey');
    }

    if ($('#Age').val().trim() == "") {
        $('#Age').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#Age').css('border-color', 'lightgrey');
    }

    if ($('#Email').val().trim() == "") {
        $('#Email').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#Email').css('border-color', 'lightgrey');
    }

    return isValid;
}

$('#FirstName').change(function () {
    Validate();
})
$('#LastName').change(function () {
    Validate();
})
$('#Email').change(function () {
    Validate();
})
$('#Age').change(function () {
    Validate();
})

function Edit(id) {
    $.ajax({
        url:'/employee/Edit?id='+id,
        type:'get',
        contentType:'application/json;charset=utf-8',
        dataType: 'json',
        success: function (response) {
            if (response == null || response == undefined) {
                alert('Unable to read the data.');
            }
            else if (response.length == 0) {
                alert('Data not available with the id ' + id);
            } else {
                $('#EmployeeModal').modal('show');
                $('#modalTitle').text('Update Employee');
                $('#Save').css('display', 'none');
                $('#Update').css('display', 'block');
                $('#Id').val(response.id);
                $('#FirstName').val(response.firstName);
                $('#LastName').val(response.lastName);
                $('#Email').val(response.email);
                $('#Age').val(response.age);
            }
        },
        error: function () {
            alert('Unable to read the data.')
        }
    });
}

/* Edit */
function Update() {
    var result = Validate();
    if (result == false) {
        return false;
    }

    var formData = new Object();
    formData.id = $('#Id').val();
    formData.firstName = $('#FirstName').val();
    formData.lastName = $('#LastName').val();
    formData.email = $('#Email').val();
    formData.age = $('#Age').val();

    $.ajax({
        url: '/employee/Update',
        data: formData,
        type: 'put',
        success: function (response) {
            if (response == null || response == undefined || response.length == 0) {
                alert("Unable to save the data.Fail");
            } else {
                HideModal();
                GetEmployees();
                alert("Employee Deleted Successfully!");
            }
        },
        error: function () {
            alert("Error Occured");
        }
    });
}

/*Delete Employee*/
function Delete(id) {
    if (confirm('Are you sure to delete this employee data?')) {
        $.ajax({
            url: '/employee/Delete?id=' + id,
            type: 'post',
            success: function (response) {
                if (response == null || response == undefined || response.length==0) {
                    alert('Unable to delete the data.');
                }
                else {
                    GetEmployees();
                    alert('Employee Deleted Successfully!');
                }
            },
            error: function () {
                alert('Error Occured!')
            }
        });
    }
}