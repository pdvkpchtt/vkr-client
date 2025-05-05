export const getDriverAuto = async () => {
  try {
    const res = await fetch(`http://localhost:8000/driver/get_info_auto`, {
      // method: "POST",
      credentials: "include",
      headers: {
        accept: "application/json",
        //   "content-type": "application/x-www-form-urlencoded",
      },
      // body: JSON.stringify(formData),
    })
      .catch((err) => {
        return { error: "Что-то пошло не так" };
      })
      .then((res) => {
        if (res.status >= 400) return res.json();

        if (!res || !res.ok) {
          return { error: "Что-то пошло не так" };
        }

        return res.json();
      })
      .then((data) => {
        if (!data) {
          return { error: "Что-то пошло не так" };
        } else return data;
      });

    return res;
  } catch (err) {
    return { error: "Что-то пошло не так" };
  }
};
