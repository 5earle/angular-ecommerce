package com.bookstore.repository;

import com.bookstore.domain.BillingAddress;
import org.springframework.data.repository.CrudRepository;

public interface BillingAddressRepository  extends CrudRepository<BillingAddress, Long> {
}
