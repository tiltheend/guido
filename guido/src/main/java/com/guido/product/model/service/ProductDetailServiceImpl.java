package com.guido.product.model.service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.guido.common.model.dto.PR;
import com.guido.common.model.dto.Product;
import com.guido.common.model.dto.ProductDate;
import com.guido.common.model.dto.ProductOption;
import com.guido.common.model.dto.Reservation;
import com.guido.common.model.dto.Review;
import com.guido.common.model.dto.User;
import com.guido.common.scheduler.ProductSchedulerMapper;
import com.guido.common.utility.Util;
import com.guido.product.model.dao.ProductDetailMapper;

@Service
@PropertySource("classpath:/config.properties")	
public class ProductDetailServiceImpl implements ProductDetailService{
	
	@Autowired
	private ProductDetailMapper mapper;
	
	@Autowired
	private ProductSchedulerMapper schedulerMapper;

	
	@Value("${my.faceimg.webpath}")
	private String webPath;
	
	@Value("${my.faceimg.location}")
	private String filePath;
	
	
	// 상품 상세 조회
	@Override
	public Product selectProduct(int productNo) {
		return mapper.selectProduct(productNo);
	}


	// 특정 상품 리뷰 목록 조회
	@Override
	public List<Review> selectReviewList(int productNo) {
		return mapper.selectReviewList(productNo);
	}


	// 특정 상품 작성자 정보 조회
	@Override
	public User selectGuideInfo(int userNo) {
		return mapper.selectGuideInfo(userNo);
	}


	// 자기소개 조회
	@Override
	public PR selectPR(int userNo) {
		return mapper.selectPR(userNo);
	}


	// 특정 상품 옵션 목록 조회
	@Override
	public List<String> selectOptionList(int productNo) {
		return mapper.selectOptionList(productNo);
	}


	// 관심 상품 등록 여부 체크
	@Override
	public int selectWishCheck(Map<String, Integer> map) {
		return mapper.selectWishCheck(map);
	}


	// 관심 상품 등록 처리
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int updateWish(Map<String, Integer> map) {
	
		int result = 0;
		
		// 관심상품 등록 X
		if(map.get("check")==1)
			result = mapper.insertProductWish(map);
		else
			result = mapper.deleteProductWish(map);
		
		if(result==0) return -1;
		
		return result;
	}


	// 인기 상품 랜덤 조회
	@Override
	public List<Product> selectPopularList() {
		return mapper.selectPopularList();
	}


	// 추천 상품 조회 - 가이드 언어 일치하는 상품 랜덤으로
	@Override
	public List<Product> selectRecommendList(int userNo) {
		return mapper.selectRecommendList(userNo);
	}


	// 얼굴 인증 사진 업로드
	@Override
	public int updateFaceImg(User loginUser, MultipartFile faceImg) throws IllegalStateException, IOException {
		
		
		String rename = null;		// 변경 이름 저장 변수
		
		if(faceImg.getSize()>0) {		// 업로드 된 이미지가 있을 경우
			
			rename = Util.fileRename(faceImg.getOriginalFilename());
			
			loginUser.setFaceImg(webPath + rename);
			
		}else {	
			loginUser.setFaceImg(null);
		}
		
		
		int result = mapper.updateFaceImg(loginUser);
		
		
		if(result>0) {	// 성공
			
			// 새 이미지가 업로드 된 경우
			if(rename != null) {
				faceImg.transferTo(new File(filePath + rename));
			}
			
		}else {	// 실패
			// 이전 이미지로 프로필 다시 세팅
			loginUser.setFaceImg(null);
		}
		
		return result;
	}


	// 캘린더 날짜 불러오기
	@Override
	public List<ProductDate> selectCalendarDates(Map<String, Object> map) {
		return mapper.selectCalendarDates(map);
	}


	// 날짜 선택 시 옵션 불러오기
	@Override
	public List<ProductOption> getOptionInfo(Map<String, Object> map) {
		return mapper.getOptionInfo(map);
	}


	// 스케줄러 모든 상품 조회
	@Override
	public List<Product> selectProductList() {
		return schedulerMapper.selectProductList();
	}


	// 스케줄러 - 마지막 일정이 현재 날짜보다 이른 경우 상태 변경
	@Override
	public void updateProductAvailability(int productNo) {
		schedulerMapper.updateProductAvailability(productNo);
	}


	// 상품 전체 일정 조회
	@Override
	public List<ProductDate> selectAllProductDateList(int productNo) {
		return mapper.selectAllProductDateList(productNo);
	}


	// 현재 날짜보다 이전인 일정 조회
	@Override
	public List<ProductDate> selectPassedDateList() {
		return schedulerMapper.selectPassedDateList();
	}

	// 현재 날짜보다 이전인 일정 사용 불가 처리
	@Override
	public void updatePassedDateList(ProductDate pd) {
		schedulerMapper.updatePassedDateList(pd);
	}


	// 투어 일정이 현재 날짜보다 이전인 (이미 끝난) 예약 내역 조회
	@Override
	public List<Reservation> selectFinishedReservationList() {
		return schedulerMapper.selectFinishedReservationList();
	}


	// 투어 일정이 현재 날짜보다 이전인 (이미 끝난) 예약 내역 구매확정 처리
	@Override
	public void updateFinishedReservationList(Reservation reservation) {
		schedulerMapper.updateFinishedReservationList(reservation);
	}

}