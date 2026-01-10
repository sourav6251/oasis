package com.oasis.controller;

import com.oasis.model.Blog;
import com.oasis.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blogs")
@CrossOrigin(origins = "*")
public class BlogController {

    @Autowired
    private BlogService blogService;

    @GetMapping
    public List<Blog> getAllBlogs() {
        return blogService.getAllBlogs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Blog> getBlogById(@PathVariable Long id) {
        return blogService.getBlogById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Blog createBlog(@RequestBody Blog blog) {
        return blogService.saveBlog(blog);
    }
}
