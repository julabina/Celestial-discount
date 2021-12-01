let datas;

fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    datas = data;
  });
