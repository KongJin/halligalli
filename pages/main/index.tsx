import { socket } from "@/libs/function";
import type { NextPage } from "next";
import router from "next/router";
import { useEffect, useState } from "react";

const MainPage: NextPage = () => {
  const [roomList, setRoomList] = useState<any>([]);
  const fetchData = () => {
    socket.emit("enter_lobby", (data: any) => {
      console.log({ data });
      setRoomList(data);
    });
  };

  //roomList 요소중 started가 fasle인것을 찾으면 반환 하는 함수
  const findRoom = () => {
    const room = roomList.find((room: any) => {
      if (room) {
        return room.started === false;
      }
    });
    return room;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      <h1>Welcome to HalliGalli</h1>
      <div>
        <h2>방 목록</h2>
        <ul>
          {roomList?.map((room: any) => {
            if (room) {
              return (
                <li key={room.id}>
                  <button
                    onClick={() => {
                      socket.emit("enter_room", room.id);
                      router.push(`/main/${room.id}`);
                    }}
                  >
                    {room.roomName}
                  </button>
                </li>
              );
            }
          })}
        </ul>
      </div>

      <button
        onClick={() => {
          const room = findRoom();
          if (room) {
            socket.emit("enter_room", room.id);
            router.push(`/main/${room.id}`);
          } else {
            socket.emit("create_room", (data: any) => {
              router.push(`/main/${data.id}`);
            });
          }
        }}
      >
        랜덤 매칭
      </button>
    </main>
  );
};

export default MainPage;
