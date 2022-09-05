Web3 = require("web3");

const axios = require("axios");
const {BEARER_TOKEN} = require("./config");

// const BEARER_TOKEN = `TEST-SK-VRVPJFFZ-Y3AEFATJ-GNQ6Q9E2-Q4R2FXRH`;
// const API_KEY = `TEST-AK-9RR7X6VU-M6AFCMCD-E4A8E2ER-LU93WGQT`;
// const ADMIN_ACCOUNT = `AC_BXLM6XH7EBD`;

console.time("traceTime");
console.time(BEARER_TOKEN);

console.timeLog("traceTime");

const create_wallet_order_reservation = async function () {
  const baseURL = `https://api.testwyre.com/v3/orders/reserve`;

  const data = {
    paymentMethod: "debit-card",
    amount: "10",
    sourceCurrency: "USD",
    destCurrency: "MATIC",
    referrerAccountId: "AC_BXLM6XH7EBD",
    dest: "matic:0xF079F9040D099513D69F282200C80337F43F5ea3",
    firstName: "Himanshu",
    lastName: "Singh",
    phone: "18588255555",
    email: "himanshusingh@rapidinnovation.dev",
    country: "US",
    postalCode: "90142",
    state: "CA",
    city: "Los Angeles",
    street1: "1234 NoTest Ave",
  };
  const data1 = {
    amount: "10",
    sourceCurrency: "USD",
    destCurrency: "MATIC",
    dest: "matic:0xF079F9040D099513D69F282200C80337F43F5ea3",
    firstName: "Himanshu",
    lastName: "Singh",
    referrerAccountId: "AC_BXLM6XH7EBD",
  };

  const config = {
    method: "post",
    url: baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },

    data: data,
  };

  axios(config)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log("error", error);
      return {};
    });
};
async function create_order(reservation) {
  const baseURL = `https://api.testwyre.com/v3/debitcard/process/partner`;

  const data = {
    debitCard: {
      number: "4111111111111111",
      year: "2023",
      month: "01",
      cvv: "555",
    },
    address: {
      street1: "1234 Test Ave",
      city: "Los Angeles",
      state: "CA",
      postalCode: "91420",
      country: "US",
    },
    reservationId: `${reservation}`,
    trigger3ds: true,
    amount: "10",
    sourceCurrency: "USD",
    destCurrency: "MATIC",
    dest: "matic:0xF079F9040D099513D69F282200C80337F43F5ea3",
    referrerAccountId: "AC_BXLM6XH7EBD",
    givenName: "Himanshu",
    familyName: "Singh",
    email: "himanshusingh@rapidinnovation.dev",
    phone: 18588255555,
    ipAddress: "1.1.1.1",
  };
  const data1 = {
    debitCard: {
      number: "4111111111111111",
      year: "2023",
      month: "01",
      cvv: "555",
    },
    address: {
      street1: "1234 Test Ave",
      city: "Vegas",
      state: "CA",
      postalCode: "91422",
      country: "US",
    },
    reservationId: "V6UT7LPPJT4UNEBGHWWU",
    amount: "10",
    sourceCurrency: "USD",
    destCurrency: "MATIC",
    dest: "matic:0xF079F9040D099513D69F282200C80337F43F5ea3",
    referrerAccountId: "AC_BXLM6XH7EBD",
    givenName: "Himanshu",
    familyName: "Singh",
    email: "himanshusingh@rapidinnovation.dev",
    phone: 18588255555,
    ipAddress: "1.1.1.1",
  };

  const config = {
    method: "post",
    url: baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },

    data: data,
  };

  axios(config)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => console.log("error", error));
}
async function get_order() {
  const orderId = "WO_CR6FETZUYG";
  const baseURL = `https://api.testwyre.com/v3/orders/${orderId}`;

  const config = {
    method: "get",
    url: baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
  };

  axios(config)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => console.log("error", error));
}
async function get_authorization() {
  const orderId = "WO_UEWW8ZUH76";
  const baseURL = `https://api.testwyre.com/v3/debitcard/authorization/${orderId}`;

  const config = {
    method: "get",
    url: baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
  };

  axios(config)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => console.log("error", error));
}

const test = async function () {
  // const x1 = await create_wallet_order_reservation();
  // console.log("x1===>", await create_wallet_order_reservation());
  // let x2= await create_order("GBG6X4A6QFDU7TAF3R86");
  //  await get_order();
  await get_authorization();
};

test();

// reservation : ZY69GGHXVLPZ4YCYCNHZ
// wallet order : WO_XNUEPCNFVX
// account: AC_H26YB2TZQWM

// reservation : VUMHEUT4CVYAYUJYZW8F
// wallet order : WO_CR6FETZUYG
// account: AC_2AA3L4GBFTG

// reservation : V6UT7LPPJT4UNEBGHWWU
// wallet order : WO_LW74HRF283
// account: AC_2AA3L4GBFTG

// reservation :  CM9R3H8GL9M7VXN4D4YB
// wallet order :

// ON RAMPING VIA BANK ACCOUNT
//  https://docs.sendwyre.com/reference/createpaymentmethod
