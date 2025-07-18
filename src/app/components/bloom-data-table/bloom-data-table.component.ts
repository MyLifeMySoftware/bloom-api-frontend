import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { BloomApiService } from '../../services/bloom-api.service';
import { Student, BloomData } from '../../models/bloom.interface';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-bloom-data-table',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatChipsModule
  ],
  templateUrl: './bloom-data-table.component.html',
  styleUrls: ['./bloom-data-table.component.scss']
})
export class BloomDataTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<Student>();
  bloomData: BloomData | null = null;
  isLoading = false;
  error: string | null = null;

  displayedColumns: string[] = [
    'id',
    'name',
    'lastName', 
    'secondLastName',
    'groupName',
    'actions'
  ];

  constructor(
    private bloomApiService: BloomApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadData(): void {
    this.isLoading = true;
    this.error = null;

    this.bloomApiService.getAllData().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.bloomData = response.data;
          this.dataSource.data = response.data.students;
          this.showSuccessMessage('Datos cargados exitosamente');
        } else {
          this.handleError('La respuesta de la API no fue exitosa');
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.handleError(error.message);
        this.isLoading = false;
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  refreshData(): void {
    this.loadData();
  }

  getFullName(student: Student): string {
    const parts = [student.name, student.lastName, student.secondLastName]
      .filter(part => part && part.trim() !== '');
    return parts.join(' ');
  }

  private handleError(message: string): void {
    this.error = message;
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }

  private showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }
}