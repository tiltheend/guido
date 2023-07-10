package com.guido.product.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.guido.common.model.dto.File;
import com.guido.common.model.dto.Product;
import com.guido.common.model.dto.ProductDate;
import com.guido.common.model.dto.ProductOption;
import com.guido.common.model.dto.TourCourse;
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
	public int insertImageList(List<File> uploadList);

	
	/** 이미지 수정
	 * @param img
	 * @return
	 */
	public int imageUpdate(File img);

	
	/**이미지 삽입
	 * @param img
	 * @return
	 */
	public int imageInsert(File img);

	
	/**이미지 삭제
	 * @param deleteMap
	 * @return
	 */
	public int imageDelete(Map<String, Object> deleteMap);

	
	/**상품 수정
	 * @param product
	 * @return rowCount
	 */
	public int productEdit(Product product);

	/**투어 코스 리스트 삽입
	 * @param uploadTourCourseList
	 * @return
	 */
	public int insertTourCourseList(List<TourCourse> tourCourseList);

	
	/** product Date insert
	 * @param pd
	 * @return
	 */
	public int insertProductDate(ProductDate pd);


	/** 여행 날짜 insert
	 * @param tempProductOptionList
	 * @return
	 */
	public int insertProductDateList(List<ProductOption> tempProductOptionList);

	public int insertProductOptionList(ProductOption po);

	



	
}
