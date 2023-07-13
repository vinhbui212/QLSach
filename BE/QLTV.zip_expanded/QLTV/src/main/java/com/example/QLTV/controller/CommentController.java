package com.example.QLTV.controller;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.QLTV.model.Bought;
import com.example.QLTV.model.Comment;

@RestController
@CrossOrigin("*")
public class CommentController {
	@GetMapping("comment")
	public List<Comment> getComments() throws IOException {
		Connection connection = null;
		Statement statement = null;
		ResultSet rs = null;
		List<Comment> comments = new ArrayList<Comment>();
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/btl_web","root","1234");
			statement = connection.createStatement();
			rs=statement.executeQuery("select * from comment");
			while(rs.next()) {
				
				String user= rs.getString("user");
				String comment= rs.getString("comment");
				int star=rs.getInt("star");
				comments.add(new Comment(user,comment,star));
				
			}
		}
		catch(Exception e) {
			e.printStackTrace();
		}	
		
		return comments;
	}
	@PostMapping("comment")
	public ResponseEntity<String> addComment(@RequestBody Comment comment) {
	    try {
	        
	        Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/btl_web","root","1234");
	        Statement statement = connection.createStatement();
	        String query = "SELECT * FROM comment WHERE user='" + comment.getUser() + "'";
	        ResultSet rs = statement.executeQuery(query);
	        if (rs.next()) {
	            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User has already commented");
	        }
	        
	        
	        query = "INSERT INTO comment (user, comment, star) VALUES ('"+comment.getUser()+"', '"+comment.getComment()+"', '"+comment.getStar()+"' )";
	        statement.executeUpdate(query);
	        return ResponseEntity.ok("Comment added successfully!");
	    } catch(Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding comment");
	    }
	}

}
