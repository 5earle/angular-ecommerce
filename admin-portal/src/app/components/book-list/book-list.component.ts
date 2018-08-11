import { Component, OnInit } from '@angular/core';
import {Book} from '../../models/Book';
import {Router} from '@angular/router';
import {LoginService} from '../../services/login.service';
import {GetBookListService} from '../../services/get-book-list.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {RemoveBookService} from '../../services/remove-book.service';
import {UploadImageService} from '../../services/upload-image.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  private selectedBook: Book;
  private checked: boolean;
  private bookList: Book[];
  private allChecked: boolean;
  private removeBookList: Book[] = [];

  constructor(
    public loginService: LoginService,
    private router: Router,
    private getBookListService: GetBookListService,
    public dialog: MatDialog,
    private removedBookService: RemoveBookService,
    private removeUrl: UploadImageService
  ) { }

  ngOnInit() {
   this.getBookListAfterDelet();
  }
  onSelect(book: Book) {
    this.selectedBook = book;
    // pass id to view book
    this.router.navigate(['/viewBook', this.selectedBook.id]);
  }
  openDialog(book: Book) {
    if (confirm('ARE YOU SURE ?')) {
      this.removedBookService.sendBook(book).subscribe(
        res => {
        },
        err => {
          console.log(err);
        }
      );
      // remove image
      this.removedBookService.onDelete(book.id).then(() => {
        console.log('image was removed ');
        // location.reload();
        this.getBookListAfterDelet();
      }).catch((err) => {
        console.log('image was not removed');
      });
    }
    /*const dRef = this.dialog.open(DialogResultExampleDialog);
    dRef.afterClosed().subscribe(
      res => {
        if (res === 'yes') {
          this.removedBookService.sendBook(book).subscribe(
            res => {
            },
            err => {
              console.log(err);
            }
          );
          // remove image
          this.removedBookService.onDelete(book.id).then(() => {
            console.log('image was removed ');
            // location.reload();
            this.getBookListAfterDelet();
          }).catch((err) => {
            console.log('image was not removed');
          });
        }
      }
    );*/
  }
  getBookListAfterDelet() {
    this.getBookListService.getBookList().subscribe(
      res => {
        this.bookList = res as Book[];
        const objectToJson = JSON.stringify(this.bookList);
        console.log(objectToJson);
      },
      err => {
        console.log('No Book Recive');
        console.log(err);
      }
    );
  }
  // delete multiple books
  updateSelected(checked: boolean) {
    if (checked) {
      this.allChecked = true;
      this.removeBookList = this.bookList.slice();
    } else {
      this.allChecked = false;
      this.removeBookList = [];
    }
  }
  updateRemoveBookList(checked: boolean, book: Book) {
    console.log('inside updateRemoveBookList');
    if (checked) {
      this.removeBookList.push(book);
    } else {
      this.removeBookList.splice(this.removeBookList.indexOf(book), 1);
    }
  }
  removeSelectedBooks() {
    const dialogRef = this.dialog.open(DialogResultExampleDialog);
    dialogRef.afterClosed().subscribe(
      result => {
        if (result === 'yes') {
          for (const book of this.removeBookList) {
            this.removedBookService.sendBook(book).subscribe(
              res => {

              },
              err => {
              }
            );
            // remove image
            this.removedBookService.onDelete(book.id).then(() => {
              console.log('image was removed ');
              // location.reload();
              this.getBookListAfterDelet();
            }).catch((err) => {
              console.log('image was not removed');
            });
          }
        }
      }
    );
  }
  // delete multiple books

}
// create new component
@Component({
  selector: 'dialog-result-example-dialog',
  templateUrl: './dialog-result-example-dialog.html'
})
export class DialogResultExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogResultExampleDialog>) {}
}
