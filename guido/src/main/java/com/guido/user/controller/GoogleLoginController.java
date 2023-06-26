// 두번째 시도
package com.guido.user.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.view.RedirectView;

import com.guido.user.model.dto.GoogleRequest;
import com.guido.user.model.dto.GoogleResponse;
import com.guido.user.model.dto.GoogleUserInfo;


@RestController
@CrossOrigin("*")
public class GoogleLoginController {
	
	// 구글 로그인
	
		// 1. 구글 로그인 진행
		// 2. 로그인 성공 시, Google 승인서버(Authorization Server)에서 Authorization Code를 제공
		// 3. Google 승인서버(Authorization Server)에 Authorization Code로 Access Token과 교환
		// 4. Access Token으로 Google 자원서버(Resource Server)에 유저자원(유저정보) 요청
		// 5. 유저자원(유저정보) 반환
	
	
    @Value("${google.client.id}")
    private String googleClientId;
    @Value("${google.client.pw}")
    private String googleClientPw;
    
//    @Value("${google.redirect-uri}")
//    private String redirectUri;

//    @RequestMapping(value="/google/login/oauth", method = RequestMethod.POST)
//    public String googleLogin(){
//        String reqUrl = "https://accounts.google.com/o/oauth2/v2/auth?client_id=" + googleClientId
//        		 + "&redirect_uri=http://localhost:80/google/login/oauth&response_type=code&scope=email%20profile%20openid&access_type=offline";
//        return reqUrl;
//    }
    
    // redirectView
    @RequestMapping(value="/google/login/oauth", method = RequestMethod.POST)
    public RedirectView googleLogin(){
    	
    	RedirectView redirectView = new RedirectView();
    	
    	
    	redirectView.setUrl("https://accounts.google.com/o/oauth2/v2/auth?client_id=" + googleClientId
    			+ "&redirect_uri=http://localhost:80/google/login/oauth&response_type=code&scope=email%20profile%20openid&access_type=offline");
    	return redirectView;
    }
    
    
    @RequestMapping(value="/google/login/oauth", method = RequestMethod.GET)
    public String googleLogin(@RequestParam(value = "code") String authCode){
        RestTemplate restTemplate = new RestTemplate();
        GoogleRequest googleOAuthRequestParam = GoogleRequest
                .builder()
                .clientId(googleClientId)
                .clientSecret(googleClientPw)
                .code(authCode)
                .redirectUri("http://localhost:80/google/login/oauth")
                .grantType("authorization_code").build();
        ResponseEntity<GoogleResponse> resultEntity = restTemplate.postForEntity("https://oauth2.googleapis.com/token",
                googleOAuthRequestParam, GoogleResponse.class);
        String jwtToken=resultEntity.getBody().getId_token();
        Map<String, String> map=new HashMap<>();
        map.put("id_token",jwtToken);
        ResponseEntity<GoogleUserInfo> resultEntity2 = restTemplate.postForEntity("https://oauth2.googleapis.com/tokeninfo",
                map, GoogleUserInfo.class);
        String email=resultEntity2.getBody().getEmail();       
        return email;
    }

}



/*
 * 1번째 시도
package com.guido.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.guido.user.model.service.GoogleLoginService;

@RestController
@RequestMapping(value="/google/login/oauth", produces="application/json")
@CrossOrigin("*")
public class GoogleLoginController {
	
	@Autowired
	private GoogleLoginService service;
	
	public GoogleLoginController(GoogleLoginService service) {
		this.service = service;
	}
	
	
	
	// Authorization code 발급
	// 유저가 로그인 마치면 Authorization code를 응답
	@GetMapping
	public void googleLogin(@RequestParam String code) {
        service.googleLogin(code);
    }
	
	// Access Token 발급
	

}
*/
