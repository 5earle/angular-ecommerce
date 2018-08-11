package com.bookstore.domain.security;

import java.io.Serializable;

import org.springframework.security.core.GrantedAuthority;

public class Authority implements GrantedAuthority, Serializable {
	private static final long serialVersionUID = 123123L;
	private final String authority;
	
	public Authority(String authority) {
		this.authority = authority;
	}
	
	@Override
	public String getAuthority() {
		return authority;
	}
}

/*
GrantedAuthority: include READ_AUTHORITY, WRITE_PRIVILEGE, or even CAN_EXECUTE_AS_ROOT.*/

/*
Serializable:  convert its state to a byte
		stream so that the byte stream can be reverted
		back into a copy of the object*/
