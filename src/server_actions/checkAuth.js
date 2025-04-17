export const checkAuth = async () => {
  try {
    const response = await fetch("http://localhost:8000/all/me", {
      credentials: "include",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};
