package com.guido.product.model.service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.guido.common.model.dto.Product;
import com.guido.common.model.dto.TourTheme;

public interface ProductUploadService {

//	int uploadProduct(Product product, List<MultipartFile> productImages);

	List<TourTheme> selectTourTheme();


	/** 여행 상품 등록
	 * @param product
	 * @param images
	 * @param tourCourse2
	 * @param productDate 
	 * @return
	 * @throws IllegalStateException
	 * @throws IOException
	 * @throws SQLException
	 */
	public int productUpload(Product product, List<MultipartFile> images, String tourCourse2, String productOption)throws IllegalStateException, IOException;


	/** 여행 상품 수정 서비스
	 * @param product
	 * @param images
	 * @param deleteList
	 * @param tourCourse2 
	 * @return
	 * @throws IllegalStateException
	 * @throws IOException
	 */
	public int productEdit(Product product, List<MultipartFile> images, String deleteList, String tourCourse2)throws IllegalStateException, IOException;


	/**여행 상품 삭제
	 * @param productNo
	 * @return
	 */
	public int productDelete(int productNo);


}
