package com.example.QLTV.model;

import java.sql.Blob;
import java.sql.Date;

public class Book {
	private int id;
	private String title;
	private String author;
	private String type;
	private Date date;
	private int page;
	private int sold;
	private String img;
	private String imgUrl;
	
	
	
	
	public String getImgUrl() {
		return imgUrl;
	}
	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}
	public String getImg() {
		return img;
	}
	public void setImg(String img) {
		this.img = img;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
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
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	public int getSold() {
		return sold;
	}
	public void setSold(int sold) {
		this.sold = sold;
	}
	public Book(int id, String title, String author, String type, Date date, int page, int sold,String img,String imgUrl) {
		super();
		this.id = id;
		this.title = title;
		this.author = author;
		this.type = type;
		this.date = date;
		this.page = page;
		this.sold = sold;
		this.img=img;
		this.imgUrl=imgUrl;
	}
	public Book() {
		super();
	}
}