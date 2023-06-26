package com.guido.product.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.guido.common.model.dto.File;
import com.guido.common.model.dto.Product;
import com.guido.common.model.dto.TourTheme;

@Mapper
public interface ProductUploadMapper {

	List<TourTheme> selectTourTheme();

	/** 여행 상품 등록
	 * @param product
	 * @return productNo
	 */
	public int productUpload(Product product);

	/** 이미지 리스트 insert
	 * @param uploadList
	 * @return
	 */
	int insertImageList(List<File> uploadList);

}
