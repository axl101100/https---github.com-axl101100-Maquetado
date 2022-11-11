import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'; 


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})



export class DialogComponent implements OnInit {


  
  productForm !: FormGroup;
  actionBtn : string ="Save"
  constructor(private formBuilder : FormBuilder, private api : ApiService,

    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['',Validators.required],
      serie: ['',Validators.required],
      numero: ['',Validators.required],
      ruc: ['',Validators.required],
      mtc: ['',Validators.required],
      totalOnerosa: ['',Validators.required],
      totalGratuita: ['',Validators.required],
      enviadoCliente: ['',Validators.required],
      category: ['',Validators.required],
      date: ['',Validators.required]
    });

  if(this.editData){
    this.actionBtn ="Update";
    this.productForm.controls['productName'].setValue(this.editData.productName);
    this.productForm.controls['serie'].setValue(this.editData.serie);
    this.productForm.controls['numero'].setValue(this.editData.numero);
    this.productForm.controls['ruc'].setValue(this.editData.ruc);
    this.productForm.controls['mtc'].setValue(this.editData.mtc);
    this.productForm.controls['totalOnerosa'].setValue(this.editData.totalOnerosa);
    this.productForm.controls['totalGratuita'].setValue(this.editData.totalGratuita);
    this.productForm.controls['enviadoCliente'].setValue(this.editData.enviadoCliente);
    this.productForm.controls['category'].setValue(this.editData.category);
    this.productForm.controls['date'].setValue(this.editData.date);
  }

  }

addProduct(){
  if(!this.editData){
    if(this.productForm.valid){
      this.api.postProduct(this.productForm.value)
      .subscribe({
        next:(res)=>{
          alert("Product added sucessfully")
          this.productForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert("Error")
        }
      })
    }
  } else {
    this.updateProduct()
  }
}
updateProduct(){
  this.api.putProduct(this.productForm.value,this.editData.id)
  .subscribe({
    next:(res)=>{
      alert("producto update Successfully");
      this.productForm.reset();
      this.dialogRef.close('update');
    },
    error:()=>{
      alert("Error")
    }
  })
}


}
