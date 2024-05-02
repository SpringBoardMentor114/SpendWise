package com.springboard.spendwise.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboard.spendwise.exception.ResourceAlreadyExistsException;
import com.springboard.spendwise.exception.ResourceNotFoundException;
import com.springboard.spendwise.model.Category;
import com.springboard.spendwise.repository.CategoryRepository;
import com.springboard.spendwise.service.CategoryService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    CategoryRepository categoryRepository;



    @Override
    public Category createCategory(Category category) {
        if (categoryAlreadyExists(category.getCategoryName())){
            throw  new ResourceAlreadyExistsException("This Category already exists : " + category.getCategoryName());
        }
        return categoryRepository.save(category);
    }

    private boolean categoryAlreadyExists(String categoryName) {
        Category category = categoryRepository.findByCategoryName(categoryName);
        return category != null;
    }

    @Override
    public List<Category> getCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getCategoryByCategoryId(Long categoryId) {
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category id not found with the id : " + categoryId));
    }

    @Override
    public Category updateCategory(Long categoryId, Category category) {
        Category existingCategory = categoryRepository.findById(categoryId)
                            .orElseThrow(() -> new ResourceNotFoundException("Category id not found with the id : " + categoryId));

        if (!existingCategory.getCategoryName().equals(category.getCategoryName())){    
            if (categoryAlreadyExists(category.getCategoryName())){
                throw new ResourceAlreadyExistsException("Category already exists with the category name : " + category.getCategoryName());
            }    
        } 
        
        existingCategory.setCategoryName(category.getCategoryName());
        
        return categoryRepository.save(existingCategory);
    }

    @Override
    public void deleteCategory(Long categoryId) {
        if (!categoryRepository.existsById(categoryId)){
            throw new ResourceNotFoundException("Sorry, category not found");
        }

        categoryRepository.deleteById(categoryId);
    }

}
