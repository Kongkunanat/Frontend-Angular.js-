import { Component , ViewChild ,AfterViewInit} from '@angular/core';
import { FormControl, FormGroup , ReactiveFormsModule} from '@angular/forms'; // ต้องมี ReactiveFormsModule ไม่งั้น blindata จาก html form มาไม่ได้ ไม่ได้
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule  } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SecondpageComponent } from '../secondpage/secondpage.component';
import { HttpClient} from '@angular/common/http';
import { FisrtpageService } from '../service/firstpage/fisrtpage.service';
import { Image } from '../models/Image';

interface model{
    nameImage: string;
}

@Component({
  selector: 'app-firstpage',
  standalone: true,
  imports: [
    MatIconModule,MatCardModule,MatFormFieldModule,MatButtonModule,MatTableModule, MatPaginatorModule,MatSelectModule ,MatInputModule,ReactiveFormsModule,CommonModule],
  templateUrl: './firstpage.component.html',
  styleUrls: ['./firstpage.component.scss'],

})
export class FirstpageComponent implements AfterViewInit{
  myForm: FormGroup;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<{ id: number , url: string, title: string }>();


  displayedColumns: string[] = ['Image', 'Description', 'Action'];

  constructor(
    public dialog: MatDialog,
    private dataService: FisrtpageService
  ) {
    this.myForm = new FormGroup({
      fromcheckerName: new FormControl('')
    });
  }



  ngOnInit(): void {
    this.fetchAllData();
  }


  fetchAllData()
  {
    this.dataService.getAll().subscribe((query: any[]) => {
      if (query && query.length > 0) {
        const images = query.map(element => ({
          id: element.id,
          url: `data:${element.type};base64,${element.data}`,
          title: element.imageTitle
        }));
        this.dataSource.data = images;
      } else {
        console.log('No data retrieved.');
        this.dataSource.data = [];

      }
    }, error => {
      console.error('Error fetching data:', error);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onSearch(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.searchData();
  }

  searchData() {
    const searchValue = this.myForm.get('fromcheckerName')?.value.toLowerCase();
    this.dataSource.filter = searchValue.trim();
  }




  onDelete(element: Image) {
    this.dataService.delete(element.id).subscribe(
      () => {
        console.log('Image deleted successfully.');
        this.fetchAllData();
      },
      (error) => {
        console.error('Error deleting image:', error);
      }
    );;
  }



  onOpenNewDialog() {
    const dialogref = this.dialog.open(SecondpageComponent, {
      disableClose: true,
      panelClass: 'mat-dialog-md'
    });

    dialogref.afterClosed().subscribe(result => {
      if (result === true) {
        this.fetchAllData();
        // Handle dialog result
      } else {
        console.log('New clicked');
      }
    });
  }


  onClear(){
    this.dataSource.data = [];
    this.myForm.reset();
    this.fetchAllData();
  }
}









