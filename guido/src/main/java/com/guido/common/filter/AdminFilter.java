package com.guido.common.filter;

import java.io.IOException;
import java.io.PrintWriter;

import com.guido.common.model.dto.User;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

public class AdminFilter implements Filter{

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse resp = (HttpServletResponse)response;
		HttpSession session = req.getSession();
		
		User loginUser = (User) session.getAttribute("loginUser");
		
		
		if(loginUser == null || !loginUser.getUserType().equals("M")) {
			resp.setContentType("text/html;charset=UTF-8");
			PrintWriter out = resp.getWriter();
			out.println("<script>alert('비정상적인 접근입니다.'); location.href='/';</script>");
			out.close();
		} else {
			chain.doFilter(request, response);
		}
	}
}