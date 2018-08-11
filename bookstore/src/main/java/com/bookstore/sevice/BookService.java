package com.bookstore.sevice;

import com.bookstore.domain.Book;

import java.util.List;
import java.util.Optional;


public interface BookService {
    List<Book> findAll();
    Optional<Book> findOne(Long id);
    Book save(Book book);
    List<Book> blurrySearch(String item);
    void removeOne(Long id);
}
