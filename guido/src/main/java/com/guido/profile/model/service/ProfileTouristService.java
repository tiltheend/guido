package com.guido.profile.model.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.guido.common.model.dto.Reservation;
import com.guido.common.model.dto.User;

public interface ProfileTouristService {
	
	/** 가이드인지 판매자인지 체크 ( userType: 1 == G / 0 == T)
	 * @param userNo
	 * @return
	 */
	int userTypeCheck(int userNo);

	/** 회원 정보 가져오기 (이메일, 이름, 프로필 이미지)
	 * @param userNo
	 * @return
	 */
	User userInfo(int userNo);

	/** 프로필 이미지 수정
	 * @param profileImage
	 * @param userNo
	 * @return
	 */
	int updateProfile(MultipartFile profileImage, int userNo) throws IllegalStateException, IOException;

	/** 구매 내역 가져오기 (상품 번호, 썸네일)
	 * @param userNo
	 * @return
	 */
	List<Reservation> reservationList(int userNo);

	/** 구매 수 카운트
	 * @param userNo
	 * @return
	 */
	int reservationCount(int userNo);

}
