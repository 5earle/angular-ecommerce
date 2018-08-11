package com.bookstore.repository;

import com.bookstore.domain.security.Role;
import org.springframework.data.repository.CrudRepository;

public interface roleRepository extends CrudRepository<Role, Long> {
}
