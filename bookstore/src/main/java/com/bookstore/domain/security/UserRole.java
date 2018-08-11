package com.bookstore.domain.security;

import com.bookstore.domain.User;

import java.io.Serializable;

import javax.persistence.*;


@Entity
@Table(name="user_role")   // optional
public class UserRole implements Serializable {
    private static final long serialVersionUID = 890345L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long userRoleId;

    public UserRole () {}

    public UserRole (User user, Role role) {
        this.user = user;
        this.role = role;
    }


    @ManyToOne(cascade = CascadeType.PERSIST,fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    /*LAZY = fetch when needed,  EAGER = fetch immediately*/
    @ManyToOne(fetch = FetchType.EAGER)
    private Role role;

    public long getUserRoleId() {
        return userRoleId;
    }

    public void setUserRoleId(long userRoleId) {
        this.userRoleId = userRoleId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }


}
