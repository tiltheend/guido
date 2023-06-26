package com.guido.product.model.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.guido.common.model.dto.File;
import com.guido.common.model.dto.Product;
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
	
	

	@Transactional(rollbackFor = Exception.class)
	@Override
	public int productUpload(Product product, List<MultipartFile> images)  throws IllegalStateException, IOException {

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
				
				if(result == uploadList.size()) {
					
					for(int i=0; i<uploadList.size(); i++) {
						
						int index = uploadList.get(i).getFileOrder();
						
					}
					
				}else {
					throw new FileUploadException(); // 강제로 예외 발생시킴..왜?->예외가 발생해야지만 롤백 
				}
			}	
		}
		return productNo;
	}
	
	
	
	
	
}
