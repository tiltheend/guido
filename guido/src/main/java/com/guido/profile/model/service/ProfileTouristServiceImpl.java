package com.guido.profile.model.service;

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

import com.guido.common.model.dto.Reservation;
import com.guido.common.model.dto.Review;
import com.guido.common.model.dto.User;
import com.guido.common.utility.Util;
import com.guido.profile.model.dao.ProfileTouristMapper;


@Service
@PropertySource("classpath:config.properties")
public class ProfileTouristServiceImpl implements ProfileTouristService{

	@Value("${my.userprofile.webpath}")
	private String webPath;
	
	@Value("${my.userprofile.location}")
	private String filePath;
	
	@Autowired
	private ProfileTouristMapper mapper;
	
	// 가이드인지 판매자인지 체크 ( userType: 1 == G / 0 == T)
	@Override
	public int userTypeCheck(int userNo) {
		return mapper.userTypeCheck(userNo);
	}

	// 회원 정보 가져오기 (이메일, 이름, 프로필 이미지, 유저 넘버)
	@Override
	public User userInfo(int userNo) {
		return mapper.userInfo(userNo);
	}

	// 프로필 이미지 수정
	@Override
	public int updateProfile(MultipartFile profileImage, int userNo)  throws IllegalStateException, IOException {
		
		// 프로필 이미지 변경 실패 대비
		// String temp = loginMember.getProfileImage(); // 이전 이미지 저장
		
		// 업로드된 이미지가 있을 경우
		 String rename = null; // 변경 이름 저장 변수
		
		 User user = new User();
		 user.setUserNo(userNo);
		 
		if(profileImage.getSize()>0) { // 업로드된 이미지가 있을 경우
			
			// 1) 파일 이름 저장
			rename = Util.fileRename(profileImage.getOriginalFilename());
			
			// 2) 파일 loginMember에 세팅
			// loginMember.setProfileImage(webPath+profileImg);
			
			user.setProfileImage(webPath+rename);
			
		} else { // 없는 경우(X 버튼)
			// loginMember.setProfileImage(null);
			// 세션 이미지를 null로 변경해서 삭제
			System.out.println("X 버튼");
		}
		
		// 프로필 이미지 수정 mapper 메서드 호출
		// int result = mapper.updateProfile(loginMember);

		int result = mapper.updateProfile(user);
		
		if(result>0) { // 성공
			// 새 이미지가 업로드 된 경우
			if(rename != null) {
				// profileImage.transferTo(new File(filePath+newProfile));
				profileImage.transferTo(new File(filePath+rename));
			}
			
		} else { // 실패
			// 이전 이미지로 프로필을 다시 세팅
			// loginMember.setProfileImage(temp);
			System.out.println("프로필 이미지 변경 실패");
		}
		
		return result; 
	}

	// 구매 내역 가져오기 (상품 번호, 썸네일)
	@Override
	public List<Reservation> reservationList(int userNo) {
		return mapper.reservationList(userNo);
	}

	// 구매 수 카운트
	@Override
	public int reservationCount(int userNo) {
		return mapper.reservationCount(userNo);
	}

	// 내가 쓴 리뷰 내역 가져오기
	@Override
	public List<Review> reviewList(int userNo) {
		return mapper.reviewList(userNo);
	}

	// 리뷰 수 카운트
	@Override
	public int reviewCount(int userNo) {
		return mapper.reviewCount(userNo);
	}

	// 구매자 프로필 자신이 쓴 리뷰 목록 더보기 (3개씩)
	@Override
	public List<Review> myReviewMore(Map<String, Integer> request) {
		return mapper.myReviewMore(request);
	}

	// 리뷰 안쓴 목록 가져오기
	@Override
	public List<Review> addReviewList(int userNo) {
		return mapper.addReviewList(userNo);
	}

	// 리뷰 작성
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int addReview(Review review) {
		return mapper.addReview(review);
	}

	// 리뷰 삭제
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int reviewDel(Review review) {
		return mapper.reviewDel(review);
	}

	// 리뷰 수정
	@Override
	public int reviewEdit(Review review) {
		return mapper.reviewEdit(review);
	}

	// 구매 내역 가져오기 (자세한)
	@Override
	public List<Reservation> myReservation(int userNo) {
		return mapper.myReservation(userNo);
	}
	
	
}
