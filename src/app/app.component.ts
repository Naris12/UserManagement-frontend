import { EmployeeService } from './employee.service';
import { Employee } from './employee';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 public employees : Employee[];
 public editEmployee:Employee;
  public deleteEmployee: Employee;
 constructor(private employeeservice :EmployeeService){}

 ngOnInit(){
   this.getemployee();
 }

 public getemployee():void{
   this.employeeservice.getEmployee().subscribe(
     (response:Employee[])=>{
       this.employees=response;
     },
     (error:HttpErrorResponse)=>{
       alert(error.message);
     }
   );
 }

 public onAddEmployee(addForm:NgForm):void{
   document.getElementById('add-employee-form').click();
   this.employeeservice.addEmployee(addForm.value).subscribe(
     (response:Employee)=>{
       console.log(response);
       this.getemployee();
       addForm.reset();
     },
     (error:HttpErrorResponse)=>{
       alert(error.message);
     }
   );
 }


 public onUpdateEmployee(employee:Employee):void{

  this.employeeservice.updateEmployee(employee).subscribe(
    (response:Employee)=>{
      console.log(response);
      this.getemployee();
    },
    (error:HttpErrorResponse)=>{
      alert(error.message);
    }
  );
}

public onDeleteEmployee(employeeId:number):void{

  this.employeeservice.deleteEmployee(employeeId).subscribe(
    (response:void)=>{
      console.log(response);
      this.getemployee();
    },
    (error:HttpErrorResponse)=>{
      alert(error.message);
    }
  );
}


 public onOpenModal(employee:Employee,mode:string):void{
   const container = document.getElementById('main-container')
   const button = document.createElement('button');
   button.type='button';
   button.style.display='none';
   button.setAttribute('data-toggle','modal')
   if(mode ==='add'){
     button.setAttribute('data-target','#addEmployeeModal');
   }
   if(mode ==='edit'){
     this.editEmployee= employee;
     button.setAttribute('data-target','#updataEmployeeModal');
   }
   if(mode ==='delete'){
     this.deleteEmployee=employee;
     button.setAttribute('data-target','#deleteEmployeeModal')
   }
   container.appendChild(button);
   button.click();
 }





}
