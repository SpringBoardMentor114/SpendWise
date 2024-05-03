package com.springboard.spendwise.controller;

import java.util.List;

import com.springboard.spendwise.model.Category;
import com.springboard.spendwise.service.CategoryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@CrossOrigin
@RestController
@RequestMapping("/spendwise/category")
public class CategoryController {
    
    @Autowired
    CategoryService categoryService;

    @PostMapping("/")
    public Category createCategory(@Valid @RequestBody Category category) {
        return categoryService.createCategory(category);
    }

    @GetMapping("/")
    public ResponseEntity<List<Category>> getAllCategory() {
        return new ResponseEntity<>(categoryService.getCategories(), HttpStatus.FOUND);
    }

    @GetMapping("/{categoryId}")
    public Category getCategoryByCategoryId(@PathVariable Long categoryId){
        return categoryService.getCategoryByCategoryId(categoryId);
    }

    @DeleteMapping("/{categoryId}")
    public void deleteCategory(@PathVariable Long categoryId){
        categoryService.deleteCategory(categoryId);
    }

    @PostMapping("/{categoryId}/update")
    public Category updateCategory(@Valid @PathVariable Long categoryId, @Valid @RequestBody Category category) {
        return categoryService.updateCategory(categoryId, category);
    }
}
