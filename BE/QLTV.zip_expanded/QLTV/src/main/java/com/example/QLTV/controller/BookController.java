package com.example.QLTV.controller;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.Blob;
import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.imageio.ImageIO;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.QLTV.model.Book;

import jakarta.servlet.MultipartConfigElement;

@RestController
@CrossOrigin("*")
@ComponentScan
public class BookController {
	
	public static final String PROJECT_PATH = System.getProperty("user.dir");
	public static final String IMAGE_LOCAL_STORE_PATH = "image/";
	
	@GetMapping("book")
	public List<Book> getBooks() throws IOException {
		Connection connection = null;
		Statement statement = null;
		ResultSet rs = null;
		List<Book> books = new ArrayList<Book>();
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/btl_web","root","1234");
			statement = connection.createStatement();
			rs=statement.executeQuery("select * from book_admin");
			while(rs.next()) {
				int id = rs.getInt("id");
				String title= rs.getString("title");
				String author= rs.getString("author");
				String type= rs.getString("type");
				Date date= rs.getDate("date");
				int page = rs.getInt("page");
				int sold = rs.getInt("sold");
				String img=rs.getString("img");
				String imgUrl=rs.getString("imgUrl");
				books.add(new Book(id,title,author,type,date,page,sold,img,imgUrl));
				
			}
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		
		
		
		return books;
	}
	@GetMapping("/book/{id}")
	public ResponseEntity<Book> getBook(@PathVariable String id) {

	    Connection connection = null;
	    PreparedStatement ps = null;
	    ResultSet result = null;
	    Book book = new Book();

	    try {
	        Class.forName("com.mysql.cj.jdbc.Driver");
	        connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/btl_web", "root", "1234");
	        ps = connection.prepareStatement("select * from book_admin where id = ?");
	        ps.setInt(1, Integer.valueOf(id));
	        result = ps.executeQuery();

	        while (result.next()) {
	            book.setId(result.getInt("id"));
	            book.setTitle(result.getString("title"));
	            book.setAuthor(result.getString("author"));
	            book.setType(result.getString("type"));
	            book.setDate(result.getDate("date"));
	            book.setPage(result.getInt("page"));
	            book.setSold(result.getInt("sold"));
	            book.setImg(result.getString("img"));
	            book.setImgUrl(result.getString("imgUrl"));
	        }

	        if (book.getId() == 0) {
	            return ResponseEntity.notFound().build();
	        } else {
	            return ResponseEntity.ok().body(book);
	        }

	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	    } 
	    
	}
	@PutMapping("/book/{id}")
	public ResponseEntity<?> updateBook(@PathVariable String id, @RequestBody Book book) {
	    Connection connection = null;
	    PreparedStatement ps = null;

	    try {
	        Class.forName("com.mysql.cj.jdbc.Driver");
	        connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/btl_web", "root", "1234");
	        ps = connection.prepareStatement("update book_admin set title=?, author=?, type=?, date=?, page=?, sold=?,img=? where id=?");
	        ps.setString(1, book.getTitle());
	        ps.setString(2, book.getAuthor());
	        ps.setString(3, book.getType());
	        ps.setDate(4, book.getDate());
	        ps.setInt(5, book.getPage());
	        ps.setInt(6, book.getSold());
	        ps.setString(7, book.getImg());
	        ps.setInt(8, Integer.valueOf(id));
	        int result = ps.executeUpdate();
	        if (result == 0) {
	            return ResponseEntity.notFound().build();
	        } else {
	            return ResponseEntity.ok().build();
	        }
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	    } 
	}
	


