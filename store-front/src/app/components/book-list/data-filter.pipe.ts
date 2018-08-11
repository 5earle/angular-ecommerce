import * as _ from 'lodash';  // works on arrays , collections etc
import {Pipe, PipeTransform} from '@angular/core';
import {BookService} from '../../services/book.service';
import {BookListComponent} from './book-list.component';
import {AngularFireDatabase} from 'angularfire2/database';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';



@Pipe({
  name: 'dataFilter'
})

export class DataFilterPipe implements PipeTransform {
  private selectedFile: string;
  private bookList: BookListComponent;

  constructor(private bookService: BookService, private router: Router, private route: ActivatedRoute) {}
  transform(array: any[], query: string): any {
    if (query) {
      console.log('filtering ' + query);
      const arrays = _.filter(array, row => row.description.indexOf(query) > -1);
      // _.filter Iterates over elements of collection, returning an array of all elements
      return _.filter(array, row => row.title.indexOf(query) > -1);
    }
    return array;
  }

}
