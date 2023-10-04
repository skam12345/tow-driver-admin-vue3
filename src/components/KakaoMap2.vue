<template>
  <div id="map"></div>
</template>

<script>
import { useRouter } from "vue-router";
import { onMounted, ref, computed } from "vue";
import axios from "@/axios";
import { useStore } from "vuex";

export default {
  props: {
    drivers: {
      type: Object,
      default: () => {
        return {};
      },
    },
    violationData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    geocoords: {
      type: Object,
      default: () => {
        return {};
      },
    },
    // vdaViolationLocation: {
    //   type: String,
    // },
  },
  emit: ["getAddressFromMap:text"],
  setup(props, { emit }) {
    const addressFromViolation = ref(props.vdaViolationLocation);
    const store = useStore();
    const places = computed(() => store.state.places.places);
    const setPlaces = (places) => {
      store.dispatch("places/setPlaces", places);
    };
    const PopupMap = ref(false);
    const testPlaceData = ref([]);
    const selectedData = ref();
    const router = useRouter();
    const vdaSeqNo = ref();
    const dmaMemNo = ref("");
    const t1 = ref(props.violationData.vdaLatitude);
    const t2 = ref(props.violationData.vdaLongitude);
    let map;
    let mapSearchText = ref("");
    let positions = [];
    const goUrl = (path) => {
      router.push({ path: path });
    };
    const getPlaceList = async () => {
      try {
        const res = await axios.post("https://bie.autogram.co.kr//app/places");
        setPlaces(props.drivers);
        vdaSeqNo.value = props.drivers.vdaSeqNo;
        //placeList.value = res.data
        // placeList.value = store.state.places.places.places
        // placeList.value = store.state.places.places
        testPlaceData.value = res.data;
      } catch (err) {
        console.log("데이터를 못가져왔습니다.");
      }
    };

    // 현재 내위치 좌표
    const getCurrentPosition = () => {
      if (
        localStorage.getItem("currentLat") === null ||
        localStorage.getItem("currentLat") === "undefined"
      ) {
        if (!navigator.geolocation) {
          console.log("!navigator.geolocation");
        } else {
          navigator.geolocation.getCurrentPosition(
            getPositionValue
            // geolocationError
          );
        }
      }
    };

    const focusSetTimeout = () => {};

    const getPositionValue = (val) => {
      localStorage.setItem("currentLat", val.coords.latitude);
      localStorage.setItem("currentLng", val.coords.longitude);
    };

    // const geolocationError = () => {
    //   setAlert("위치 정보를 찾을 수 없습니다.2");
    // };
    onMounted(() => {
      getCurrentPosition();
      // 카카오 객체가 있고, 카카오 맵그릴 준비가 되어 있다면 맵 실행
      if (
        localStorage.getItem("currentLat") === null ||
        localStorage.getItem("currentLat") === "undefined"
      ) {
        setTimeout(() => {
          if (window.kakao && window.kakao.maps) {
            // console.log("스토리지에 좌표 없고, 맵 있을때 로드맵");
            loadMap();
          } else {
            // console.log("스토리지에 좌표 없고, 맵 못 불러왔을때 로드 스크립트");
            loadScript();
          }
        }, 1000);
      } else {
        if (window.kakao && window.kakao.maps) {
          // console.log("스토리지에 좌표 있고, 맵 있을때 로드맵");
          loadMap();
        } else {
          // console.log("스토리지에 좌표 있고, 맵 못 불러왔을때 로드 스크립트");
          loadScript();
        }
      }
    });

    // 한글 키보드 입력
    const changeKeyword = (e) => {
      mapSearchText.value = e.target.value;
      // console.log(focus);
    };

    const loadScript = async () => {
      const script = document.createElement("script");
      script.async = true;
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?appkey=3bba48b78174efe9b9fbbfec581109d4&autoload=false&libraries=services";
      document.head.appendChild(script);
      script.onload = () => window.kakao.maps.load(loadMap);
    };

    // 맵 출력하기
    const loadMap = async () => {
      const container = document.getElementById("map");
      // 단속대상 차량의 위치를 중심으로 출력
      const options = {
        center: new window.kakao.maps.LatLng(
          props.violationData.vdaLatitude,
          props.violationData.vdaLongitude
        ),
        level: 5,
      };
      // const options = {
      //   center: new window.kakao.maps.LatLng(t1.value, t2.value),
      //   // 현재 나의 위치로 할라면 아랫것
      //   // center: new window.kakao.maps.LatLng(
      //   //   localStorage.getItem("currentLat"),
      //   //   localStorage.getItem("currentLng")
      //   // ),
      //   level: 5,
      // };
      // 여기다가 마커, 커스텀 오버레이 정보
      if (store.state.places.places.length === 0) {
        setTimeout(() => {
          for (let i = 0; i < store.state.places.places.length; i++) {
            // console.log(store.state.places.places[i]);
            let position = {};
            position.id = store.state.places.places[i].vdaSeqNo;
            position.title = `차번: ${store.state.places.places[i].dmaCarNo} 기사명: ${store.state.places.places[i].dmaMemName} 전화번호: ${store.state.places.places[i].dmaMemPhone} `;
            position.latlng = new window.kakao.maps.LatLng(
              store.state.places.places[i].dmaLatitude,
              store.state.places.places[i].dmaLongitude
            );
            positions.push(position);
          }
          let position2 = {
            id: props.violationData.vdaSeqNo, // 마커의 아이디
            title: props.violationData.vdaCarNo,
            latlng: new window.kakao.maps.LatLng(
              props.violationData.vdaLatitude,
              props.violationData.vdaLongitude
            ),
          };
          let customOverlay;
          map = new window.kakao.maps.Map(container, options);
          loadCustomOverlay(positions, customOverlay, position2);
          loadMaker(positions, map, position2);
        }, 1000);
      } else {
        setTimeout(() => {
          for (let i = 0; i < store.state.places.places.length; i++) {
            let position = {};
            position.id = store.state.places.places[i].dmaMemNo;
            position.title = `차번:${store.state.places.places[i].dmaCarNo} 기사명:${store.state.places.places[i].dmaMemName} 전화번호:${store.state.places.places[i].dmaMemPhone}`;
            position.latlng = new window.kakao.maps.LatLng(
              store.state.places.places[i].dmaLatitude,
              store.state.places.places[i].dmaLongitude
            );
            positions.push(position);
          }
          let position2 = {
            id: props.violationData.vdaSeqNo, // 마커의 아이디
            title: props.violationData.vdaCarNo,
            latlng: new window.kakao.maps.LatLng(
              props.violationData.vdaLatitude,
              props.violationData.vdaLongitude
            ),
          };
          let customOverlay;
          map = new window.kakao.maps.Map(container, options);
          loadCustomOverlay(positions, customOverlay, position2);
          loadMaker(positions, map, position2);
        }, 1000);
      }
      // loadZoomControl();
    };

    // 커스텀 오버레이
    const loadCustomOverlay = (positions, customOverlay, position2) => {
      // eslint-disable-next-line no-unused-vars, no-undef
      customOverlay = new kakao.maps.CustomOverlay({
        map: map,
        clickable: true, // 커스텀 오버레이 클릭 시 지도에 이벤트를 전파하지 않도록 설정한다
        position: position2.latlng, // 커스텀 오버레이를 표시할 좌표
        xAnchor: 0.5, // 컨텐츠의 x 위치
        yAnchor: 0, // 컨텐츠의 y 위치
      });
      for (let i = 0; i < positions.length; i++) {
        // eslint-disable-next-line no-unused-vars, no-undef
        customOverlay = new kakao.maps.CustomOverlay({
          map: map,
          clickable: true, // 커스텀 오버레이 클릭 시 지도에 이벤트를 전파하지 않도록 설정한다
          position: positions[i].latlng, // 커스텀 오버레이를 표시할 좌표
          xAnchor: 0.5, // 컨텐츠의 x 위치
          yAnchor: 0, // 컨텐츠의 y 위치
        });
      }
      // 커스텀 오버레이를 지도에 표시합니다
      //customOverlay.setMap(map);
    };
    // 지정한 위치에 마커 불러오기
    const loadMaker = (positions, map, position2) => {
      // console.log("marker");
      // 마커 이미지의 주소
      const markerImageUrl = "https://bie.autogram.co.kr/images/maker.png",
        // eslint-disable-next-line no-undef
        markerImageSize = new kakao.maps.Size(50, 70), // 마커 이미지의 크기
        markerImageOptions = {
          // eslint-disable-next-line no-undef
          offset: new kakao.maps.Point(50, 70), // 마커 좌표에 일치시킬 이미지 안의 좌표
        };

      const markerImageUrl2 = "https://bie.autogram.co.kr/images/waiting.png";
      // eslint-disable-next-line no-undef
      const markerImageSize2 = new kakao.maps.Size(120, 70);
      const markerImageOptions2 = {
        // eslint-disable-next-line no-undef
        offset: new kakao.maps.Point(30, 30), // 마커 좌표에 일치시킬 이미지 안의 좌표
      };

      // 마커 이미지를 생성한다
      // eslint-disable-next-line no-undef
      let markerImage = new kakao.maps.MarkerImage(
        markerImageUrl,
        markerImageSize,
        markerImageOptions
      );
      // eslint-disable-next-line no-undef
      let markerImage2 = new kakao.maps.MarkerImage(
        markerImageUrl2,
        markerImageSize2,
        markerImageOptions2
      );
      const marker2 = new window.kakao.maps.Marker({
        position: position2.latlng, // 마커의 좌표
        image: markerImage2, // 마커의 이미지
        map: map, // 마커를 표시할 지도 객체
        id: position2.id, // 마커의 아이디
        title: position2.title, // 마커의 아이디
      });
      for (let i = 0; i < positions.length; i++) {
        const marker = new window.kakao.maps.Marker({
          position: positions[i].latlng, // 마커의 좌표
          image: markerImage, // 마커의 이미지
          map: map, // 마커를 표시할 지도 객체
          id: positions[i].id, // 마커의 아이디
          title: positions[i].title, // 마커의 아이디
        });
        window.kakao.maps.event.addListener(marker, "click", async () => {
          selectedData.value = marker.getTitle();
          // 지도 레벨을 설정한다
          map.setLevel(5);
          const dmaMemPhone = selectedData.value.trim().slice(-11);
          const comfirmMessage = confirm(
            // `${vdaSeqNo.value}번 단속대상 차량을 ${selectedData.value} 견인 차량에 배정 하시겠습니까?`
            `${selectedData.value} 견인 차량에 배정 하시겠습니까?`
          );
          if (!comfirmMessage) {
            return;
          }
          try {
            // push message용
            await axios
              .post("https://bie.autogram.co.kr/api/v1/driver/get", {
                dmaMemPhone: dmaMemPhone,
              })
              .then((res) => {
                dmaMemNo.value = res.data[0].dmaMemNo;
              });
            await axios
              .post("https://bie.autogram.co.kr//api/v1/message/send", {
                vdaSeqNo: vdaSeqNo.value,
                dmaMemNo: dmaMemNo.value,
              })
              .then((res) => {
                if (res.data !== true) {
                  alert("오류가 발생 했습니다.");
                  return;
                } else if (res.data === true) {
                  alert("배정을 완료 했습니다.");
                  router.go(router.currentRoute);
                }
              });
          } catch (err) {
            alert(err);
          }
        });

        marker.setMap(map);
        marker2.setMap(map);
      }
    };

    const closePopup = () => {
      PopupMap.value = false;
    };

    const geocoderFuntions = () => {
      // eslint-disable-next-line no-undef
      var geocoder = new kakao.maps.services.Geocoder();
      // eslint-disable-next-line no-undef
      var coord = new kakao.maps.LatLng(
        props.geocoords.lat,
        props.geocoords.long
      );
      var callback = function (result, status) {
        if (status === "ZERO_RESULT") {
          alert(
            "해당 좌표에 해당하는 주소가 없습니다. 주소를 직접 입력 해 주세요"
          );
          emit("getAddressFromMapStatus", false);
        }
        if (
          // eslint-disable-next-line no-undef
          status === kakao.maps.services.Status.OK &&
          status !== "ZERO_RESULT"
        ) {
          // 부모에서 받은 좌표를 주소로 바꿔서 다시 부모로 전달
          emit("getAddressFromMap", [result[0].address.address_name]);
        }
      };
      geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
    };
    const addressFuntions = async () => {
      // eslint-disable-next-line no-undef
      var geocoder = new kakao.maps.services.Geocoder();
      var callback = function (result, status) {
        // eslint-disable-next-line no-undef
        if (status === kakao.maps.services.Status.OK) {
          let long = Number(result[0].x).toFixed(6).toString();
          let lat = Number(result[0].y).toFixed(6).toString();
          emit("getCoordLongFromMap", [long]);
          emit("getCoordLatFromMap", [lat]);
        }
      };
      await geocoder.addressSearch(props.geocoords.address, callback);
    };
    getPlaceList();
    return {
      mapSearchText,
      changeKeyword,
      open,
      focusSetTimeout,
      goUrl,
      places,
      closePopup,
      testPlaceData,
      selectedData,
      vdaSeqNo,
      dmaMemNo,
      addressFromViolation,
      geocoderFuntions,
      addressFuntions,
      t1,
      t2,
    };
  },
};
</script>
<style scoped>
.setMyPosition-cont {
  width: 45px;
  height: 45px;
  z-index: 1002;
  position: absolute;
  bottom: 15%;
  background-color: white;
  left: 3%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  box-shadow: 0px 0px 10px 3px #00000050;
}
.setMyPosition {
  background-image: url("@/assets/icons/Position.png");
  position: absolute;
  z-index: 1003;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  /* top: 34%;
  left: 91%; */
}
.bottom-sheet {
  padding-left: 5%;
  padding-bottom: 5%;
}
.coordinate {
  background-image: url("@/assets/icons/map.png");
  width: 3%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
.charger-icon {
  padding-top: 3%;
  width: 24%;
  align-items: center;
  text-align: center;
}
.charger-icon1 {
  background-image: url(@/assets/icons/charge_01.png);
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
.charger-icon2 {
  background-image: url(@/assets/icons/charge_02.png);
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
.charger-icon3 {
  background-image: url(@/assets/icons/charge_03.png);
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
.charger-icon4 {
  background-image: url(@/assets/icons/charge_04.png);
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
.charger-icon1-1 {
  background-image: url(@/assets/icons/charge_01_1.png);
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
.charger-icon2-1 {
  background-image: url(@/assets/icons/charge_02_1.png);
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
.charger-icon3-1 {
  background-image: url(@/assets/icons/charge_03_1.png);
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
.charger-icon4-1 {
  background-image: url(@/assets/icons/charge_04_1.png);
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
.phone-icon {
  background-image: url(@/assets/icons/phone.png);
  height: 20px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  vertical-align: middle;
}
.time-icon {
  background-image: url(@/assets/icons/time.png);
  height: 20px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  vertical-align: middle;
  padding-left: 9%;
}
.station-icon {
  background-image: url(@/assets/icons/station.png);
  height: 20px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  vertical-align: middle;
  padding-left: 10%;
}
.payment-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  background-color: rgb(2 100 253);
  height: 50%;
  border: none;
  border-radius: 10px;
  color: #fff;
  font-weight: 400;
  font-size: 1.6rem;
}
</style>
