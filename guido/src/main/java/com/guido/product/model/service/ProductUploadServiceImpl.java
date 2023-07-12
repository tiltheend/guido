package com.guido.product.model.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import com.guido.common.model.dto.ProductDate;
import com.guido.common.model.dto.ProductOption;
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
	public int productUpload(Product product, List<MultipartFile> images, String tourCourse2, String productOption)  throws IllegalStateException, IOException {

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
//			System.out.println(tourCourseList);

			
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
			
			List<ProductOption> productOptionList = new Gson().fromJson(productOption, new TypeToken<List<ProductOption>>() {}.getType());
			List<ProductDate> productDateList = new Gson().fromJson(productOption, new TypeToken<List<ProductDate>>() {}.getType());
			List<ProductOption> tempProductOptionList = new ArrayList<>();
			List<ProductDate> tempProductDateList = new ArrayList<>();
			
			for(int i=0; i<productDateList.size(); i++) {
				ProductDate pd = new ProductDate();
				
				pd.setProductNo(productNo);
				pd.setProductDate(productDateList.get(i).getProductDate());
				pd.setAvailability(productDateList.get(i).getAvailability());
				tempProductDateList.add(pd);
				
				
				result = mapper.insertProductDate(pd);
				
				
				// 투어 패키지가 1이라면 == 당일 투어라면
				if(product.getProductPackage() == 1) {
				
					ProductOption po = new ProductOption();
					String optionNameString = productOptionList.get(0).getOptionName();
					String[] optionNameArr = optionNameString.split(",");
					
						for(int j=0; j<optionNameArr.length; j++) {
						
							optionNameArr[j] = optionNameArr[j].trim();
	
							po.setProductNo(productNo);
							po.setOptionRestCount(productOptionList.get(j).getOptionRestCount());
							po.setOptionName(optionNameArr[j]);
							po.setProductDateNo(pd.getProductDateNo());
							tempProductOptionList.add(po);
							
							result = mapper.insertProductOptionList(po);
							
						
					}
				
				}
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
					  , String tourCourse2) throws IllegalStateException, IOException {
		
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
				
				
				
		}
		
		
		return rowCount;
	}

	//여행상품 삭제
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int productDelete(int productNo) {
		return mapper.productDelete(productNo);
	}


	
			
	
	
	
	
}
