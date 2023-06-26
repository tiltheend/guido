package com.guido.product.model.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.guido.common.model.dto.Product;
import com.guido.common.model.dto.TourTheme;

public interface ProductUploadService {

//	int uploadProduct(Product product, List<MultipartFile> productImages);

	List<TourTheme> selectTourTheme();


	int productUpload(Product product, List<MultipartFile> images)throws IllegalStateException, IOException;

}
