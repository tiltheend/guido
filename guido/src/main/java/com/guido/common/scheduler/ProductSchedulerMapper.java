package com.guido.common.scheduler;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.guido.common.model.dto.Product;
import com.guido.common.model.dto.ProductDate;

@Mapper
public interface ProductSchedulerMapper {

	// 스케줄러 모든 상품 조회
	List<Product> selectProductList();

	// 스케줄러 - 마지막 일정이 현재 날짜보다 이른 경우 상태 변경
	void updateProductAvailability(int productNo);
	

	// 현재 날짜보다 이전인 일정 조회
	List<ProductDate> selectPassedDateList();

	// 현재 날짜보다 이전인 일정 사용 불가 처리
	void updatePassedDateList(ProductDate pd);
	
}
