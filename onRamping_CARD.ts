import axios from "axios";
import { BEARER_TOKEN } from "./config";

const create_wallet_order_reservation: any = async function (data: any) {
  const baseURL = `https://api.testwyre.com/v3/orders/reserve`;
  const config = {
    method: "post",
    url: baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
    data: data,
  };
  let response = await axios(config);
  return response.data;
};

const create_order: any = async function (data: any) {
  const baseURL = `https://api.testwyre.com/v3/debitcard/process/partner`;
  const config = {
    method: "post",
    url: baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
    data: data,
  };
  let response = await axios(config);
  return response.data;
};
const get_order: any = async function (orderId: any) {
  const baseURL = `https://api.testwyre.com/v3/orders/${orderId}`;
  const config = {
    method: "get",
    url: baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
  };
  let response = await axios(config);
  return response.data;
};
const get_rate_locked_reservation: any = async function (reservationId: any) {
  const baseURL = `https://api.testwyre.com/v3/orders/reservation/${reservationId}`;
  const config = {
    method: "get",
    url: baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
  };
  let response = await axios(config);
  return response.data;
};
const get_authorization: any = async function (orderId: any) {
  const baseURL = `https://api.testwyre.com/v3/debitcard/authorization/${orderId}`;
  const config = {
    method: "get",
    url: baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
  };

  let response = await axios(config);
  return response.data;
};

// SAMPLE DATAS
const data1 = {
  sourceCurrency: "USD",
  destCurrency: "MATIC",
  dest: "matic:0xF079F9040D099513D69F282200C80337F43F5ea3",
  country: "US",
  referrerAccountId: "AC_BXLM6XH7EBD",
  paymentMethod: "debit-card",
  sourceAmount: "10",
  amountIncludeFees: true,
};

// const data1 = {
//   paymentMethod: "debit-card",
//   amount: "10",
//   sourceCurrency: "USD",
//   destCurrency: "MATIC",
//   referrerAccountId: "AC_BXLM6XH7EBD",
//   dest: "matic:0xF079F9040D099513D69F282200C80337F43F5ea3",
//   firstName: "Himanshu",
//   lastName: "Singh",
//   phone: "18588255555",
//   email: "himanshusingh@rapidinnovation.dev",
//   country: "US",
//   postalCode: "90142",
//   state: "CA",
//   city: "Los Angeles",
//   street1: "1234 NoTest Ave",
// };

const data2 = {
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
  reservationId: "",
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

const onRampCARD = async function () {
  // STEP 1 : CREATE_WALLET_ORDER_RESERVATION
  const response_reservation = await create_wallet_order_reservation(data1);
  console.log(response_reservation);

  // STEP 2 : CREATE_GET_RATE_LOCKED_RESERVATION
  let response_get_rate_locked_reservation = await get_rate_locked_reservation(
    response_reservation.reservation
  );
  console.log(response_get_rate_locked_reservation);

  // STEP 3 : CREATE_CREATE_ORDER
  let response_create_order = await create_order({
    ...data2,
    reservationId: response_reservation.reservation,
  });
  console.log(response_create_order);

  // STEP 3.1 : CREATE_GET_ORDER (NOT NECESSARY)
  let response_get_order = await get_order(response_create_order.id);
  console.log(response_get_order);

  console.log("STARTING LOCK");

  // STEP 4 : SINGLE LINE CODE TO WAIT FOR 10 SECONDS
  await new Promise((resolve) => setTimeout(resolve, 10000)); // 10 sec

  // STEP 5 : SINGLE LINE CODE TO WAIT FOR 10 SECONDS

  // CREATE_GET_AUTHORIZATION3dsURL
  console.log("STARTING LOCK");
  console.log(response_create_order.id);
  let response_get_authorization = await get_authorization(
    response_create_order.id.toString()
  );
  console.log("STARTING LOCK");
  console.log(response_get_authorization);
};

onRampCARD();

// IMPORTANT NOTES
// We have to fetch Client Side IP Address and we have to use that in data2 as a parameter
