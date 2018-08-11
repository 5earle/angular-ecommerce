package com.bookstore.resource;

import com.bookstore.domain.Book;
import com.bookstore.domain.CartItem;
import com.bookstore.domain.ShoppingCart;
import com.bookstore.domain.User;
import com.bookstore.sevice.BookService;
import com.bookstore.sevice.CartItemService;
import com.bookstore.sevice.ShoppingCartService;
import com.bookstore.sevice.userServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.*;

@RestController
@RequestMapping("/cart")
public class ShoppingCartResource {
    @Autowired
    private userServices userService;

    @Autowired
    private BookService bookService;

    @Autowired
    private CartItemService cartItemService;

    @Autowired
    private ShoppingCartService shoppingCartService;

    @RequestMapping(value = "/add")
    public Map<String,String> addItem (@RequestBody HashMap<String, String> mapper, Principal principal){
        String bookId = (String) mapper.get("bookId");
        String qty = (String) mapper.get("qty");
        String name =  new LoginResource().getName();

        //System.out.println("######" + bookId +" " + qty+ " " + new UserResource().passUserAround().getUsername());

        User user = userService.findByUsername(name);
        Optional<Book> book = bookService.findOne(Long.parseLong(bookId));

        if(Integer.parseInt(qty) > book.get().getInStockNumber()) {
            return Collections.singletonMap("bad","Not Enough Stock");
        }

        CartItem cartItem = cartItemService.addBookToCartItem(book.get(), user, Integer.parseInt(qty));

        return Collections.singletonMap("ok","Book Added Successfully!");
    }

    @RequestMapping("/getCartItemList")
    public List<CartItem> getCartItemList(Principal principal) {
        String name = new LoginResource().getName();
        User user = userService.findByUsername(name);
        ShoppingCart shoppingCart = user.getShoppingCart();
        List<CartItem> cartItemList = cartItemService.findByShoppingCart(shoppingCart);
        shoppingCartService.updateShoppingCart(shoppingCart);

        return cartItemList;
    }

    @RequestMapping("/getShoppingCart")
    public ShoppingCart getShoppingCart(Principal principal) {
        String name = new LoginResource().getName();
        User user = userService.findByUsername(name);
        ShoppingCart shoppingCart = user.getShoppingCart();
        shoppingCartService.updateShoppingCart(shoppingCart);

        return shoppingCart;
    }

    @RequestMapping("/removeItem")
    public  Map<String,String> addItemremoveItem(@RequestBody String id) {
        cartItemService.removeCartItem(cartItemService.findById(Long.parseLong(id)).get());
        return Collections.singletonMap("ok","Cart Item Removed Successfully!");
    }

    @RequestMapping("/updateCartItem")
    public Map<String,String> updateCartItem(@RequestBody HashMap<String, String> mapper) {
        String cartItemId = mapper.get("cartItemId");
        String qty = mapper.get("qty");

        Optional<CartItem> cartItem = cartItemService.findById(Long.parseLong(cartItemId));
        cartItem.get().setQty(Integer.parseInt(qty));
        cartItemService.updateCartItem(cartItem.get());


        return Collections.singletonMap("ok","Cart Item Updated Successfully!");
    }
}
