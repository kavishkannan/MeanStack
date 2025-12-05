import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { BooksService } from '../../services/books';

@Component({
  selector: 'app-book-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './book-form-dialog.html',
  styleUrls: ['./book-form-dialog.css']
})
export class BookFormDialog implements OnInit {

  authors: any[] = [];
  categories: any[] = [];

  saving = false;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private svc: BooksService,
    private dialogRef: MatDialogRef<BookFormDialog>,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      author_id: [null, Validators.required],
      category_id: [null, Validators.required],
      published_year: [null],
      isbn: [''],
      price: [null],
      copies: [0],
      location: ['']
    });

    // Load dropdown data safely
    this.loadLookups();

    if (this.data) {
      // Patch form also after Angular stabilizes
      setTimeout(() => {
        this.form.patchValue(this.data);
        this.cdr.detectChanges();
      });
    }
  }

  loadLookups(): void {
    this.svc.getAuthors().subscribe(res => {
      setTimeout(() => {
        // console.log('Authors loaded:', res.data);
        this.authors = res.data || [];
        this.cdr.detectChanges();
      });
    });

    this.svc.getCategories().subscribe(res => {
      setTimeout(() => {
        this.categories = res.data || [];
        this.cdr.detectChanges();
      });
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    const payload = this.form.value;

    if (this.data?.id) {
      this.svc.update(this.data.id, payload).subscribe({
        next: () => this.dialogRef.close(true),
        error: () => (this.saving = false)
      });
    } else {
      this.svc.create(payload).subscribe({
        next: () => this.dialogRef.close(true),
        error: () => (this.saving = false)
      });
    }
  }

  close(): void {
    this.dialogRef.close(false);
  }
}
