const DOGS_BOX: HTMLSelectElement = document.getElementById(
  "dogs_box"
) as HTMLSelectElement;

window.onload = async () => {
  let names: { [key: string]: string } = await fetchDogs(
    "https://dog.ceo/api/breeds/list/all"
  );

  for (let name in names) {
    console.log(name);
    let tmp = document.createElement("option");
    tmp.innerText = name;
    DOGS_BOX.append(tmp);
  }
};

const fetchDogs = async (url: string) => {
  let result = await fetch(url);
  let data = await result.json();
  return data.message;
};

console.log("prova");
