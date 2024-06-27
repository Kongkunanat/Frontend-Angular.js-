import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common'
import { SecondpageService } from '../service/second/secondpage.service';

@Component({
  selector: 'app-secondpage',
  standalone: true,
  imports: [
    MatButtonModule, MatCardModule, MatInputModule, ReactiveFormsModule,
    MatFormFieldModule, FlexLayoutModule,CommonModule
  ],
  templateUrl: './secondpage.component.html',
  styleUrls: ['./secondpage.component.scss']
})
export class SecondpageComponent {
  controlForm: FormGroup<{
    materialType: FormControl<string>,
    checkerName: FormControl<string>,
  }>;
  selectedFile: File | null = null;
  imageUrl: string | ArrayBuffer | null = null;

  constructor(
    public dialogRef: MatDialogRef<SecondpageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: NonNullableFormBuilder,
    private fileUploadService: SecondpageService
  ) {
    this.controlForm = this.formBuilder.group({
      materialType: '',
      checkerName: ''
    });
  }



  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }


  onSave() {
    if (this.selectedFile) {
      this.fileUploadService.create(this.selectedFile).subscribe(
        response => {
          console.log('File uploaded successfully:', response);
          this.dialogRef.close(true);
        },
        error => {
          console.error('Error uploading file:', error);
        }
      );
    } else {
      this.dialogRef.close(false);
    }
  }





  onClose(isSave: boolean): void {
    this.dialogRef.close(isSave);
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
}
