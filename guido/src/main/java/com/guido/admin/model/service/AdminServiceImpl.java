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
import com.guido.common.model.dto.User;
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
	public Map<String, Object> selectEventList(int cp) {
		int listCount = mapper.getListCount("EVENT");
		Pagination pagination = new Pagination(listCount, cp);
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		List<Event> list = mapper.selectEventList(null,rowBounds);
		
		Map<String, Object> map = new HashMap<String, Object>();

		map.put("pagination", pagination);
		map.put("list", list);
		
		return map;
	}
	
	// 이벤트 디테일 페이지
	@Override
	public Event selectEvent(int eventNo) {
		// 이벤트 번호로 이벤트 셀렉트 
		Event event = mapper.selectEvent(eventNo);
		// 0번 인덱스는 썸네일이므로 삭제.
		if(!event.getFileList().isEmpty())
			event.getFileList().remove(0);
		return event;
	}
	
	
	
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int eventWrite(Event event, List<MultipartFile> files)  throws IllegalStateException, IOException {
		int result = mapper.insertEvent(event);
		if(result > 0) {
			int eventNo = event.getEventNo();
			List<File> uploadList = new ArrayList<>();
			
			for(int i=0;i<files.size();i++) {
				if(files.get(i).getSize() > 0) {
					File file = new File();
					String rename = Util.fileRename(files.get(i).getOriginalFilename());
					System.out.println(eventFilePath);
					System.out.println(rename);
					files.get(i).transferTo(new java.io.File(eventFilePath+rename));
					file.setFilePath(eventWebPath+rename);
					file.setEventNo(eventNo);
					file.setFileOrder(i);
					uploadList.add(file);
				}
			}
			
			if( !uploadList.isEmpty() ) {
				result = mapper.insertFileList(uploadList);
				if(uploadList.size() != result) {
					throw new FileUploadException();
				}
			}
		}
		return result;
	}
	
	@Override
	public Map<String, Object> selectTouristList(int cp) {
		int listCount = mapper.getUserListCount("T");
		
		Pagination pagination = new Pagination(listCount, cp);
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		List<User> list = mapper.selectTouristList(null,rowBounds);
		Map<String, Object> map = new HashMap<String, Object>();

		map.put("pagination", pagination);
		map.put("list", list);
		
		return map;
	}
	
	@Override
	public Map<String, Object> selectGuideList(int cp) {
		int listCount = mapper.getUserListCount("G");
		
		Pagination pagination = new Pagination(listCount, cp);
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		List<User> list = mapper.selectGuideList(null,rowBounds);
		Map<String, Object> map = new HashMap<String, Object>();

		map.put("pagination", pagination);
		map.put("list", list);
		System.out.println(list);
		
		return map;
	}
}