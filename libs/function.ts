import prisma from "@/libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";

import { io } from "socket.io-client";

// export const socket = io("https://dongnebooksocket.herokuapp.com", {
//   transports: ["websocket"],
//   auth: { token },
// });

export const socket = io("http://localhost:5000", {
  transports: ["websocket"],
});

export const exclude = <Table, Key extends keyof Table>(
  table: Table,
  ...keys: Key[]
): Omit<Table, Key> => {
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

// export const emailCheck = async (email: string) => {
//   const emailConflict = await prisma.user.findUnique({
//     where: {
//       email,
//     },
//     select: {
//       deletedAt: true,
//       blockPr: true,
//     },
//   });

//   if (emailConflict) {
//     //이미존재할때
//     const today = new Date().getTime();
//     if (emailConflict.deletedAt) {
//       //삭제한 이력이 있을경우
//       const interval = today - emailConflict.deletedAt.getTime();
//       if (Math.floor(interval / (1000 * 60 * 60 * 24)) < 90) {
//         //삭제한지 3개월 미만일 경우
//         return "threeMonth";
//       }
//     } else {
//       //삭제한이력이 없을경우
//       if (emailConflict.blockPr) {
//         //차단 이력이 있을경우
//         if (emailConflict.blockPr.getTime() - today >= 0) {
//           //아직 차단기간 중일경우
//           return "yetBlock";
//         } else {
//           //차단기간이 지났을경우
//           await prisma.user.update({
//             where: { email },
//             data: {
//               blockPr: null,
//               blockRs: null,
//             },
//           });
//         }
//       }
//       //존재하지만 삭제이력도 없고 차단도 안된 유저일경우
//       return "conflictEmail";
//     }
//   }
// };
