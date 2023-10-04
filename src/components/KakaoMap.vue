<template>
  <div style="width: 100%; height: 100%; position: relative">
    <div class="setMyPosition-cont">
      <div class="setMyPosition" @click="setCurrentPosition()"></div>
    </div>
    <div
      id="map"
      style="
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        /* top: 3%; */
      "
    ></div>
    <div></div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import "@webzlodimir/vue-bottom-sheet/dist/style.css";
import { onMounted, ref, computed } from "vue";
import axios from "@/axios";
import { useStore } from "vuex";

export default {
  // components: {
  //   PopupMap,
  // },
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
    let distance;
    let positions = [];
    console.log(props);
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
          setAlert("위치 정보를 찾을 수 없습니다.1");
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
      console.log("getPositionValue");
      localStorage.setItem("currentLat", val.coords.latitude);
      localStorage.setItem("currentLng", val.coords.longitude);
    };

    // const geolocationError = () => {
    //   setAlert("위치 정보를 찾을 수 없습니다.2");
    // };

    const setAlert = (text) => {
      alert(text);
    };

    // 나와의 거리계산 함수
    const getDistanceFromLatLonInKm = (lat1, lng1, lat2, lng2) => {
      function deg2rad(deg) {
        return deg * (Math.PI / 180);
      }

      let R = 6371; // Radius of the earth in km
      let dLat = deg2rad(lat2 - lat1); // deg2rad below
      let dLon = deg2rad(lng2 - lng1);
      let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
          Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      let d = R * c; // Distance in km
      return d;
    };

    // let searchList = ref([])
    const filteredSearchList = computed(() => {
      let searchAddressRoadList;
      let searchNameList;
      let filteredList;
      if (mapSearchText.value) {
        // 충전소 주소로 검색한 리스트
        searchAddressRoadList = store.state.places.places.filter((search) => {
          if (search.pdaAddressRoad !== null) {
            return search.pdaAddressRoad.includes(mapSearchText.value);
          }
        });
        // 충전소 이름으로 검색한 리스트
        searchNameList = store.state.places.places.filter((search) => {
          return search.pdaName.includes(mapSearchText.value);
        });
        filteredList = [...searchAddressRoadList, ...searchNameList];
        filteredList = filteredList.filter((filter, index) => {
          return filteredList.indexOf(filter) === index;
        });
        // console.log(filteredList);
      }
      return filteredList;
    });

    // 지도 중심좌표 이동시키기
    const setCenterSearch = (search) => {
      const moveLatLon = new window.kakao.maps.LatLng(
        search.dmaLatitude - 0.002,
        search.dmaLongitude
      );
      map.panTo(moveLatLon);
      mapSearchText.value = "";
      open();
      distance = getDistanceFromLatLonInKm(
        localStorage.getItem("currentLat"),
        localStorage.getItem("currentLng"),
        search.dmaLatitude,
        search.dmaLongitude
      );
      console.log(distance);
    };
    // const setCenterMarker = (lat, lng) => {
    //   const moveLatLon = new window.kakao.maps.LatLng(lat - 0.002, lng);
    //   map.panTo(moveLatLon);
    //   mapSearchText.value = "";
    // };
    const setCurrentPosition = () => {
      getCurrentPosition();
      // 내위치로 지도 중심 이동 할때 단속대상 차량의 위치로 이동
      let lat = Number(props.violationData.vdaLatitude);
      let Lng = Number(props.violationData.vdaLongitude);
      const moveLatLon = new window.kakao.maps.LatLng(lat, Lng);
      map.panTo(moveLatLon);
      mapSearchText.value = "";
    };

    onMounted(() => {
      // console.log(bottomSheet);
      getCurrentPosition();
      // 카카오 객체가 있고, 카카오 맵그릴 준비가 되어 있다면 맵 실행
      if (
        localStorage.getItem("currentLat") === null ||
        localStorage.getItem("currentLat") === "undefined"
      ) {
        setTimeout(() => {
          if (window.kakao && window.kakao.maps) {
            console.log("스토리지에 좌표 없고, 맵 있을때 로드맵");
            loadMap();
          } else {
            console.log("스토리지에 좌표 없고, 맵 못 불러왔을때 로드 스크립트");
            loadScript();
          }
        }, 2000);
      } else {
        if (window.kakao && window.kakao.maps) {
          console.log("스토리지에 좌표 있고, 맵 있을때 로드맵");
          loadMap();
        } else {
          console.log("스토리지에 좌표 있고, 맵 못 불러왔을때 로드 스크립트");
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
        "//dapi.kakao.com/v2/maps/sdk.js?appkey=4a2ee734568dd766a0baf55c0b790307&autoload=false&libraries=services";
      document.head.appendChild(script);
      script.onload = () => window.kakao.maps.load(loadMap);
      // script.onload = () =>
      //   window.kakao.maps.load(function () {
      //     await loadMap;
      //   });
    };

    // 맵 출력하기
    const loadMap = async () => {
      const container = document.getElementById("map");
      // 단속대상 차량의 위치를 중심으로 출력
      console.log("loadMap");
      console.log(props.violationData.vdaLatitude);
      console.log(props.violationData.vdaLongitude);
      // if (!props.violationData.vdaLatitude || props.violationData.vdaLongitude) {

      // }
      const options = {
        center: new window.kakao.maps.LatLng(
          props.violationData.vdaLatitude,
          props.violationData.vdaLongitude
        ),
        // 현재 나의 위치로 할라면 아랫것
        // center: new window.kakao.maps.LatLng(
        //   localStorage.getItem("currentLat"),
        //   localStorage.getItem("currentLng")
        // ),
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
        console.log("if");
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
          console.log(positions);
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
        console.log("else");
        setTimeout(() => {
          for (let i = 0; i < store.state.places.places.length; i++) {
            // console.log(store.state.places.places[i]);
            let position = {};
            position.id = store.state.places.places[i].dmaMemNo;
            position.title = `차번:${store.state.places.places[i].dmaCarNo} 기사명:${store.state.places.places[i].dmaMemName} 전화번호:${store.state.places.places[i].dmaMemPhone}`;
            position.latlng = new window.kakao.maps.LatLng(
              store.state.places.places[i].dmaLatitude,
              store.state.places.places[i].dmaLongitude
            );
            positions.push(position);
          }
          console.log(positions);
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
          console.log(marker);
          selectedData.value = marker.getTitle();
          console.log(selectedData.value);
          // 지도 레벨을 설정한다
          // map.setLevel(5);
          distance = getDistanceFromLatLonInKm(
            localStorage.getItem("currentLat"),
            localStorage.getItem("currentLng"),
            marker.getPosition().Ma,
            marker.getPosition().La
          );

          // 선택한 곳을 센터로 이동
          // setCenterMarker(marker.getPosition().Ma, marker.getPosition().La);

          console.log(selectedData.value.substr(-11));
          const dmaMemPhone = selectedData.value.trim().slice(-11);
          console.log(dmaMemPhone);
          console.log(dmaMemPhone.length);
          const comfirmMessage = confirm(
            // `${vdaSeqNo.value}번 단속대상 차량을 ${selectedData.value} 견인 차량에 배정 하시겠습니까?`
            `${selectedData.value} 견인 차량에 배정 하시겠습니까?`
          );
          if (comfirmMessage) {
            try {
              // push message용
              await axios
                .post("https://bie.autogram.co.kr/api/v1/driver/get", {
                  dmaMemPhone: dmaMemPhone,
                })
                .then((res) => {
                  console.log(res);
                  dmaMemNo.value = res.data[0].dmaMemNo;
                });
              await axios
                .post("https://bie.autogram.co.kr//api/v1/message/send", {
                  vdaSeqNo: vdaSeqNo.value,
                  dmaMemNo: dmaMemNo.value,
                })
                .then((res) => {
                  console.log(res);
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
          console.log(result);
          let long = Number(result[0].x).toFixed(6).toString();
          let lat = Number(result[0].y).toFixed(6).toString();
          emit("getCoordLongFromMap", [long]);
          emit("getCoordLatFromMap", [lat]);
        }
      };
      console.log(props.geocoords.address);
      await geocoder.addressSearch(props.geocoords.address, callback);
    };
    getPlaceList();
    return {
      map: null,
      mapSearchText,
      filteredSearchList,
      changeKeyword,
      setCenterSearch,
      open,
      focusSetTimeout,
      goUrl,
      setCurrentPosition,
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
