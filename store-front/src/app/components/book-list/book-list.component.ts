import {Component, Directive, ElementRef, OnInit, Renderer, ViewChild} from '@angular/core';
import {Book} from '../../models/book';
import {AppConst} from '../../constants/app-const';
import {BookService} from '../../services/book.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Photo} from '../../models/photo';
import {DataFilterPipe} from './data-filter.pipe';
import {InputFieldDirective} from '../../directives/input-field.directive';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  public filterQuery = '';
  public rowsOnPage = 5;
  private selectedBook: Book;
  private bookList: Book[];
  private serverPath = AppConst.serverPath;
  private selectedFile: string;
  private images: any[];
  private filterdIds: any[];
  urlList: Photo[];





  constructor(private bookService: BookService,
              private router: Router,
              private route: ActivatedRoute,
              private element: ElementRef) {}


  ngOnInit() {
   /* passing optional parameters across any route*/
   // if there is a filter than sho that, else show all the books
    this.route.queryParams.subscribe(params => {
      if (params['bookList']) {
        console.log('filterd book list');
        this.bookList = JSON.parse(params['bookList']);
      } else {
        this.bookService.getBookList().subscribe(
          res => {
            console.log('show all book list ' + this.rowsOnPage);
            console.log(res as Book[]);
            this.bookList = res as Book[];
          },
          err => {
            console.log(err);
          },
          () => {
            console.log('book list complete and time to get images');
           /* this.images = [];
            for (let i = 0; i < this.bookList.length; i++) {
              this.bookService.getImages(this.bookList[i].id).then((url) => {
                this.selectedFile = url;
               // this.customeDir.setElements(this.selectedFile, this.element);
                this.images[i] = this.selectedFile;
              });
            }*/
           /* const x = this.bookService.getPhotos();
            x.snapshotChanges().subscribe(item => {
              this.urlList = [];
              item.forEach(element => {
                const y = element.payload.toJSON();
                y['$key'] = element.key;
                this.urlList.push(y as Photo);
                this.selectedFile = y['url'];
                console.log(this.selectedFile);
              });
            });*/
            /*this.bookService.getPhotos().snapshotChanges().map(changes => {
              return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
            }).subscribe(customers => {
              this.customers = customers;
            });*/
          }
        );
      }
    });
  }
 /* filterImage(array: any[]) {
    console.log('inside booklist filtering');
    this.filterdIds = [];
    array.forEach(ele => {
      console.log(ele.id);
      this.filterdIds.push(ele.id);
    });
    console.log(this.filterdIds.length);
    console.log(this.filterdIds[0]);
    this.images = [];
    for (let i = 0; i < this.filterdIds.length ; i++) {
      this.bookService.getImages(this.filterdIds [i]).then((url) => {
        this.selectedFile = url;
        this.images[i] = url;
        console.log('calling find images')
        console.log(this.images[i]);
        this.getFilterImage();
      });
    }
  }
  getFilterImage() {
    console.log('inside booklist filtering getter');
    console.log(this.images[0]);
    return this.images;
  }*/
  onSelect(book: Book) {
    this.selectedBook = book;
    this.router.navigate(['/bookDetail', this.selectedBook.id]);
  }
 /* getUrl(id: number) {
    this.bookService.getImages(id).then((url) => {
      return this.selectedFile = url;
    });
  }*/


}
