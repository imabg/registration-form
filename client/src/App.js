import React, { useState, useEffect } from "react";
import axios from "axios";

import Captcha from "./Context";
import CustomRoutes from "./routes";

function App() {
  let [isCaptcha, setCaptcha] = useState(false);
  let [ip, setIp] = useState("");

  useEffect(() => {
    axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.REACT_APP_IP_API_KEY}`).then((res) => {
      axios.post(`http://localhost:8000/ip`, {ip: res.data.ip}).then((resIP) => {
        setCaptcha(resIP.data.IPMatch);
        setIp(res.data.ip)
      });
    });
  });

  return (
    <Captcha.Provider value={{isCaptcha, ip}}>
      <CustomRoutes />
    </Captcha.Provider>
  );
}

export default App;
