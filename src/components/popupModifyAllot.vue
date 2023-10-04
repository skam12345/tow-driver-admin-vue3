<template>
  <div class="popup_cont">
    <div class="popup_contents_cont" id="test">
      <div class="close_btn" @click="close()"></div>
      <div class="popup_contents">
        <div class="popup_contents_top">견인 차량 상세</div>
        <div class="popup_contents_body" style="margin-top: 2%">
          <!-- 단속 대상 차량 정보 -->
          <div style="display: flex">
            <div
              style="
                font-size: 20px;
                font-weight: bold;
                margin-bottom: 10px;
                width: 50%;
              "
            >
              단속 대상 차량 정보
            </div>
            <div
              style="display: flex; justify-content: flex-end; width: 50%"
              @click="printPage()"
            >
              <div
                class="bottom_btns_add"
                style="
                  background-color: rgb(152, 152, 152);
                  display: flex;
                  width: 100px;
                  height: 25px;
                  min-height: 25px;
                "
              >
                인쇄 하기
              </div>
            </div>
          </div>
          <div class="popup_contents_body_photo_cont dropzone_cont">
            <div
              v-for="(info, index) in violationImgPreviews"
              :key="index"
              class="preview_img_cont"
              style="position: relative"
            >
              <img
                :src="info.src"
                alt=""
                class="preview_img"
                crossOrigin="true"
              />
            </div>
          </div>
          <div class="popup_contents_body_input_cont">
            <div v-if="violationData" class="popup_contents_body_input_pw">
              <label
                for="towDate"
                style="position: inherit; margin-bottom: 2%; display: flex"
              >
                <div>단속 차량 번호</div>
              </label>
              <input
                type="text"
                id="towDate"
                v-model="violationData.vdaCarNo"
                maxlength="19"
                disabled
              />
            </div>
            <div v-if="violationData" class="popup_contents_body_input_pw">
              <label
                for="towDate"
                style="position: inherit; margin-bottom: 2%; display: flex"
              >
                <div>단속 차량 주소</div>
              </label>
              <input
                type="text"
                id="towDate"
                v-model="violationData.vdaViolationLocation"
                disabled
              />
            </div>
          </div>
          <div class="popup_contents_body_input_cont">
            <div v-if="violationData" class="popup_contents_body_input_pw">
              <label
                for="towDate"
                style="position: inherit; margin-bottom: 2%; display: flex"
              >
                <div>위반 일자</div>
              </label>
              <input
                type="text"
                id="towDate"
                v-model="violationData.vdaViolationDate"
                maxlength="19"
                disabled
              />
            </div>
            <div v-if="violationData" class="popup_contents_body_input_pw">
              <label
                for="towDate"
                style="position: inherit; margin-bottom: 2%; display: flex"
              >
                <div>위반 시간</div>
              </label>
              <input
                type="text"
                id="towDate"
                v-model="violationData.vdaViolationTime"
                disabled
              />
            </div>
          </div>
          <div class="popup_contents_body_input_cont">
            <div v-if="violationData" class="popup_contents_body_input_pw">
              <label
                for="towDate"
                style="position: inherit; margin-bottom: 2%; display: flex"
              >
                <div>단속 차량 위도</div>
              </label>
              <input
                type="text"
                id="towDate"
                v-model="violationData.vdaLatitude"
                maxlength="19"
                disabled
              />
            </div>
            <div v-if="violationData" class="popup_contents_body_input_pw">
              <label
                for="towDate"
                style="position: inherit; margin-bottom: 2%; display: flex"
              >
                <div>단속 차량 경도</div>
              </label>
              <input
                type="text"
                id="towDate"
                v-model="violationData.vdaLongitude"
                disabled
              />
            </div>
          </div>
          <!-- 구분선 -->
          <div
            style="width: 100%; border: 2px dashed; margin: 10px 0 20px 0"
          ></div>
          <!-- 견인 차량 상세 -->
          <div style="font-size: 20px; font-weight: bold; margin-bottom: 10px">
            견인 차량 상세
          </div>
          <div class="popup_contents_body_photo_cont dropzone_cont">
            <div
              v-for="(info, index) in imgPreviews"
              :key="index"
              class="preview_img_cont"
              style="position: relative"
            >
              <img
                :src="info.src"
                alt=""
                class="preview_img"
                crossOrigin="true"
              />
            </div>
          </div>
          <div class="popup_contents_body_input_cont">
            <div class="popup_contents_body_input_pw">
              <label
                for="towStatus"
                style="position: inherit; margin-bottom: 2%; display: flex"
              >
                <div>견인 처리 상태</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div>
              </label>
              <select
                name=""
                id="status"
                v-model="tadTowStatus"
                style="width: 95%"
                @change="towStatusSelected()"
              >
                <option disabled value="">견인 처리 상태</option>
                <option value="TTA001">견인배정</option>
                <option value="TTA002">견인중</option>
                <option value="TTA003">차주인계</option>
                <option value="TTA004">견인완료</option>
              </select>
            </div>
            <div class="popup_contents_body_input_pw">
              <label
                for="printYn"
                style="position: inherit; margin-bottom: 2%; display: flex"
              >
                <div>안내장 출력 여부</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div>
              </label>
              <input
                type="text"
                id="printYn"
                v-model="tadPrintYn"
                placeholder="안내장 출력 여부"
                maxlength="15"
              />
            </div>
          </div>
          <div class="popup_contents_body_input_cont">
            <div class="popup_contents_body_input_pw">
              <label
                for="towDate"
                style="position: inherit; margin-bottom: 2%; display: flex"
              >
                <div>견인 일시</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div>
              </label>
              <input
                type="text"
                id="towDate"
                v-model="tadTowDate"
                placeholder="yyyy-mm-dd hh:mm:ss"
                maxlength="19"
                disabled
              />
            </div>
            <div class="popup_contents_body_input_pw">
              <label
                for="towDate"
                style="position: inherit; margin-bottom: 2%; display: flex"
              >
                <div>견인 완료 일시</div>
              </label>
              <input
                type="text"
                id="towDate"
                v-model="tadEndDate"
                placeholder="yyyy-mm-dd hh:mm:ss"
                maxlength="19"
                :disabled="!towCompleted"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="popup_contents_bottom">
        <div class="btn_cont">
          <div class="bottom_btns_cancle" @click="close()" style="width: 32%">
            취소
          </div>
          <div class="bottom_btn_yellow" @click="makePDF()" style="width: 32%">
            다운로드 (이미지 파일)
          </div>
          <div
            class="bottom_btns_add"
            @click="modifyAllot()"
            style="width: 32%"
          >
            수정
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "@/axios";
import { useRouter } from "vue-router";
import AWS from "aws-sdk";
import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  setup(props, { emit }) {
    const router = useRouter();
    // 견인차량 상세 정보들
    const tadSeqNo = ref(props.data.tadSeqNo);
    const vdaSeqNo = ref(props.data.vdaSeqNo);
    const tsiSeqNo = ref(props.data.tsiSeqNo);
    const dmaMemName = ref(props.data.dmaMemName);
    const dmaMemNo = ref(props.data.dmaMemNo);
    const dmaMemPhone = ref(props.data.dmaMemPhone);
    const tadPrintYn = ref(props.data.tadPrintYn);
    const tadTowStatus = ref(props.data.tadTowStatus);
    const tadTowDate = ref(props.data.tadTowDate);
    const tadEndDate = ref(props.data.tadEndDate);
    const towCompleted = ref(false);
    const aciRegionCode = ref(props.data.aciRegionCode);
    const tadImg01Path = ref(props.data.tadImg01Path);
    const tadImg02Path = ref(props.data.tadImg02Path);
    const tadImg03Path = ref(props.data.tadImg03Path);
    const tadImg04Path = ref(props.data.tadImg04Path);
    const tadImg05Path = ref(props.data.tadImg05Path);
    const tadImg06Path = ref(props.data.tadImg06Path);
    const imagePathFromS3 = ref([]);
    const imgPreviews = ref([]);
    // 단속 대상 차량 정보들
    const violationData = ref();
    const violationImgPreviews = ref([]);
    const violationImagePathFromS3 = ref([]);
    // const initBody = ref();
    // const prtContent = ref();

    const printPage = () => {
      // const html = document.querySelector("html");
      // const printContents = document.querySelector(
      //   ".popup_contents_body"
      // ).innerHTML;
      // console.log(printContents);
      // const printDiv = document.createElement("DIV");
      // printDiv.className = "print-div";
      // html.appendChild(printDiv);
      // printDiv.innerHTML = printContents;
      // document.body.style.display = "none";
      // window.print();
      // document.body.style.display = "block";
      // printDiv.style.display = "none";
      window.print();
    };
    const makePDF = async () => {
      console.log(document.getElementsByClassName("preview_img"));
      let data = document.getElementsByClassName("popup_contents_cont")[0];
      let _transform = data.style.transform;
      data.style.setProperty("transform", "none");
      console.log(data);
      html2canvas(data, {
        allowTaint: true,
        useCORS: true,
      }).then((canvas) => {
        const link = document.createElement("a");
        link.download = "filename";
        link.href = canvas.toDataURL("image/png");
        document.body.appendChild(link);
        link.click();
        data.style.transform = _transform;
        console.log(link);
      });
    };
    const readObjectFromS3 = async () => {
      // s3 인증 과정
      AWS.config.region = process.env.VUE_APP_BUCKET_REGION;
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: process.env.VUE_APP_IDENTITYPOOLID,
      });
      // s3 setting
      let bucketName = process.env.VUE_APP_BUCKET_NAME;
      const s3 = new AWS.S3({
        apiVersion: "2012-10-17",
        params: {
          Bucket: bucketName,
        },
      });
      // function makeid() {
      //   var text = "";
      //   var possible =
      //     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      //   for (var i = 0; i < 5; i++)
      //     text += possible.charAt(Math.floor(Math.random() * possible.length));

      //   return text;
      // }
      let violationParams = {
        Bucket: bucketName,
        Prefix: `public/violation/${aciRegionCode.value}/${violationData.value.vdaViolationDate}/${violationData.value.vdaViolationTime}${aciRegionCode.value}${violationData.value.vdaCarNo}`,
        //인코딩 타입
        EncodingType: "url",
      };
      console.log(violationParams.Prefix);
      await s3.listObjectsV2(violationParams, (err, data) => {
        if (err) {
          console.log(err);
        }
        violationImagePathFromS3.value = data.Contents;
        console.log(data.Contents);
        for (let j = 0; j < violationImagePathFromS3.value.length; j++) {
          let violationFileName =
            violationImagePathFromS3.value[j].Key.slice(-1);
          violationImagePathFromS3.value[j].fileName = violationFileName;
        }
        // 이미지 받아와서 미리보기 화면 구성
        for (let i = 0; i < violationImagePathFromS3.value.length; i++) {
          let text = "";
          let possible =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          for (let j = 0; j < 5; j++) {
            text += possible.charAt(
              Math.floor(Math.random() * possible.length)
            );
          }
          let violationURL = `https://towimgstorage151931-dev.s3.ap-northeast-2.amazonaws.com/${violationImagePathFromS3.value[i].Key}?${text}`;
          let violationArrayData = {
            src: violationURL,
            type: "img",
          };
          violationImgPreviews.value.push(violationArrayData);
        }
      });

      // 견인 차량 이미지 로드
      let params = {
        Bucket: bucketName,
        Prefix: `public/allot/${aciRegionCode.value}/${tadSeqNo.value}`,
        EncodingType: "url",
      };
      console.log(params.Prefix);
      await s3.listObjectsV2(params, (err, data) => {
        if (err) {
          console.log(err);
        }
        imagePathFromS3.value = data.Contents;
        // for (let j = 0; j < imagePathFromS3.value.length; j++) {
        //   let fileName = imagePathFromS3.value[j].Key.slice(-1);
        //   imagePathFromS3.value[j].fileName = fileName;
        // }
        // 이미지 받아와서 미리보기 화면 구성
        console.log(data.Contents);
        for (let i = 0; i < imagePathFromS3.value.length; i++) {
          let text = "";
          let possible =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          for (let j = 0; j < 5; j++) {
            text += possible.charAt(
              Math.floor(Math.random() * possible.length)
            );
          }
          let URL = `https://towimgstorage151931-dev.s3.ap-northeast-2.amazonaws.com/${imagePathFromS3.value[i].Key}?${text}`;
          let arrayData = { src: URL, type: "img" };
          imgPreviews.value.push(arrayData);
        }
      });
    };
    const close = () => {
      emit("closePopup");
    };
    const towStatusSelected = () => {
      if (tadTowStatus.value === "TTA003" || tadTowStatus.value === "TTA004") {
        towCompleted.value = true;
      } else {
        towCompleted.value = false;
      }
    };
    const validation = () => {
      let strSpace = /\s/; // 공백체크
      if (
        strSpace.exec(tadSeqNo.value) ||
        strSpace.exec(vdaSeqNo.value) ||
        strSpace.exec(dmaMemNo.value) ||
        strSpace.exec(tadPrintYn.value) ||
        strSpace.exec(tadTowStatus.value)
      ) {
        alert(
          "해당 항목에는 공백을 사용할수 없습니다.\n\n공백은 자동적으로 제거 됩니다."
        );
        tadSeqNo.value = tadSeqNo.value.replaceAll(" ", "");
        vdaSeqNo.value = vdaSeqNo.value.replaceAll(" ", "");
        dmaMemNo.value = dmaMemNo.value.replaceAll(" ", ""); // 공백제거
        tadPrintYn.value = tadPrintYn.value.replaceAll(" ", "");
        tadTowStatus.value = tadTowStatus.value.replaceAll(" ", "");
        return false;
      }
      if (
        tadSeqNo.value.length < 1 ||
        vdaSeqNo.value.length < 1 ||
        dmaMemNo.value.length < 1 ||
        tadPrintYn.value.length < 1 ||
        tadTowStatus.value.length < 1
      ) {
        alert("필수 항목을 모두 입력 해 주세요.");
        return false;
      }
      return true;
    };
    const modifyAllot = () => {
      const modify = confirm("차량 배정 정보를 수정 하시겠습니까?");
      if (!modify) return;
      // console.log(vdaSeqNo.value);
      // console.log(tsiSeqNo.value);
      // console.log(dmaMemNo.value);
      // console.log(tadPrintYn.value);
      // console.log(tadTowStatus.value);
      // console.log(tadTowDate.value);
      // console.log(tadEndDate.value);
      try {
        axios
          .post("https://bie.autogram.co.kr/api/v1/tow_allot/modify", {
            tadSeqNo: tadSeqNo.value,
            vdaSeqNo: vdaSeqNo.value,
            tsiSeqNo: tsiSeqNo.value,
            dmaMemNo: dmaMemNo.value,
            tadPrintYn: tadPrintYn.value,
            tadTowStatus: tadTowStatus.value,
            tadTowDate: tadTowDate.value,
            tadEndDate: tadEndDate.value,
          })
          .then((res) => {
            console.log(res);
            if (res.data.result === "SUCCESS") {
              alert("차량 배정 정보 수정을 완료 했습니다.");
              router.go(router.currentRoute);
            } else {
              alert(res.data.message);
            }
          });
      } catch (err) {
        alert(err);
      }
    };
    const getViolatinData = async () => {
      try {
        await axios
          .post("https://bie.autogram.co.kr/api/v1/violation/get", {
            vdaSeqNo: vdaSeqNo.value,
          })
          .then((res) => {
            console.log(res.data);
            violationData.value = res.data[0];
          });
        await readObjectFromS3();
      } catch (err) {
        alert(err);
      }
    };
    getViolatinData();
    return {
      dmaMemNo,
      tadPrintYn,
      tadSeqNo,
      tadTowDate,
      tadTowStatus,
      tsiSeqNo,
      vdaSeqNo,
      tadEndDate,
      towCompleted,
      dmaMemName,
      dmaMemPhone,
      close,
      modifyAllot,
      validation,
      towStatusSelected,
      imgPreviews,
      imagePathFromS3,
      readObjectFromS3,
      aciRegionCode,
      tadImg01Path,
      tadImg02Path,
      tadImg03Path,
      tadImg04Path,
      tadImg05Path,
      tadImg06Path,
      // 단속 대상 차량 정보들
      getViolatinData,
      violationData,
      violationImgPreviews,
      violationImagePathFromS3,
      makePDF,
      printPage,
      // beforePrint,
      // afterPrint,
    };
  },
};
</script>

