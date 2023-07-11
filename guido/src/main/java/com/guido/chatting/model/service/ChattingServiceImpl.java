package com.guido.chatting.model.service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.guido.chatting.model.dao.ChattingMapper;
import com.guido.chatting.model.dto.ChattingRoom;
import com.guido.chatting.model.dto.Message;
import com.guido.common.model.dto.User;
import com.guido.common.utility.Util;

@Service
public class ChattingServiceImpl implements ChattingService{

    @Autowired
    private ChattingMapper mapper;

    @Override
    public List<ChattingRoom> selectRoomList(int userNo) {
        return mapper.selectRoomList(userNo);
    }
    
    @Override
    public int checkChattingNo(Map<String, Integer> map) {
        return mapper.checkChattingNo(map);
    }

    @Override
    public int createChattingRoom(Map<String, Integer> map) {
    	
    	int result = mapper.createChattingRoom(map);
    	
    	if(result > 0) {
    		return 	(int)map.get("chattingNo");
    	}
    	
        return 0;
    }


    @Override
    public int insertMessage(Message msg) {
//        msg.setMessageContent(Util.XXSHandling(msg.getMessageContent()));
//        msg.setMessageContent(Util.newLineHandling(msg.getMessageContent()));
        return mapper.insertMessage(msg);
    }

    @Override
    public int updateReadFlag(Map<String, Object> paramMap) {
        return mapper.updateReadFlag(paramMap);
    }

    @Override
    public List<Message> selectMessageList( Map<String, Object> paramMap) {
        System.out.println(paramMap);
        List<Message> messageList = mapper.selectMessageList(  Integer.parseInt( String.valueOf(paramMap.get("chattingNo") )));
        
        if(!messageList.isEmpty()) {
            int result = mapper.updateReadFlag(paramMap);
        }
        return messageList;
    }

    // 채팅 상대 검색
	@Override
	public List<User> selectTarget(Map<String, Object> map) {
		return mapper.selectTarget(map);
	}

	// 이미지 업로드
	@Override
	public String uploadImage(MultipartFile image) throws IllegalStateException, IOException {

		String rename = Util.fileRename(image.getOriginalFilename());

		String filePath = "C:/guidoImages/chatting/";

		File folder = new File(filePath);

		if(!folder.exists()) folder.mkdir(); // 폴더 없으면 생성

		image.transferTo(new File(filePath+ rename));

		return "/images/chatting/"+rename;
	}
    

    
    
    

    
    
}
