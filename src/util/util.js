const Util = {};

Util.createUID = () =>
  Math.random().toString(36).substring(2) + new Date().getTime().toString(36);

Util.setData = (data) => {
  localStorage.setItem("tasks", JSON.stringify(data));
};

Util.getData = () => {
  const data = JSON.parse(localStorage.getItem("tasks"));
  return data;
};

export default Util;
