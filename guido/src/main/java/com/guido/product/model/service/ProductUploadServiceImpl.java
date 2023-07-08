package com.guido.product.model.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSessionException;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.guido.common.model.dto.File;
import com.guido.common.model.dto.Product;
import com.guido.common.model.dto.TourCourse;
import com.guido.common.model.dto.TourTheme;
import com.guido.common.utility.Util;
import com.guido.product.model.dao.ProductUploadMapper;

@Service
@PropertySource("classpath:/config.properties")
public class ProductUploadServiceImpl implements ProductUploadService{
	
	@Autowired
	private ProductUploadMapper mapper;

	@Value("${my.product.webpath}")
	private String webPath;
	
	@Value("${my.product.location}")
	private String filePath;

	@Override
	public List<TourTheme> selectTourTheme() {
		return mapper.selectTourTheme();
	}
	
	
	//여행 상품 등록
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int productUpload(Product product, List<MultipartFile> images, String tourCourse2)  throws IllegalStateException, IOException {

		int result = mapper.productUpload(product);
		
		if(result == 0) return 0;
		
		int productNo = product.getProductNo();
		
		if(productNo > 0) {
			
			List<File> uploadList = new ArrayList<File>();
			
			
			for(int i=0 ; i<images.size(); i++) {
				
				// i번째 요소에 업로드한 파일이 있다면
				if(images.get(i).getSize() > 0 ) {
					
					File img = new File();
					
					String rename = Util.fileRename(images.get(i).getOriginalFilename());
					System.out.println(webPath);
					System.out.println(rename);
					
					images.get(i).transferTo(new java.io.File(filePath+rename));
					
					img.setFilePath(webPath+rename); 
					img.setProductNo(productNo); 
					img.setFileOrder(i); 
			
					uploadList.add(img);
				}
			}
			
			if( !uploadList.isEmpty()) {
				
				result = mapper.insertImageList(uploadList);
				
				if(result != uploadList.size()) {
					
					throw new FileUploadException();
				}
			}
			
			
			List<TourCourse> tourCourseList = new Gson().fromJson(tourCourse2, new TypeToken<List<TourCourse>>() {}.getType());
			List<TourCourse> tempTourCourseList = new ArrayList<>();
			System.out.println(tourCourseList);
			System.out.println(tourCourseList.get(0));
			System.out.println(tourCourseList.size());
			
			for (int j = 0; j < tourCourseList.size(); j++) {
				
				TourCourse tc = new TourCourse();
				
				tc.setProductNo(productNo);
				tc.setCourseName(tourCourseList.get(j).getCourseName());
				tc.setCourseOrder(tourCourseList.get(j).getCourseOrder());
				tc.setLatitude(tourCourseList.get(j).getLatitude());
				tc.setLongitude(tourCourseList.get(j).getLongitude());
				tc.setBossCourseFL(tourCourseList.get(j).getBossCourseFL());
			    tempTourCourseList.add(tc);
			    
				
			}
			
			if(!tempTourCourseList.isEmpty()) {
				
				result = mapper.insertTourCourseList(tempTourCourseList);
			}
		}
		return productNo;
		
	}


	//여행 상품 수정
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int productEdit(
						Product product
					  , List<MultipartFile> images
					  , String deleteList
					  , String tourCourse2
					  , String tourCourseDeleteList) throws IllegalStateException, IOException {
		
		int rowCount = mapper.productEdit(product);
		
		//수정 성공 시 
		if(rowCount > 0) {
			
			if(!deleteList.equals("")) { // 삭제할 이미지가 있다면?
				
				// deleteList에 작성된 이미지 모두 삭제
				Map<String, Object> deleteMap = new HashMap<>();
				deleteMap.put("productNo", product.getProductNo());
				deleteMap.put("deleteList", deleteList);
				
				rowCount = mapper.imageDelete(deleteMap);
				
				if(rowCount == 0) {
					throw new FileUploadException();
				}
			}
			
			//새롭게 업로드 된 이미지 분류 작업
			// images : 실제 파일이 담긴 List
			//         -> input type="file" 개수만큼 요소가 존재
			//         -> 제출된 파일이 없어서 MultipartFile 객체가 존재
						
			List<File> uploadList = new ArrayList<>();
			
			for(int i=0 ; i<images.size(); i++) {
				
				if(images.get(i).getSize() > 0) {
				
					File img = new File();
					
					String rename = Util.fileRename(images.get(i).getOriginalFilename());
					images.get(i).transferTo(new java.io.File(filePath+rename));
					
					img.setFilePath(webPath+rename); 
					img.setProductNo(product.getProductNo()); 
					img.setFileOrder(i); 
			
					uploadList.add(img);
					
					rowCount = mapper.imageUpdate(img);
					
					if(rowCount == 0) {
						// 수정 실패 == DB에 이미지가 없었다 
						// -> 이미지를 삽입
						rowCount = mapper.imageInsert(img);
					}
				}
			
			}
				
				if(!uploadList.isEmpty()) {
					for(int i=0 ; i<uploadList.size();i++) {
						int index = uploadList.get(i).getFileOrder();
						
						String rename = Util.fileRename(images.get(i).getOriginalFilename());
						images.get(i).transferTo(new java.io.File(filePath+rename));
			}	
		}
				
				
				//투어 코스 변경사항 있을 시 수정 사항 반영하기(삭제 or 추가)
				if(!tourCourseDeleteList.equals("")) { // 삭제할 투어 코스가 있을 때
					
					Map<String, Object> deleteTourCourseListMap = new HashMap<>();
					deleteTourCourseListMap.put("productNo", product.getProductNo());
					deleteTourCourseListMap.put("tourCourseDeleteList", tourCourseDeleteList);
					
					rowCount = mapper.tourCourseDelete(deleteTourCourseListMap);
					
					if(rowCount == 0) {
						throw new SqlSessionException();
					}
				}
				
				// JS에서 JSON 형태로 받아온 tourCourseList(객체 배열) => Java List로 변형
				List<TourCourse> tourCourseList = new Gson().fromJson(tourCourse2, new TypeToken<List<TourCourse>>() {}.getType());
				
				List<TourCourse> uploadTourCourse = new ArrayList<>();
				
				for (int j = 0; j < tourCourseList.size(); j++) {
					
					TourCourse tc = new TourCourse();
					
					tc.setCourseName(tourCourseList.get(j).getCourseName());
					tc.setCourseOrder(tourCourseList.get(j).getCourseOrder());
					tc.setLatitude(tourCourseList.get(j).getLatitude());
					tc.setLongitude(tourCourseList.get(j).getLongitude());
					tc.setBossCourseFL(tourCourseList.get(j).getBossCourseFL());
					uploadTourCourse.add(tc);
				    
					rowCount = mapper.tourCourseUpdate(tc);
					
					if(rowCount == 0) {
						// 수정 실패 == DB에 이미지가 없었다 
						// -> 이미지를 삽입
						rowCount = mapper.tourCourseInsert(tc);
					}
				
				}
				
				if(!uploadTourCourse.isEmpty()) {
					for(int i=0 ; i<uploadTourCourse.size();i++) {
						
						int index = uploadTourCourse.get(i).getCourseOrder();
						
			}	
		}
				
	}
		
		return rowCount;
	}


	
	
	
	
}
