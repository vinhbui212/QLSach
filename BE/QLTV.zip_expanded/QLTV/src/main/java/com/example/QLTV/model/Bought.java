package com.example.QLTV.model;

public class Bought {
	private String title;
	private String author;
	private String imgUrl;
	private int quantity;
	
	
	
	
	
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public String getImgUrl() {
		return imgUrl;
	}
	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}
	public Bought(String title, String author, String imgUrl,int quantity) {
		super();
		this.title = title;
		this.author = author;
		this.imgUrl = imgUrl;
		this.quantity=quantity;
		
	}
	public Bought() {
		super();
	}
}
