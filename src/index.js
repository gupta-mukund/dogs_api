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
const DOGS_BOX = document.getElementById("dogs_box");
window.onload = () => __awaiter(void 0, void 0, void 0, function* () {
    let names = yield fetchDogs("https://dog.ceo/api/breeds/list/all");
    for (let name in names) {
        console.log(name);
        let tmp = document.createElement("option");
        tmp.innerText = name;
        DOGS_BOX.append(tmp);
    }
});
const fetchDogs = (url) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield fetch(url);
    let data = yield result.json();
    return data.message;
});
