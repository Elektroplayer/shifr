export default class Encrypter {
    defaultAlphabet = ' абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ1234567890!.,?:;/\\'.split("");
    alphabet = this.defaultAlphabet;
    debug = false;

    password;

    static getDefaultAlfabet() {
        return this.defaultAlphabet.join("");
    }

    /*
    Установка алфавита. Можно установить дефолтный русский из getDefaultAlfabet().
    */
    setAlphabet(alphabetString) {
        this.alphabet = alphabetString.split("");
    }

    /*
    Установка пароля.
    */
    setPassword(newPassword) {
        this.password = newPassword;
    }

    randomChar () {
        return this.alphabet[Math.floor(Math.random() * this.alphabet.length)];
    }
    
    getChar (number) {
        let n = Math.abs(number)%this.alphabet.length
        
        if(number < 0 && n != 0) n = this.alphabet.length - n;
    
        return this.alphabet[n];
    }

    getSupernumberOne() {
        return Math.ceil(this.password.split("").reduce((sum, x) => sum + this.alphabet.indexOf(x), 0)/(this.password.length * 5))
    }

    getSupernumberTwo() {
        let superNumber = this.getSupernumberOne();

        return Math.abs(superNumber) < 2 ? 2 : Math.abs(superNumber)
    }

    /*
    Генерирует минимально возможный алфавит
    */
    genereteAlphabet(string) {
        let out = [];

        string.split("").forEach(elm => {
            if(!out.includes(elm)) out.push(elm);
        });

        this.password.split("").forEach(elm => {
            if(!out.includes(elm)) out.push(elm);
        });

        this.alphabet = out.join("");
    }

    /*
    Шифрование строки. Возвращает зашифрованную строку.
    */
    encrypt(stringToEncrypt) {
        if(!this.password) throw Error("Пароль обязателен к вводу!");

        stringToEncrypt.split("").forEach(elm => {
            if(!this.alphabet.includes(elm)) {
                this.alphabet.push(elm);
                console.log(`В конец алфавита добавлен элемент ${elm} из шифруемой строки`)
            }
        });

        this.password.split("").forEach(elm => {
            if(!this.alphabet.includes(elm)) {
                this.alphabet.push(elm);
                console.log(`В конец алфавита добавлен элемент ${elm} из пароля`)
            }
        });

        let superNumber = this.getSupernumberOne();
        let superNumber2 = this.getSupernumberTwo();

        let encryptedText = "";
        let num;
        for(let i = 0;i<stringToEncrypt.length;i++) {
            num = this.alphabet.indexOf(stringToEncrypt[i]) + this.alphabet.indexOf(stringToEncrypt[i-1]) + (i+1)*superNumber - superNumber2 + this.alphabet.indexOf(this.password[i%this.password.length]) + i

            encryptedText += this.getChar(num)

            if(this.debug) {
                console.log(num, this.alphabet.indexOf(this.getChar(num)))
                console.log({
                    "Текущий чар": this.alphabet.indexOf(stringToEncrypt[i]),
                    "Предыдущий": this.alphabet.indexOf(stringToEncrypt[i-1]),
                    "Произведение супер числа": (i+1)*superNumber,
                    "Пароль": this.alphabet.indexOf(this.password[i%this.password.length])
                })
            }
        }

        for(let i = 0;i<encryptedText.length;i+=superNumber) {
            encryptedText = [encryptedText.slice(0, i), this.randomChar(), encryptedText.slice(i)].join('')
        }

        return encryptedText;
    }

    decrypt(stringToDecrypt) {
        if(!this.password) throw Error("Пароль обязателен к вводу!");

        if( stringToDecrypt.split("").find(b => !this.alphabet.includes(b)) || this.password.split("").find(b => !this.alphabet.includes(b))) throw Error("Строка или пароль содержат символы, которых нет в алфавите");
        
        let superNumber = this.getSupernumberOne();
        let superNumber2 = this.getSupernumberTwo();

        for(let i = 0;i<stringToDecrypt.length;i+=superNumber-1) {
            stringToDecrypt = stringToDecrypt.slice(0, i) + stringToDecrypt.slice(i+1);
        }

        let decryptedText = ""
        let num;
        for(let i = 0;i<stringToDecrypt.length;i++) {
            num = this.alphabet.indexOf(stringToDecrypt[i]) - this.alphabet.indexOf(decryptedText[i-1]) - (i+1)*superNumber + superNumber2 - this.alphabet.indexOf(this.password[i%this.password.length]) - i

            decryptedText += this.getChar(num)

            if(this.debug) {
                console.log(num, this.alphabet.indexOf(this.getChar(num)))
                console.log({
                    "Текущий чар": this.alphabet.indexOf(stringToDecrypt[i]),
                    "Предыдущий": this.alphabet.indexOf(decryptedText[i-1]),
                    "Произведение супер числа": (i+1)*superNumber,
                    "Пароль": this.alphabet.indexOf(this.password[i%this.password.length])
                })
            }
        }

        return decryptedText;
    }
}