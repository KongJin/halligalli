import { getSession, GetSessionParams } from "next-auth/react";
import { io } from "socket.io-client";

// export const socket = io("https://dongnebooksocket.herokuapp.com", {
//   transports: ["websocket"],
//   auth: { token },
// });

export const socket = io("http://localhost:5000", {
  transports: ["websocket"],
  autoConnect: false,
});

export const exclude = <Table, Key extends keyof Table>(table: Table, ...keys: Key[]): Omit<Table, Key> => {
  for (let key of keys) {
    delete table[key];
  }
  return table;
};

export const validCheck = <T>(obj: T, body: T): boolean => {
  for (let i in obj) {
    if (typeof obj[i] === "object") {
      return validCheck(obj[i], body[i]);
    }
    if (typeof obj[i] !== typeof body[i]) {
      console.log(obj[i], body[i]);
      return false;
    }
  }
  return true;
};

export const verifyCode = (): string => {
  let code = Math.floor(Math.random() * 1000000) + 100000; // ★★난수 발생 ★★★★★
  if (code > 1000000) {
    code = code - 100000;
  }
  return String(code);
};
