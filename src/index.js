"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
const DOGS_BOX = document.getElementById("dogs_box");
const IMAGE_BOX = document.getElementById("image");
var ARROWS = [];
ARROWS.push(document.getElementById("left_arrow"));
ARROWS.push(document.getElementById("right_arrow"));
window.onload = () => __awaiter(void 0, void 0, void 0, function* () {
    let names = yield fetchDogs("https://dog.ceo/api/breeds/list/all");
    for (let name in names) {
        let tmp = document.createElement("option");
        tmp.innerText = name;
        DOGS_BOX.append(tmp);
    }
    console.log(ARROWS[1]);
    ARROWS.forEach((el) => el.addEventListener("click", (e) => {
        Slider.useSlider(e.target);
    }));
    DOGS_BOX.addEventListener("change", (event) => {
        Slider.hasAlreadyChanged++;
        IMAGE_BOX.innerText = "";
        Slider.displayImages(event.target);
    });
});
const fetchDogs = (url) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield fetch(url);
    let data = yield result.json();
    return data.message;
});
class Slider {
    static fetchImages(url) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield fetch(url);
            let data = yield result.json();
            return yield data.message.splice(0, 10);
        });
    }
    static addClasses() {
        ARROWS.forEach((el) => {
            el.classList.add("arrow");
        });
        console.log(ARROWS[0].className);
    }
    static useSlider(arrow) {
        if (this.result.length == 0) {
            return;
        }
        switch (arrow.id) {
            case "left_arrow":
                if (this.image == 0) {
                    this.image = this.result.length - 1;
                }
                else {
                    this.image--;
                }
                break;
            case "right_arrow":
                if (this.image == this.result.length - 1) {
                    this.image = 0;
                }
                else {
                    this.image++;
                }
                break;
            default:
                break;
        }
        IMAGE_BOX.style.backgroundImage = `url(${this.result[this.image]})`;
    }
}
_a = Slider;
Slider.image = 0;
Slider.result = [];
Slider.hasAlreadyChanged = 0;
Slider.displayImages = (event) => __awaiter(void 0, void 0, void 0, function* () {
    _a.image = 0;
    _a.hasAlreadyChanged <= 1 && _a.addClasses();
    _a.result = yield _a.fetchImages(`https://dog.ceo/api/breed/${event.value}/images`);
    IMAGE_BOX.style.backgroundImage = `url(${_a.result[0]})`;
});
