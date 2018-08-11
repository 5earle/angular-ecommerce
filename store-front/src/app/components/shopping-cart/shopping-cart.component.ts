import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CartService} from '../../services/cart.service';
import {ShoppingCart} from '../../models/shopping-cart';
import {CartItem} from '../../models/cart-item';
import {Book} from '../../models/book';
import {AppConst} from '../../constants/app-const';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  private serverPath = AppConst.serverPath;
  private selectedBook: Book;
  private cartItemList: CartItem[] = [];
  private cartItemNumber: number;
  private shoppingCart: ShoppingCart = new ShoppingCart();
  private cartItemUpdated: boolean;
  private emptyCart: boolean;
  private notEnoughStock: boolean;


  constructor(
    private router: Router,
    private cartService: CartService,
    public FMS: FlashMessagesService
  ) { }

  ngOnInit() {
    this.getCartItemList();
    this.getShoppingCart();
  }
  onSelect(book: Book) {
    this.selectedBook = book;
    this.router.navigate(['/bookDetail', this.selectedBook.id]);
  }
  onRemoveCartItem(cartItem: CartItem) {
    this.cartService.removeCartItem(cartItem.id).subscribe(
      res => {
        console.log(res);
        this.getCartItemList();
        this.getShoppingCart();
      },
      err => {
        console.log(err as string);
      },
      () => {
        console.log('cart item removed completed');
      }
    );
  }
  onUpdateCartItem(cartItem: CartItem) {
    this.cartService.updateCartItem(cartItem.id, cartItem.qty).subscribe(
      res => {
        console.log(res);
        this.FMS.show('Cart Item Updated Successfully!', {cssClass: 'alert-success', timeout: 2000});
        this.cartItemUpdated = true;
        cartItem.toUpdate = false;
        this.getShoppingCart();
      },
      err => {
        console.log(err as string);
      },
      () => {
        console.log('cart item update completed');
      }
    );
  }
  getCartItemList() {
    this.cartService.getCartItemList().subscribe(
      res => {
        console.log(res);
        this.cartItemList = res as CartItem[];
        this.cartItemNumber = this.cartItemList.length;
      },
      err => {
        console.log(err as string);
      },
      () => {
        console.log('cart item recived completed');
      }
    );
  }
  getShoppingCart() {
    this.cartService.getShoppingCart().subscribe(
      res => {
        console.log(res);
        this.shoppingCart = res as ShoppingCart;
      },
      err => {
        console.log(err as string);
      },
      () => {
        console.log('Shopping recived completed');
      }
    );
  }
  onCheckout() {
    if ( this.cartItemNumber === 0) {
      this.emptyCart = true;
      this.FMS.show('your cart is empty. See if you can find what you link in the bookshelf and add them to cart', {cssClass: 'alert-danger', timeout: 2000});
    } else {
      for (const item of this.cartItemList) {
        if (item.qty > item.book.inStockNumber) {
          this.FMS.show('some of the products don\'t have enough stock. Please update product quantity.', {cssClass: 'alert-danger', timeout: 2000});
          console.log('not enough stock on some item');
          this.notEnoughStock = true;
          return;
        }
      }
    }
  }
  deleteQty() {
    for (const item of this.cartItemList) {
      if(item.qty > 0){

      }
    }
  }
}
