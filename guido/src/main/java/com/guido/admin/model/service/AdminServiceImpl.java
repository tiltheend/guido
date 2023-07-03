package com.guido.admin.model.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.guido.admin.model.dao.AdminMapper;
import com.guido.common.exception.FileUploadException;
import com.guido.common.model.dto.Event;
import com.guido.common.model.dto.File;
import com.guido.common.model.dto.Pagination;
import com.guido.common.model.dto.QNA;
import com.guido.common.utility.Util;

@Service
@PropertySource("classpath:/config.properties")
public class AdminServiceImpl implements AdminService {

	@Value("${my.event.webpath}")
	private String eventWebPath;

	@Value("${my.event.location}")
	private String eventFilePath;

	@Autowired
	private AdminMapper mapper;

	@Override
	public Map<String, Object> selectList(String pageName, int cp) {
		int listCount = mapper.getListCount(pageName);
		Pagination pagination = new Pagination(listCount, cp);
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("list", mapper.selectList(pageName, rowBounds));
		map.put("pagination", pagination);
		
		return map;
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public int writeEvent(Event event, List<MultipartFile> files) throws IllegalStateException, IOException {
		int result = mapper.insertEvent(event);
		if (result > 0) {
			int eventNo = event.getEventNo();
			List<File> uploadList = new ArrayList<>();

			for (int i = 0; i < files.size(); i++) {
				if (files.get(i).getSize() > 0) {
					File file = new File();
					String rename = Util.fileRename(files.get(i).getOriginalFilename());
					System.out.println(eventFilePath);
					System.out.println(rename);
					files.get(i).transferTo(new java.io.File(eventFilePath + rename));
					file.setFilePath(eventWebPath + rename);
					file.setEventNo(eventNo);
					file.setFileOrder(i);
					uploadList.add(file);
				}
			}

			if (!uploadList.isEmpty()) {
				result = mapper.insertFileList(uploadList);
				if (uploadList.size() != result) {
					throw new FileUploadException();
				}
			}
		}
		return result;
	}

	@Override
	public QNA selectQNA(int qnaNo) {
		QNA qna = mapper.selectQNA(qnaNo);
		System.out.println(qna);
		return qna;
	}
	
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int writeAnswer(QNA qna) {
		return mapper.writeAnswer(qna);
	}
	
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int approveGuide(List<Integer> userNoList) {
		return mapper.approveGuide(userNoList);
	}

	@Override
	public List<Map<String,String>> selectMainEventList() {
		return mapper.selectMainEventList();
	}
	
	
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int setMainBanner(Map<String, Object> data) {
		mapper.deleteMainBanner(data.get("order"));
		return mapper.setMainBanner(data);
	}
}