//package com.guido.common.config;
//
//import java.util.HashMap;
//import java.util.Map;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.context.annotation.PropertySource;
//
//import com.paypal.base.rest.APIContext;
//import com.paypal.base.rest.OAuthTokenCredential;
//import com.paypal.base.rest.PayPalRESTException;
//
//@Configuration
//@PropertySource("classpath:/config.properties")
//public class PaypalConfig {
//
//	@Value("${paypal.client.app}")
//	private String clientID;
//	
//	@Value("${paypal.client.secret}")
//	private String clientSecret;
//	
//	@Value("${paypal.mode}")
//	private String mode;
//	
//	@Bean
//	public Map<String, String> paypalSdkConfig(){
//		Map<String, String> configMap = new HashMap<>();
//		configMap.put("mode", mode);
//		return configMap;
//	}
//	
//	@Bean
//	public OAuthTokenCredential oAuthTokenCredential() {
//		return new OAuthTokenCredential(clientID, clientSecret, paypalSdkConfig());
//	}
//
//	@Bean
//	public APIContext apiContext() throws PayPalRESTException{
//		APIContext context = new APIContext(oAuthTokenCredential().getAccessToken());
//		context.setConfigurationMap(paypalSdkConfig());
//		return context;
//	}
//	
//	
//}
