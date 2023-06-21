package com.guido.product.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.guido.common.model.dto.Product;
import com.guido.common.model.dto.TourTheme;

@Mapper
public interface ProductUploadMapper {

	List<TourTheme> selectTourTheme();

	int productUpload(Product product);

}