<style scoped>
.popup_cont {
  width: 100%;
  height: 100%;
  background-color: #000000b8;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5000;
}
.popup_contents_cont {
  background-color: #fff;
  height: 90%;
  width: 50%;
  bottom: 30%;
  position: absolute;
  border: none;
  border-radius: 20px;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2% 2%;
}
.popup_contents_cont::-webkit-scrollbar {
  display: none;
}
.popup_contents {
  width: 100%;
  height: 95%;
}
.popup_contents_top {
  width: 100%;
  height: 5%;
  font-size: 20px;
  border-bottom: 1px solid grey;
}
.popup_contents_body {
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
}
.popup_contents_bottom {
  width: 100%;
  height: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.popup_contents_body_input_cont {
  width: 100%;
  height: 15%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.popup_contents_body_input_id {
  width: 70%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
.popup_contents_body_input_id input {
  width: 90%;
}
.popup_contents_body_input_id_check {
  width: 30%;
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
}
.popup_contents_body_input_id_check_btn {
  display: flex;
  align-items: center;
  justify-content: center;
}
.popup_contents_body_input_pw {
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
.popup_contents_body_input_pw input {
  width: 95%;
}
.btn_cont {
  display: flex;
  height: 50%;
  width: 85%;
  align-items: center;
  justify-content: space-between;
}
.close_btn {
  min-width: 20px;
  min-height: 20px;
  max-width: 20px;
  position: absolute;
  width: 2.5%;
  height: 2.5%;
  /* background-color: black; */
  top: 1%;
  right: 1%;
  background-image: url(../assets/css/icon/close.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  cursor: pointer;
}
.popup_contents_body_photo_cont {
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  overflow: scroll;
}
.dropzone_cont {
  border: 2px dashed #41b883;
  background-color: #fff;
}
.preview_img_cont {
  width: 25%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.preview_img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  padding: 2%;
}
</style>
