package com.example.QLTV.model;

public class User {
	private int id;
	private String username;
	private String password;
	private String role;
	private String email;
	
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public User(int id, String username, String password, String role,String email) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.role = role;
		this.email=email;
	}
	public User() {
		super();
	}
	
	
}
