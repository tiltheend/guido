// 두번째 시도
package com.guido.user.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import com.guido.common.model.dto.User;
import com.guido.user.model.dto.GoogleRequest;
import com.guido.user.model.dto.GoogleResponse;
import com.guido.user.model.dto.GoogleUserInfo;
import com.guido.user.model.service.GoogleLoginService;

@SessionAttributes({"loginUser","googleEmail"})
@Controller
//@CrossOrigin("*")
public class GoogleLoginController {
	
	// 구글 로그인
	
		// 1. 구글 로그인 진행
		// 2. 로그인 성공 시, Google 승인서버(Authorization Server)에서 Authorization Code를 제공
		// 3. Google 승인서버(Authorization Server)에 Authorization Code로 Access Token과 교환
		// 4. Access Token으로 Google 자원서버(Resource Server)에 유저자원(유저정보) 요청
		// 5. 유저자원(유저정보) 반환
	
	@Autowired
	private GoogleLoginService service;
	
//	
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
    @ResponseBody
    @RequestMapping(value="/google/login/oauth", method = RequestMethod.POST)
    public RedirectView googleLogin(){
    	
    	RedirectView redirectView = new RedirectView();
    	
    	
    	redirectView.setUrl("https://accounts.google.com/o/oauth2/v2/auth?client_id=" + googleClientId
    			// localhost
    			+ "&redirect_uri=http://localhost:80/google/login/oauth&response_type=code&scope=email%20profile%20openid&access_type=offline"
    			// 학원 발표용
//    			+ "&redirect_uri=http://class-a.xyz/google/login/oauth&response_type=code&scope=email%20profile%20openid&access_type=offline"
    			);
    	return redirectView;
    }
    
    // 구글 로그인 / 이메일 이용 회원가입
    @RequestMapping(value="/google/login/oauth", method = RequestMethod.GET)
    public String googleLogin(@RequestParam(value = "code") String authCode, Model model, RedirectAttributes ra){
        RestTemplate restTemplate = new RestTemplate();
        GoogleRequest googleOAuthRequestParam = GoogleRequest
                .builder()
                .clientId(googleClientId)
                .clientSecret(googleClientPw)
                .code(authCode)
                // localhost
                .redirectUri("http://localhost:80/google/login/oauth")
                // 학원 발표용
//                .redirectUri("http://class-a.xyz/google/login/oauth")
                .grantType("authorization_code").build();
        ResponseEntity<GoogleResponse> resultEntity = restTemplate.postForEntity("https://oauth2.googleapis.com/token",
                googleOAuthRequestParam, GoogleResponse.class);
        String jwtToken=resultEntity.getBody().getId_token();
        Map<String, String> map=new HashMap<>();
        map.put("id_token",jwtToken);
        ResponseEntity<GoogleUserInfo> resultEntity2 = restTemplate.postForEntity("https://oauth2.googleapis.com/tokeninfo",
                map, GoogleUserInfo.class);
        
        String email=resultEntity2.getBody().getEmail();  
        String picture=resultEntity2.getBody().getPicture();
        
        //---------------
        
        // 가입된 회원인지 확인
        User googleUser = service.checkGoogleSignedup(email);
        
        String path = null;
        
        // 가입된 회원이면 로그인
        if(googleUser != null) {
        	path = "redirect:/";
        	model.addAttribute("loginUser", googleUser);
        	ra.addFlashAttribute("message", "즐거운 여행되세요!");
        }else { // 가입된 회원 아니면 (이메일, 프로필 사진 가지고 회원가입 화면으로) 
        	path = "redirect:/user/signUp/chooseMemberType";
        	// 유저 타입 고르는 화면으로 구글 유저 정보 가져가서 -> 회원가입 페이지로 이동.
        	ra.addFlashAttribute("message", "첫 방문을 환영합니다! Guido 사용을 위해 먼저 회원가입을 진행주세요.");
//        	Map<String, Object> googleUserInfo = new HashMap<>();
//        	googleUserInfo.put("email", email);
//        	googleUserInfo.put("picture", picture);
        	System.out.println(email);
        	model.addAttribute("googleEmail", email);
        }
        return path;
    }

    // 임시 chooseMemberType 맵핑
    @GetMapping("/signUp/chooseMemberType")
    public String chooseMem(RedirectAttributes ra) {
    	return "signUp/chooseMemberType";
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