	@PostMapping("/book")
	public ResponseEntity<Map<String, Object>> addBook(@RequestParam("title") String title,
	                                       @RequestParam("author") String author,
	                                       @RequestParam("type") String type,
	                                       @RequestParam("date") Date date,
	                                       @RequestParam("page") int page,
	                                       
	                                       @RequestParam("img") MultipartFile img)
	 										{
	    try {
	    	if (img.getSize() > MAX_IMAGE_SIZE) {
	            throw new IllegalArgumentException("The image file is too large");
	        }
	        String uploadDir = "C:\\Users\\THINKPAD\\eclipse-workspace\\QLTV.zip_expanded\\QLTV\\image";
	        File file = new File(uploadDir + "/" + img.getOriginalFilename());
	        img.transferTo(file);
	        String imgUrl = "http://localhost:8080/image/" + img.getOriginalFilename();

	       
	        Class.forName("com.mysql.cj.jdbc.Driver");
	        Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/btl_web","root","1234");
	        String query = "INSERT INTO book_admin (title, author, type, date, page, img, imgUrl) SELECT ?, ?, ?, ?, ?, ?, ? FROM DUAL WHERE NOT EXISTS (SELECT * FROM book_admin WHERE title = ? AND author = ?)";
	        PreparedStatement statement = connection.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
	        statement.setString(1, title);
	        statement.setString(2, author);
	        statement.setString(3, type);
	        statement.setDate(4, new java.sql.Date(date.getTime()));
	        statement.setInt(5, page);
	        statement.setString(6, file.getName());
	        statement.setString(7, imgUrl);
	        statement.setString(8, title);
	        statement.setString(9, author);
	        int rowsInserted = statement.executeUpdate();

	        if (rowsInserted > 0) {
	            ResultSet rs = statement.getGeneratedKeys();
	            rs.next();
	            int bookId = rs.getInt(1);
	            Map<String, Object> data = new HashMap<>();
	            data.put("bookId", bookId);
	            data.put("imgUrl", imgUrl);
	            return new ResponseEntity<>(data, HttpStatus.CREATED);
	        } else {
	            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    } catch (Exception e) {
	        e.printStackTrace();
	        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
	
	

	
	@GetMapping("/image/{imageName}")
    public ResponseEntity<byte[]> getImage(@PathVariable String imageName) throws IOException {
        BufferedImage bImage = ImageIO.read(new File(IMAGE_LOCAL_STORE_PATH + imageName));
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        ImageIO.write(bImage, "png", bos );
        byte[] imageBytes = bos.toByteArray();
        return ResponseEntity.ok().body(imageBytes);
    }
	

	
	
	


	private final long MAX_IMAGE_SIZE = 2 * 1024 * 1024;



	@DeleteMapping("book/{id}")
	public String deleteBook(@PathVariable int id) throws IOException {
	    Connection connection = null;
	    Statement statement = null;
	    try {
	        Class.forName("com.mysql.cj.jdbc.Driver");
	        connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/btl_web","root","1234");

	        // Get the image URL of the book before deleting it from the database
	        String imageUrlQuery = "SELECT imgUrl FROM book_admin WHERE id=?";
	        PreparedStatement imageUrlStatement = connection.prepareStatement(imageUrlQuery);
	        imageUrlStatement.setInt(1, id);
	        ResultSet resultSet = imageUrlStatement.executeQuery();
	        if (resultSet.next()) {
	            String imageUrl = resultSet.getString("imgUrl");

	            // Delete the book from the database
	            String deleteQuery = "DELETE FROM book_admin WHERE id=?";
	            PreparedStatement deleteStatement = connection.prepareStatement(deleteQuery);
	            deleteStatement.setInt(1, id);
	            int rowsAffected = deleteStatement.executeUpdate();

	            if (rowsAffected > 0) {
	                // Delete the book file from the specified directory
	                String uploadDir = "C:\\Users\\THINKPAD\\eclipse-workspace\\QLTV.zip_expanded\\QLTV\\image";
	                String fileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
	                File file = new File(uploadDir + "/" + fileName);
	                if (file.delete()) {
	                    return "Book with id " + id + " and associated file have been deleted.";
	                } else {
	                    return "Error deleting book file for id " + id;
	                }
	            } else {
	                return "No book found with id " + id;
	            }
	        } else {
	            return "No book found with id " + id;
	        }
	    } catch(Exception e) {
	        e.printStackTrace();
	        return "Error deleting book with id " + id;
	    } finally {
	        try {
	            if(statement != null) statement.close();
	            if(connection != null) connection.close();
	        } catch (SQLException e) {
	            e.printStackTrace();
	        }
	    }
	}
}