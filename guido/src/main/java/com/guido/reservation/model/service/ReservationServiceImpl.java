package com.guido.reservation.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.guido.reservation.model.dao.ReservationMapper;

@Service
public class ReservationServiceImpl implements ReservationService{
	
	@Autowired
	private ReservationMapper mapper;
}
