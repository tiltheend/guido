package com.guido.common.scheduler;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.guido.common.model.dto.Product;
import com.guido.common.model.dto.ProductDate;
import com.guido.common.model.dto.Reservation;
import com.guido.product.model.service.ProductDetailService;

// 매일 정각 12시에 상품의 마지막 일정이 당일 날짜보다 이전인 경우에 
// 상품의 상태를 ongoing->finished로 변경
@Component
public class ProductAvailabilityScheduler {
	
	@Autowired
	private ProductDetailService service;
	
	@Scheduled(cron = "0 0 0,12 * * ?")
//	@Scheduled(cron = "0 * * * * ?")
	public void executeTask() throws ParseException {
		
		
		List<ProductDate> pdList = service.selectPassedDateList();
		
		// 현재 날짜보다 이전인 일정 사용 불가 처리
		for(ProductDate pd : pdList) {
			service.updatePassedDateList(pd);
		}
		
		
		List<Product> productList = service.selectProductList();
		
		for(Product p : productList) {
			
			List<ProductDate> productDateList = p.getProductDateList();
			
			if(productDateList.size()!=0) {
				
				String productLastDate = productDateList.get(productDateList.size()-1).getProductDate();
				
				// 현재 날짜와 시간을 가져옴
				Date currentDate = new Date();
				
				// 마지막 일정을 Date로 변환
				DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
				Date targetDate = dateFormat.parse(productLastDate);
				
				// 두 날짜를 비교
				int comparisonResult = currentDate.compareTo(targetDate);
				
				if (comparisonResult > 0) {
					service.updateProductAvailability(p.getProductNo());
				}
			}
			
		}
		
		
		// 예약 내역 구매 확정 처리 (끝난 투어 일정)
		List<Reservation> reservationList = service.selectFinishedReservationList();
		
		
		if(reservationList.size()!=0) {
			
			for(Reservation reservation : reservationList) {
				
				service.updateFinishedReservationList(reservation);
			}
			
		}
		
	}
}
