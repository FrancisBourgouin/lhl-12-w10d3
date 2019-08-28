import uuid from "uuid/v4"

interface TinyURLStruture {
  [id: string]: SingleTinyURL
}
interface SingleTinyURL {
  id:string,
  longURL:string,
  userId:string
}
const urlDatabase2: TinyURLStruture = {
  b2xvn2: "https://google.com"
}

const urlNewDatabase2 = {
  b2xvn2: {
    id: "b2xvn2",
    longURL: "http://google.com"
  }
}

const addNewUrl = () => {
  let id = uuid();
  let longURL = "https://google.com"

  urlDatabase2[id] = { id, longURL }
}
// console.log(urlNewDatabase2["b2xvn2"].longurl)


// let bob2: any = "123"
// bob2 = 0


// let amountOfElements = 0
// for (let i = 0; i < 10; i++) {
//   amountOfElements += "i"
// }