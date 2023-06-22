package com.guido.profile.model.service;

import java.io.File;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
	public int userTypeCheck(int memberNo) {
		return mapper.userTypeCheck(memberNo);
	}

	// 회원 정보 가져오기 (이메일, 이름, 프로필 이미지)
	@Override
	public User userInfo(int memberNo) {
		return mapper.userInfo(memberNo);
	}

	// 프로필 이미지 수정
	@Override
	public int updateProfile(MultipartFile profileImage, int memberNo)  throws IllegalStateException, IOException {
		
		// 프로필 이미지 변경 실패 대비
		// String temp = loginMember.getProfileImage(); // 이전 이미지 저장
		
		// 업로드된 이미지가 있을 경우
		 String rename = null; // 변경 이름 저장 변수
		
		 User user = new User();
		 user.setUserNo(memberNo);
		 
		 // System.out.println(user.getUserNo()+"나와??");
		if(profileImage.getSize()>0) { // 업로드된 이미지가 있을 경우
			
			// 1) 파일 이름 저장
			rename = Util.fileRename(profileImage.getOriginalFilename());
			
			// 2) 파일 loginMember에 세팅
			// loginMember.setProfileImage(webPath+profileImg);
			
			user.setProfileImage(webPath+rename);
			// System.out.println(user.getProfileImage()+"나와??");
			
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
	
	
	
}
