import Cookies from "js-cookie";
import io from "socket.io-client";

const token = Cookies.get("token");
// const socket = io("http://platform.krishibharat.site:5000", {
const socket = io(
  "https://5e25-2401-4900-8815-d21d-909c-f82a-8c06-dcca.ngrok-free.app/",
  {
    extraHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }
);

export default socket;
