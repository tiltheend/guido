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
import com.guido.common.model.dto.ProductDate;
import com.guido.common.model.dto.ProductOption;
import com.guido.common.model.dto.Reservation;
import com.guido.common.model.dto.User;
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
				
				// 예약 가능 수량(1박 : 옵션 or n박 : 날짜) 업데이트
				mapper.updateAvailability(reservation);

				// 당일 상품의 경우
				if(reservation.getProductPackage()==1) {
					// PRODUCT_DT의 모든 옵션 조회 후 구매 가능 수량이 모두 0이면
					// 해당 일정(날짜) PRODUCT_DT_AVAILABILITY = 'N' 처리
					if(mapper.selectCountCanReserveOption(reservation)==0) {
	
						// 임의로 0 처리
						reservation.setProductPackage(0);
						// 해당 일정(날짜) 구매 불가능하도록 업데이트
						mapper.updateAvailability(reservation);
					}
				}
				
				// 특정 상품의 모든 일정(날짜) 구매 가능 수량 조회 후 구매 가능한 날짜가 없다면
				if(mapper.selectCountCanReserveDate(reservation) == 0)
					return mapper.updateProductUnavailable(reservation);
				else
					return 1;
				
			}
			
		}else 
			// 예약 가능한 수량 초과(예약 불가능)
			checkAvailable = -1;
		
		return checkAvailable;
		
	}


	// 예약 확인
	@Override
	public Reservation selectReservation(Map map) {
		return mapper.selectReservation(map);
	}
	
	
	// 예약 취소
	@Override
	@Transactional(rollbackFor=Exception.class)
	public void reservationCancel(Reservation reservation) throws IOException {
	 
	    if(!"".equals(reservation.getImpUid())) {
	        String token = getToken();
	        int amount = paymentInfo(reservation.getImpUid(), token);
	        paymentCancel(token, reservation.getImpUid(), amount, reservation.getCancelReason());
	    }
	    
	    int result = mapper.reservationCancel(reservation);
	    
	    if(result>0) {
	    	
	    	// 예약 가능 수량(1박: 시간대, n박:옵션) 업데이트
	    	int result2 = mapper.updateDateOrOption(reservation);
	    	
	    	if(result2>0) {
	    		
	    		int productPackage = reservation.getProductPackage();
	    		
	    		// 1박의 경우 예약 가능 
	    		if(productPackage==1) {
	    			
	    			// 특정 PROUDCT_DT(일정)의 모든 옵션(시간대) 조회 후 구매 가능 수량이 0 이상이면
	    			if(mapper.selectCountCanReserveOption(reservation)>0) {
	    				
	    				// PROUDCT_DT 테이블의 PRODUCT_DT_AVAILABILITY = 'Y' 처리 
	    				//  -> 특정 일정 구매 가능하도록 업데이트(임의로 -1 처리)
	    				reservation.setProductPackage(-1);
	    				mapper.updateDateOrOption(reservation);
	    			}
	    		}
	    		
	    		// 구매 가능한 일정 수 조회 후 PRODUCT_DT_AVAILABILITY가 하나라도 'Y' 인 경우
	    		if(mapper.selectCountCanReserveDate(reservation)>0) {
	    			
	    			// 특정 상품 판매중으로 변경
	    			mapper.updateProductAvailability(reservation);
	    		}
	    			
	    	}
	    		
	    }
	    
	}


	// 예약 날짜(일정) 정보 조회
	@Override
	public ProductDate selectReservationDate(Map<String, Object> map) {
		return mapper.selectReservationDate(map);
	}


	// 비상 연락처 업데이트
	@Override
	public void updateEmergencyContact(User loginUser) {
		mapper.updateEmergencyContact(loginUser);
	}
	

}
