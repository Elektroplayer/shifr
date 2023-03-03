import Encrypter from "./mechanizm.js";

let encrypter1 = new Encrypter();
encrypter1.setPassword("элементарность")

let text = "Приветствую тебя! Готов рассказать тебе о смысле бытия, французских булочках, или о моём шифре.";
let encryptedText1 = encrypter1.encrypt(text);
let decryptedText1 = encrypter1.decrypt(encryptedText1);

console.log(text);
console.log(encryptedText1);
console.log(decryptedText1);

let encryptedText2 = encrypter1.encrypt(text);
let decryptedText2 = encrypter1.decrypt(encryptedText2);

console.log(encryptedText2);
console.log(decryptedText2);