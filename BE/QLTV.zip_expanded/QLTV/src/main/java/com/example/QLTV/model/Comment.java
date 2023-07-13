package com.example.QLTV.model;

public class Comment {
	private String user;
	private String comment;
	private int star;
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public int getStar() {
		return star;
	}
	public void setStar(int star) {
		this.star = star;
	}
	public Comment(String user, String comment, int star) {
		super();
		this.user = user;
		this.comment = comment;
		this.star = star;
	}
	public Comment() {
		super();
	}
	
	
}