package com.guido.qna.model.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.guido.common.model.dto.QNA;

public interface QnaService {

	
	/** 문의 작성
	 * @param qna
	 * @param files
	 * @return
	 */
	int insertQna(QNA qna, List<MultipartFile> files)  throws IllegalStateException, IOException;

}
