var geocoder = new kakao.maps.services.Geocoder();

var coord = new kakao.maps.LatLng(35.815329818853414, 127.14976741791679);
var callback = function(result, status) {
    if (status === kakao.maps.services.Status.OK) {
        createMap(result[0].address.address_name, coord);
    }
};

geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);

console.log(coord.getLng(), coord.getLat());

function createMap(addressName, coordinates){
    
    
    var mapContainer = document.getElementById('tourcourseMap'), // 지도의 중심좌표
        mapOption = { 
            center: new kakao.maps.LatLng(coordinates.getLat(), coordinates.getLng()), // 지도의 중심좌표
            draggable: false,   // 지도 이동 막기
            level: 3 // 지도의 확대 레벨
        }; 
    
    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
    
    // 지도에 마커를 표시합니다 
    var marker = new kakao.maps.Marker({
        map: map, 
        position: new kakao.maps.LatLng(coordinates.getLat(), coordinates.getLng())
    });
    
    
    // 커스텀 오버레이에 표시할 컨텐츠 입니다
    // 커스텀 오버레이는 아래와 같이 사용자가 자유롭게 컨텐츠를 구성하고 이벤트를 제어할 수 있기 때문에
    // 별도의 이벤트 메소드를 제공하지 않습니다 
    var content = '<div class="map--wrap">' + 
                '    <div class="map--info">' + 
                '        <div class="map--title">' + 
                '            카카오 스페이스닷원' + 
                '        </div>' + 
                '        <div class="map--body">' + 
                '            <div class="map--desc">' + 
                '                <div class="map--ellipsis">' + addressName + '</div>' + 
                '            </div>' + 
                '        </div>' + 
                '    </div>' +    
                '</div>';
    
    // 마커 위에 커스텀오버레이를 표시합니다
    // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
    var overlay = new kakao.maps.CustomOverlay({
        content: content,
        map: map,
        position: marker.getPosition()
    });
}


map.setCenter(coord);
map.setLevel(2);
map.relayout();
map.setLevel(3);
map.relayout();