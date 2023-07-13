package com.example.QLTV.controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.QLTV.model.User;

@RestController
@Configuration
@CrossOrigin("*")
public class UserController{
	@PostMapping("/check-access")

	public ResponseEntity<String> checkAccess(@RequestBody User user) {
	    Connection conn = null;
	    PreparedStatement ps = null;
	    ResultSet rs = null;

	    try {
	        Class.forName("com.mysql.cj.jdbc.Driver");
	        conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/btl_web", "root", "1234");

	        String sql = "SELECT * FROM manage WHERE username=? AND password=?";
	        ps = conn.prepareStatement(sql);
	        ps.setString(1, user.getUsername());
	        ps.setString(2, user.getPassword());

	        rs = ps.executeQuery();

	        if (rs.next()) {
	            String role = rs.getString("role");
	            if (role.equals("admin")) {
	                return ResponseEntity.ok().body("Admin access granted!");
	            } else if (role.equals("user")) {
	                return ResponseEntity.ok().body("User access granted!");
	            }
	        }
	        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied.");
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error checking access.");
	    } finally {
	        try {
	            if (rs != null) {
	                rs.close();
	            }
	            if (ps != null) {
	                ps.close();
	            }
	            if (conn != null) {
	                conn.close();
	            }
	        } catch (SQLException e) {
	            e.printStackTrace();
	        }
	    }
	}
	@PostMapping("/add-user")
	public ResponseEntity<String> addUser(@RequestBody User user) {
	    Connection conn = null;
	    PreparedStatement ps = null;

	    try {
	        Class.forName("com.mysql.cj.jdbc.Driver");
	        conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/btl_web", "root", "1234");
	        
	        String checkSql = "SELECT COUNT(*) FROM manage WHERE username=?";
	        PreparedStatement checkPs = conn.prepareStatement(checkSql);
	        checkPs.setString(1, user.getUsername());
	        ResultSet checkRs = checkPs.executeQuery();
	        checkRs.next();
	        int count = checkRs.getInt(1);
	        if (count > 0) {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already exists.");
	        }
	        
	        String sql = "INSERT INTO manage (username, password,role, email) VALUES (?, ?, ?,?)";
	        ps = conn.prepareStatement(sql);
	        ps.setString(1, user.getUsername());
	        ps.setString(2, user.getPassword());
	        ps.setString(3, "user");
	        ps.setString(4, user.getEmail());
	        
	        int result = ps.executeUpdate();

	        if (result > 0) {
	            return ResponseEntity.ok().body("User added successfully!");
	        } else {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding user.");
	        }
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding user.");
	    } finally {
	        try {
	            if (ps != null) {
	                ps.close();
	            }
	            if (conn != null) {
	                conn.close();
	            }
	        } catch (SQLException e) {
	            e.printStackTrace();
	        }
	    }
	}

}
