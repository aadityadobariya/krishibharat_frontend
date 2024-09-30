import Cookies from "js-cookie";
import io from "socket.io-client";

const token = Cookies.get("token");
const socket = io("http://platform.krishibharat.tech:5000", {
  extraHeaders: {
    Authorization: `Bearer ${token}`,
  },
});

export default socket;
