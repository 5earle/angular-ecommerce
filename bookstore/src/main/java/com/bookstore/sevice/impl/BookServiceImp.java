package com.bookstore.sevice.impl;

import com.bookstore.domain.Book;
import com.bookstore.repository.BookRepository;
import com.bookstore.sevice.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImp implements BookService {
    @Autowired
    private BookRepository bookRepository;

    public List<Book> findAll() {
        List<Book> bookList = (List<Book>) bookRepository.findAll();

        List<Book> activeBookList = new ArrayList<>();

        for (Book book : bookList) {
            if(book.isActive()) {
                activeBookList.add(book);
            }
        }

        return activeBookList;
    }

    public Optional<Book> findOne(Long id) {
        return bookRepository.findById(id);
    }

    public Book save(Book book) {
        return bookRepository.save(book);
    }

    public List<Book> blurrySearch(String keyword) {
        List<Book> bookList = bookRepository.findByTitleContaining(keyword);

        List<Book> activeBookList = new ArrayList<>();

        for (Book book : bookList) {
            if(book.isActive()) {
                activeBookList.add(book);
            }
        }

        return activeBookList;
    }

    public void removeOne(Long id) {
        bookRepository.deleteById(id);
    }
}
