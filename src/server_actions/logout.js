import Cookies from "js-cookie";

export const logout = async () => {
  try {
    const response = await fetch("http://localhost:8000/all/logout", {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      return null;
    }

    Cookies.remove("app_token");
    window.location.reload();

    const data = await response?.json();
    return data;
  } catch (error) {
    return null;
  }
};
