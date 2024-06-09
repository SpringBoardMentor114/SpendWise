package com.springboard.spendwise.controller;

import java.util.List;

import com.springboard.spendwise.model.Category;
import com.springboard.spendwise.service.CategoryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin
@RestController
@RequestMapping("/spendwise/category")
public class CategoryController {
    
    @Autowired
    CategoryService categoryService;

    @PostMapping("/")
    @PreAuthorize("hasRole('ADMIN')")
    public Category createCategory(@RequestBody Category category) {
        return categoryService.createCategory(category);
    }

    @GetMapping("/")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Category> getAllCategory() {
        return categoryService.getCategories();
    }

    @GetMapping("/{categoryId}")
    @PreAuthorize("hasRole('ADMIN')")
    public Category getCategoryByCategoryId(@PathVariable Long categoryId){
        return categoryService.getCategoryByCategoryId(categoryId);
    }

    @DeleteMapping("/{categoryId}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteCategory(@PathVariable Long categoryId){
        categoryService.deleteCategory(categoryId);
    }

    @PostMapping("/{categoryId}/update")
    @PreAuthorize("hasRole('ADMIN')")
    public Category updateCategory(@PathVariable Long categoryId, @RequestBody Category category) {
        return categoryService.updateCategory(categoryId, category);
    }
}
