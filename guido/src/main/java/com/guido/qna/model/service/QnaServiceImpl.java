package com.guido.qna.model.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.guido.common.exception.FileUploadException;
import com.guido.common.model.dto.File;
import com.guido.common.model.dto.QNA;
import com.guido.common.utility.Util;
import com.guido.qna.model.dao.QnaMapper;

@Service
@PropertySource("classpath:/config.properties")
public class QnaServiceImpl implements QnaService{
	
	@Autowired
	private QnaMapper mapper;

	
	@Value("${my.qna.webpath}")
	private String webPath;
	
	@Value("${my.qna.location}")
	private String filePath;
	
	
	// 문의 작성
	@Transactional(rollbackFor=Exception.class)
	@Override
	public int insertQna(QNA qna, List<MultipartFile> files) throws IllegalStateException, IOException {
		
		 qna.setQnaTitle(Util.XXSHandling(qna.getQnaTitle()));
		 qna.setQnaContent(Util.XXSHandling(qna.getQnaContent()));
		
		 int result = mapper.insertQna(qna);
		 
		 if(result==0) return 0;
			 
		 
		 int qnaNo = qna.getQnaNo();
		 
		 
		 if(qnaNo>0) {
			 List<File> imageList = new ArrayList<>();
			 
			 for(int i=0; i<files.size(); i++) {
				 
				 if(files.get(i).getSize()>0) {
					 
					 File file = new File();
					 
					 file.setFileOrder(i);
					 file.setFilePath(webPath);			 
					 file.setQnaNo(qnaNo);
					 file.setFilePath(Util.fileRename(files.get(i).getOriginalFilename()));

					 imageList.add(file);
						
				 }
			 }
			 
			 
			 if(imageList.isEmpty()) {
				 result = mapper.insertImageList(imageList);
				 
				 
				 if(result == imageList.size()) {
						for(int i=0; i<imageList.size(); i++) {
							
							int index = imageList.get(i).getFileOrder();
							
							String rename = imageList.get(i).getFilePath();

							files.get(index).transferTo(new java.io.File(filePath + rename));
						}
						
						
				 }else {
					 
					 throw new FileUploadException();
				 }
			 
			 }
		
		 }
		 
		 return qnaNo;
	
	}
	
	
}
