import { QrGeneratorProps } from "@/constants/propQR";

// ฟังก์ชั่นตั้งเวลาจากเวลาปัจจุบันกี่นาที
function addTimeinMinutes(min: number) {
  const dateoptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const timeoptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  };
  const present = new Date().getTime() + min * 60000;
  const presentdate = Intl.DateTimeFormat("fr-CA", dateoptions).format(present);
  const presenttime = Intl.DateTimeFormat("en-Us", timeoptions).format(present);
  return `${presentdate} ${presenttime}`;
}

// ฟังก์ชั้นสร้าง UUID เพื่อสง่ Header ให้กับ api
function generateUUID() {
  // Public Domain/MIT
  var d = new Date().getTime(); //Timestamp
  var d2 =
    (typeof performance !== "undefined" &&
      performance.now &&
      performance.now() * 1000) ||
    0; //Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

// ฟังก์ชั้นสร้างรหัสที่มีความยาวกี่ตัวอักษร จากเลขฐานสิบหก
const getRanHex = (size: number) => {
  let result = [];
  let hexRef = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];

  for (let n = 0; n < size; n++) {
    result.push(hexRef[Math.floor(Math.random() * 16)]);
  }
  return result.join("");
};

const guid = generateUUID(); //สร้าง guid ใหม่ที่จะใช้ในการส่งค่า authorization เป็น header ใน request

// ฟังก์ชั้นขอ  token จาก api ของ scb
async function postScbToken() {
  //สร้างฟังก์ชั้นเพื่อขอ Token
  const url = "https://api.scb.eorder.smart-ms2.com/api/scb/token";

  let config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      resourceOwnerId: "l78c16602cd0b24922a2d42292cf71cc7f",
      requestUId: guid,
      "accept-language": "EN",
    },
  };
  try {
    const response = await fetch(url, config);
    const json = await response.json();
    return json.data.accessToken; // รับค่า access token ที่ขอข้อมูลจาก api
  } catch (err) {
    console.log(err);
  }
};

export async function getQRCode( values: QrGeneratorProps ) {
    let expiryDate = addTimeinMinutes(1440); // Expires in 1 day
    let ranHex8digits = getRanHex(8); //random hexadecimal generator 8 digits
    const token = await postScbToken();
    const qrHead = {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + token, //ต้องรับค่า token ไว้ให้ นปก.
      resourceOwnerId: 'l78c16602cd0b24922a2d42292cf71cc7f',
      requestUId: guid,
      'accept-language': 'EN'
    };
    const qrBody = {
      qrType: 'PP',
      ppType: 'BILLERID',
      ppId: '010555413150501',
      amount: values.amounts,
      expiryDate: expiryDate,
      numberOfTimes: 1,
      ref1: ranHex8digits,
      ref2: values.ref2,
      ref3: 'VER',
      token: token
    };
    const url = 'https://api.scb.eorder.smart-ms2.com/api/scb/qrcode'
    let config = {
      method: 'POST',
      maxBodyLength: Infinity,
      headers: qrHead,
      body: JSON.stringify(qrBody)
    };
    try {
      const response = await fetch(url, config);
      const json = await response.json();
      return { image: json.data.qrImage, qrBody: qrBody }; //ดึงข้อมูล qrImage จาก property data ใน web API
    } catch (err) {
        console.log(err);
    }
  };
