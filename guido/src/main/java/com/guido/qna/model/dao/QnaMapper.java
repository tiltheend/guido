package com.guido.qna.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.guido.common.model.dto.File;
import com.guido.common.model.dto.QNA;

@Mapper
public interface QnaMapper {

	// 문의 작성
	int insertQna(QNA qna);

	// 문의 파일 삽입
	int insertFileList(List<File> imageList);

}
