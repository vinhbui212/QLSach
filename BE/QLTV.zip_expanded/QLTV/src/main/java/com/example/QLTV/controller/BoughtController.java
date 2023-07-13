package com.example.QLTV.controller;

import java.io.IOException;
import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.QLTV.model.Bought;
import com.example.QLTV.model.Book;


@RestController
@CrossOrigin("*")
@ComponentScan
public class BoughtController {
	@GetMapping("bought")
	public List<Bought> getBooks() throws IOException {
		Connection connection = null;
		Statement statement = null;
		ResultSet rs = null;
		List<Bought> books = new ArrayList<Bought>();
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/btl_web","root","1234");
			statement = connection.createStatement();
			rs=statement.executeQuery("select * from book_bought");
			while(rs.next()) {
				
				String title= rs.getString("title");
				String author= rs.getString("author");
				String imgUrl=rs.getString("imgUrl");
				int quantity=rs.getInt("quantity");
				books.add(new Bought(title,author,imgUrl,quantity));
				
			}
		}
		catch(Exception e) {
			e.printStackTrace();
		}	
		
		return books;
	}
	@PostMapping("bought")
	public ResponseEntity<String> addBoughtBook(@RequestBody Bought book) {
	    try {
	        Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/btl_web","root","1234");
	        Statement statement = connection.createStatement();
	        String query = "INSERT INTO book_bought (title, author, imgUrl,quantity) VALUES ('"+book.getTitle()+"', '"+book.getAuthor()+"', '"+book.getImgUrl()+"','"+book.getQuantity()+"' )";
	        statement.executeUpdate(query);
	        return ResponseEntity.ok("Book bought added successfully!");
	    } catch(Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding book bought");
	    }
	}
	@DeleteMapping("/bought/{title}")
	public String deleteBookByTitle(@PathVariable("title") String title) {
	    Connection connection = null;
	    PreparedStatement statement = null;
	    try {
	        Class.forName("com.mysql.cj.jdbc.Driver");
	        connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/btl_web","root","1234");

	        // Tạo prepared statement
	        String query = "DELETE FROM book_bought WHERE title = ?";
	        statement = connection.prepareStatement(query);
	        statement.setString(1, title);

	        // Thực thi truy vấn
	        int rowsDeleted = statement.executeUpdate();
	        if (rowsDeleted > 0) {
	            return "Xóa sách có title " + title + " thành công";
	        } else {
	            return "Không tìm thấy sách có title " + title;
	        }
	    } catch (Exception e) {
	        e.printStackTrace();
	        return "Lỗi khi xóa sách có title " + title;
	    } finally {
	        // Đóng connection và statement
	        try {
	            if (statement != null) {
	                statement.close();
	            }
	            if (connection != null) {
	                connection.close();
	            }
	        } catch (SQLException e) {
	            e.printStackTrace();
	        }
	    }
	}

}