package com.guido.product.model.exception;

public class ImageDeleteException extends RuntimeException{
	
	public ImageDeleteException() {
		super("이미지 삭제 실패");
	}
	
}
