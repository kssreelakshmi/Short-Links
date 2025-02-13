import {jwtDecode} from "jwt-decode";
import axios from "axios";

const baseURL = "http://127.0.0.1:8000";

const updateAdminToken = async () => {
  const refreshToken = localStorage.getItem("refresh");

  try {
    const response = await axios.post(baseURL + "/api/user/token/refresh/", {
      refresh: refreshToken,
    });

    if (response.status === 200) {
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const fetchisAdmin = async () => {
  const token = localStorage.getItem("access");

  try {
    const response = await axios.get(baseURL + "/api/user/details/", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.data.is_superadmin; // Return directly from the function
  } catch (error) {
    return false;
  }
};

const isAuthAdmin = async () => {
  const accessToken = localStorage.getItem("access");
  
  if (!accessToken) {
    return { name: null, isAuthenticated: false, isAdmin: false };
  }
  
  const currentTime = Date.now() / 1000;
  let decoded = jwtDecode(accessToken);
  if (decoded.exp > currentTime) {
    let checkAdmin = await fetchisAdmin(); // Await the result
    return {
      name: decoded.username,
      isAuthenticated: true,
      isAdmin: checkAdmin,
    };
  } else {
    const updateSuccess = await updateAdminToken();

    if (updateSuccess) {
      let decoded = jwtDecode(accessToken);
      let checkAdmin = await fetchisAdmin(); // Await the result
      return {
        name: decoded.username,
        isAuthenticated: true,
        isAdmin: checkAdmin,
      };
    } else {
      return { name: null, isAuthenticated: false, isAdmin: false };
    }
  }
};

export default isAuthAdmin;