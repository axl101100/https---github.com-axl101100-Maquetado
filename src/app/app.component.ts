
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort, matSortAnimations } from '@angular/material/sort';
import {FormGroup, FormControl, FormBuilder,Validators} from '@angular/forms';


import * as _ from 'lodash';
import { isNgTemplate } from '@angular/compiler';
import { rest } from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit {
  title = 'Crud';
  campaignOne: FormGroup;
  campaignTwo: FormGroup;
  
  
  displayedColumns: string[] = ['date','category','serie','numero','ruc','productName','mtc','totalOnerosa','totalGratuita','enviadoCliente','imprimir','pdf','xml','cdr','estado','action'];
  dataSource = new MatTableDataSource<any>;

  apiResponse: any = []
  


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  


  constructor(private dialog : MatDialog, private api : ApiService,){

    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    
      this.campaignOne = new FormGroup({
        start: new FormControl(new Date(year, month, 13)),
        end: new FormControl(new Date(year, month, 16))
      });
    
      this.campaignTwo = new FormGroup({
        start: new FormControl(new Date(year, month, 15)),
        end: new FormControl(new Date(year, month, 19))
      });
  }

  

  ngOnInit(): void{
    this.getAllProducts();

    this.apiResponse = this.apiResponse;
   
  }



  openDialog() {
    this.dialog.open(DialogComponent, {
    width: '30%'
    }).afterClosed().subscribe(val=>{
      if(val ==='save'){
        this.getAllProducts();
      }
    })
  }


  
  getAllProducts(){
    this.api.getProduct()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      },
      error:(err)=>{
        alert("Error")
      }
    })
  }

  editProduct(row :any ){
    this.dialog.open(DialogComponent, {
      width:'30%',
      data: row
    }).afterClosed().subscribe(val=>{
      if(val === 'update'){
        this.getAllProducts();
      }
    })
  }

  deleteProduct(id:number){
    this.api.deleteProduct(id)
    .subscribe({
      next:(res)=>{
      alert("Product deleted successfully");
      this.getAllProducts();
      },
      error:()=>{
        alert("Error")
      }
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



onChange($event:any){
let filteredData = _.filter(this.apiResponse ,(id) =>{
  return id.gender.toLowerCase() == $event.value.toLowerCase();
})
this.dataSource = new MatTableDataSource(filteredData);
}
                                   
}


