const DOGS_BOX: HTMLSelectElement = document.getElementById(
  "dogs_box"
) as HTMLSelectElement;
const IMAGE_BOX: HTMLDivElement = document.getElementById(
  "image"
) as HTMLDivElement;
var ARROWS: HTMLSpanElement[] = [];
ARROWS.push(document.getElementById("left_arrow") as HTMLSpanElement);

ARROWS.push(document.getElementById("right_arrow") as HTMLSpanElement);
window.onload = async () => {
  let names: { [key: string]: string } = await fetchDogs(
    "https://dog.ceo/api/breeds/list/all"
  );
  for (let name in names) {
    let tmp = document.createElement("option");
    tmp.innerText = name;
    DOGS_BOX.append(tmp);
  }
  console.log(ARROWS[1]);
  ARROWS.forEach((el) =>
    el.addEventListener("click", (e) => {
      Slider.useSlider(e.target as HTMLSpanElement);
    })
  );
  DOGS_BOX.addEventListener("change", (event) => {
    Slider.hasAlreadyChanged++;
    IMAGE_BOX.innerText = "";
    Slider.displayImages(event.target as HTMLSelectElement);
  });
};

const fetchDogs = async (url: string) => {
  let result = await fetch(url);
  let data = await result.json();
  return data.message;
};

class Slider {
  private static image: number = 0;
  private static result: string[] = [];
  public static hasAlreadyChanged: number = 0;
  static displayImages = async (event: HTMLSelectElement) => {
    this.image = 0;
    this.hasAlreadyChanged <= 1 && this.addClasses();

    this.result = await this.fetchImages(
      `https://dog.ceo/api/breed/${event.value}/images`
    );

    IMAGE_BOX.style.backgroundImage = `url(${this.result[0]})`;
  };

  private static async fetchImages(url: string) {
    let result = await fetch(url);
    let data = await result.json();
    return await (<string[]>data.message).splice(0, 10);
  }
  private static addClasses() {
    ARROWS.forEach((el) => {
      el.classList.add("arrow");
    });
    console.log(ARROWS[0].className);
  }
  static useSlider(arrow: HTMLSpanElement) {
    if (this.result.length == 0) {
      return;
    }
    switch (arrow.id) {
      case "left_arrow":
        if (this.image == 0) {
          this.image = this.result.length - 1;
        } else {
          this.image--;
        }
        break;
      case "right_arrow":
        if (this.image == this.result.length - 1) {
          this.image = 0;
        } else {
          this.image++;
        }
        break;
      default:
        break;
    }
    IMAGE_BOX.style.backgroundImage = `url(${this.result[this.image]})`;
  }
}
