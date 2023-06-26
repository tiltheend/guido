package com.guido.user.model.service;

import org.springframework.stereotype.Service;

@Service
public class GoogleLoginServiceImpl implements GoogleLoginService{
	
	
	
	
}




// 첫번째 시도
/*

package com.guido.user.model.service;

import org.springframework.core.env.Environment;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.guido.common.model.dto.User;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class GoogleLoginServiceImpl implements GoogleLoginService{
	
	private final Environment env;
    private final RestTemplate restTemplate = new RestTemplate();
    
    public GoogleLoginServiceImpl(Environment env) {
    	this.env = env;
    }
    
    
	@Override
	public void googleLogin(String code) {
		// Authorization code
//		System.out.println("권한 부여 코드 = " + code);
		
		// Access Token (밑에 메서드 참조)
		String accessToken = getAccessToken(code);
//        System.out.println("accessToken = " + accessToken);
		
		JsonNode userResourceNode = getUserResource(accessToken);
		
		User googleUser = new User();
        log.info("userResource = {}", googleUser);
        
        // 구글 로그인 user 정보 셋 
        googleUser.setUserEmail(userResourceNode.get("email").asText());
//        googleUser.setProfileImage(userResourceNode.get("profile?").asText());
        
        log.info("email = {}", googleUser.getUserEmail());
//        log.info("profile? = {}", googleUser.getProfileImage());
        log.info("======================================================");
	}

	// Access Token 발급
									// 위의 권한 부여 코드
	private String getAccessToken(String authorizationCode) {
		String clientId = env.getProperty("oauth2.google.client-id");
        String clientSecret = env.getProperty("oauth2.google.client-secret");
        String redirectUri = env.getProperty("oauth2.google.redirect-uri");
        String tokenUri = env.getProperty("oauth2.google.token-uri");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", authorizationCode);
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);
        params.add("redirect_uri", redirectUri);
        params.add("grant_type", "authorization_code");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity entity = new HttpEntity(params, headers);

        ResponseEntity<JsonNode> responseNode = restTemplate.exchange(tokenUri, HttpMethod.POST, entity, JsonNode.class);
        JsonNode accessTokenNode = responseNode.getBody();
        return accessTokenNode.get("access_token").asText();
	}
	
	// 유저 정보 얻기
	private JsonNode getUserResource(String accessToken) {
        String resourceUri = env.getProperty("oauth2.google.resource-uri");

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        HttpEntity entity = new HttpEntity(headers);
        return restTemplate.exchange(resourceUri, HttpMethod.GET, entity, JsonNode.class).getBody();
        
	}
	
	

}

*/
