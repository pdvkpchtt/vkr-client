export const createHistory = async (formData = {}) => {
  const { bid_id, run, description, work_hours, spares } = formData;

  try {
    const res = await fetch(
      `http://localhost:8000/mechanic/add_history?bid_id=${bid_id}&run=${run}&description=${description}&work_hours=${work_hours}&spares=${spares}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          accept: "application/json",
          "content-type": "application/x-www-form-urlencoded",
        },
        // body: JSON.stringify(formData),
      }
    )
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
