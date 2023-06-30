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


	/** 여행 상품 수정 서비스
	 * @param product
	 * @param images
	 * @param deleteList
	 * @return
	 * @throws IllegalStateException
	 * @throws IOException
	 */
	int productEdit(Product product, List<MultipartFile> images, String deleteList)throws IllegalStateException, IOException;

}
