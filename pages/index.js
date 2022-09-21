import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState();
  useEffect(() => {
    async function getUser() {
      const res = await axios.get("/api/user");
      setUser(res.data.user);
    }
    getUser();
  }, []);
  return <h1>Hello world</h1>;
}
