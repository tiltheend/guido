package com.guido.reservation.model.service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.URL;
import java.util.Map;

import javax.net.ssl.HttpsURLConnection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.guido.common.model.dto.ProductOption;
import com.guido.common.model.dto.Reservation;
import com.guido.reservation.model.dao.ReservationMapper;

import lombok.Getter;
import lombok.ToString;

@Service
@PropertySource("classpath:/config.properties")
public class ReservationServiceImpl implements ReservationService{
	
	@Autowired
	private ReservationMapper mapper;
	
	
	@Value("${portone.api.key}")
	private String impKey;
	
	@Value("${portone.api.secret}")
	private String impSecret;
	
	@ToString
	@Getter
	private class Response{
		private PaymentInfo response;
	}
	
	@ToString
	@Getter
	private class PaymentInfo{
		private int amount;
	}

	// 예약 가능한 일정(날짜)인지 확인 (1: 가능, 0: 불가능)
	@Override
	public int selectDateInRange(Map<String, Object> map) {
		return mapper.selectDateInRange(map);
	}

	
	// 상품의 메인 코스명
	@Override
	public String selectMainCourseName(Integer productNo) {
		return mapper.selectMainCourseName(productNo);
	}


	// 상품의 옵션 조회
	@Override
	public ProductOption selectProductOption(int optionNo) {
		return mapper.selectProductOption(optionNo);
	}


	// 아임포트 API 키와 SECRET키로 토큰 생성
	@Override
	public String getToken() throws IOException {
		
		HttpsURLConnection conn = null;
		 
		URL url = new URL("https://api.iamport.kr/users/getToken");

		conn = (HttpsURLConnection) url.openConnection();

		conn.setRequestMethod("POST");
		conn.setRequestProperty("Content-type", "application/json");
		conn.setRequestProperty("Accept", "application/json");
		conn.setDoOutput(true);
		JsonObject json = new JsonObject();

		json.addProperty("imp_key", impKey);
		json.addProperty("imp_secret", impSecret);
		
		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
		
		bw.write(json.toString());
		bw.flush();
		bw.close();

		BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"));

		Gson gson = new Gson();

		String response = gson.fromJson(br.readLine(), Map.class).get("response").toString();
		
		System.out.println(response);

		String token = gson.fromJson(response, Map.class).get("access_token").toString();

		br.close();
		conn.disconnect();

		return token;
	}


	// 토큰으로 결제 정보 가져오기
	@Override
	public int paymentInfo(String imp_uid, String access_token) throws IOException {

		HttpsURLConnection conn = null;
		 
	    URL url = new URL("https://api.iamport.kr/payments/" + imp_uid);
	 
	    conn = (HttpsURLConnection) url.openConnection();
	 
	    conn.setRequestMethod("GET");
	    conn.setRequestProperty("Authorization", access_token);
	    conn.setDoOutput(true);
	 
	    BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"));
	    
	    Gson gson = new Gson();
	    
	    Response response = gson.fromJson(br.readLine(), Response.class);
	    
	    br.close();
	    conn.disconnect();
	    
	    return response.getResponse().getAmount();
	}


	@Override
	public void paymentCancel(String access_token, String imp_uid, int amount, String reason) throws IOException {
		
		System.out.println("결제 취소");
		
		System.out.println(access_token);
		
		System.out.println(imp_uid);
		
		HttpsURLConnection conn = null;
		URL url = new URL("https://api.iamport.kr/payments/cancel");
 
		conn = (HttpsURLConnection) url.openConnection();
 
		conn.setRequestMethod("POST");
 
		conn.setRequestProperty("Content-type", "application/json");
		conn.setRequestProperty("Accept", "application/json");
		conn.setRequestProperty("Authorization", access_token);
 
		conn.setDoOutput(true);
		
		JsonObject json = new JsonObject();
 
		json.addProperty("reason", reason);
		json.addProperty("imp_uid", imp_uid);
		json.addProperty("amount", amount);
		json.addProperty("checksum", amount);
 
		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
 
		bw.write(json.toString());
		bw.flush();
		bw.close();
		
		BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"));
 
		br.close();
		conn.disconnect();
	}


	// 예약 데이터 추가
	@Override
	@Transactional(rollbackFor=Exception.class)
	public int insertReservation(Reservation reservation) {
		
		
		// 예약 데이터 삽입 전 예약 가능한 상품인지 확인
		int checkAvailable = mapper.checkAvailable(reservation);
		
		// 수량 O
		if(checkAvailable>0) {
			
			// 예약 데이터 삽입
			int result = mapper.insertReservation(reservation);
			
			// 예약 성공
			if(result>0) {
				return mapper.updateAvailability(reservation);
			}
			
		}else 
			// 예약 가능한 수량 초과(예약 불가능)
			checkAvailable = -1;
		
		return checkAvailable;
		
	}


	// 예약 확인
	@Override
	public Reservation selectReservation(String orderNumber) {
		return mapper.selectReservation(orderNumber);
	}
	
	
	// 예약 취소
	@Override
	public void reservationCancel(Reservation reservation) throws IOException {
	 
	    if(!"".equals(reservation.getImpUid())) {
	        String token = getToken();
	        int amount = paymentInfo(reservation.getImpUid(), token);
	        paymentCancel(token, reservation.getImpUid(), amount, reservation.getCancelReason());
	    }
	    
	    mapper.reservationCancel(reservation);
	    
	}
	

}
