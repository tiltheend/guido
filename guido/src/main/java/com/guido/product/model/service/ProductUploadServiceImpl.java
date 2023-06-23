package com.guido.product.model.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
	public int productUpload(Product product)  throws IllegalStateException, IOException {
		// TODO Auto-generated method stub
		int result = mapper.productUpload(product);
		
		if(result == 0) return 0;
		
		int productNo = product.getProductNo();
		
		
			
			
//			if(!uploadList.isEmpty() && file)
		
		
	
		
		return productNo;
	}
	
	
	
	
	
}
