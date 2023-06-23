package com.guido.product.model.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.guido.common.model.dto.File;
import com.guido.common.model.dto.Product;
import com.guido.common.model.dto.TourTheme;
import com.guido.product.model.dao.ProductUploadMapper;

@Service
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
	public int productUpload(Product product, List<MultipartFile> productImages)  throws IllegalStateException, IOException {
		// TODO Auto-generated method stub
		int result = mapper.productUpload(product);
		
		if(result == 0) return 0;
		
		int productNo = product.getProductNo();
		
		if(productNo > 0) {
			
			List<File> uploadList = new ArrayList<File>();
			
			for(int i=0; i< productImages.size(); i++) {
				
				if(productImages.get(i).getSize() > 0) {
					
					File img = new File();
					
					img.setFilePath(webPath);
					img.setProductNo(productNo);
					img.setFileOrder(i);
					
					String fileName = productImages.get(i).getOriginalFilename();
					
					
					uploadList.add(img);
					
				}
			}
			
//			if(!uploadList.isEmpty() && file)
		}
		
	
		
		return productNo;
	}
	
	
	
	
	
}
