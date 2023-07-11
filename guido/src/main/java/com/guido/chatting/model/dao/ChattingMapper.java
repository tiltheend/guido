package com.guido.chatting.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.guido.chatting.model.dto.ChattingRoom;
import com.guido.chatting.model.dto.Message;
import com.guido.common.model.dto.User;

@Mapper
public interface ChattingMapper {
    
    
    public List<ChattingRoom> selectRoomList(int userNo);

    public int checkChattingNo(Map<String, Integer> map);

    public int createChattingRoom(Map<String, Integer> map);

    public int insertMessage(Message msg);

    public int updateReadFlag(Map<String, Object> paramMap);
    
    public List<Message> selectMessageList(int chattingNo);
    
	public List<User> selectTarget(Map<String, Object> map);
	
}
