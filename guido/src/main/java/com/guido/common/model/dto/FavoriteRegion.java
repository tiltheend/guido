package com.guido.common.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class FavoriteRegion {

	private int favoriteRegionNo;
	private int regionCode;
	private int userNo;
}
