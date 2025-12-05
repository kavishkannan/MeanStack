import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BooksService, BookRow } from '../../services/books';
import { MatTableDataSource } from '@angular/material/table';
import { BookFormDialog } from '../book-form-dialog/book-form-dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-books-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule
  ],
  templateUrl: './books-dashboard.html',
  styleUrls: ['./books-dashboard.css']
})
export class BooksDashboard implements OnInit {
  displayedColumns = ['title', 'author_name', 'category_name', 'published_year', 'price', 'copies', 'actions'];
  dataSource = new MatTableDataSource<BookRow>([]);
  total = 0;
  pageSize = 5;
  pageIndex = 0;
  search = '';
  sortBy = 'title';
  sortDir: 'ASC' | 'DESC' = 'ASC';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private svc: BooksService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    const params = {
      search: this.search || '',
      page: (this.pageIndex + 1).toString(),
      pageSize: this.pageSize.toString(),
      sortBy: this.sortBy,
      sortDir: this.sortDir
    };
    this.svc.list(params).subscribe({
      next: res => {
        this.dataSource.data = res.data.books || [];
        this.total = res.total || 0;
        // attach paginator after data sets
        setTimeout(() => (this.dataSource.paginator = this.paginator));
      },
      error: err => {
        console.error('list error', err);
      }
    });
  }

  applySearch() {
    this.pageIndex = 0;
    this.load();
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.load();
  }

  // openCreate()
  openCreate() {
    const ref = this.dialog.open(BookFormDialog, {
      width: '50vw',
      height: '100vh',
      position: { left: '0', top: '0' },
      panelClass: 'half-dialog-panel',
      data: null,
      autoFocus: false,
      closeOnNavigation: true
    });

    ref.afterClosed().subscribe(result => { if (result) this.load(); });
  }

  // openEdit(row)
  openEdit(row: BookRow) {
    const ref = this.dialog.open(BookFormDialog, {
      width: '50vw',
      height: '100vh',
      position: { left: '0', top: '0' },
      panelClass: 'half-dialog-panel',
      data: row,
      autoFocus: false,
      closeOnNavigation: true
    });

    ref.afterClosed().subscribe(result => { if (result) this.load(); });
  }


  delete(row: BookRow) {
    if (!confirm('Are you sure you want to delete this book?')) return;
    this.svc.delete(row.id!).subscribe({
      next: () => this.load(),
      error: e => console.error(e)
    });
  }
}
