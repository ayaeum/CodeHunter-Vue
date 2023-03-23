import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import enhance from './modules/enhance'
import online from './modules/online'
import task from './modules/task'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    enhance,
    online,
    task,
  },
  state: {
    taskName:"",
    owner:"",
    repo:"",
    sha:"",
    recursive:"",
    onchekcFile:[],

    wareHouse:"",
    branch:"",
    scanLanguage:"",
    platform:"",

    //用来解密后端信息的私钥
    privateKey1:"-----BEGIN PRIVATE KEY-----\n" +
      "MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCwaYfr41LbikJW\n" +
      "v/ux+AAxHillRSOV/jVD2YzatKkrw3zJO6+Uyp6rGbNk9cUkjpPzTyCkBc0O1h3q\n" +
      "35XLmIHUNAbW05KNgA4PHWQK0iyl4982wI2GKpZCQPm1TYBkRrKpJydJDtcpmOmk\n" +
      "vUky8jW0OyzTHMc9IPC4DGKd2I+BNbYtlHDh/EF7/oE5P2+ecSwtcNbY79lP8aIE\n" +
      "TFsEQX9rOvxz81Kq0f24fkGWKxQHNdQouTHjAGersY2FWHyEQOlCBiWzyuFhssYX\n" +
      "nxTdBA7k4LC8pE74L1kymKW1oTPc0OwNL8wWU+KcJ1wLZsF6OktB39bSFF2P0fRI\n" +
      "KcA+IOmDAgMBAAECgf9WBcpsZu0rIMA4jRAEOGqKM6r74ZBOE9I6w7AWSwIzKkrZ\n" +
      "1cDzTS+8lKEQb3KH4P6Ze9GZfzqpgWoVSJxC1fB5CZBMMTRwINa6MsVrLBGZfa8w\n" +
      "Ll9/N5pjCaFk8eXUVU/JgXjRUetEMsxmXebTxkgUcBvrgJz8XJOv1lpASNmxUdnG\n" +
      "oXOvSGI627CbU7eMIPbD+Sx7sINoH4ihYjlrRfRVQS3OWf4EzVcc1b04FrMmdS7P\n" +
      "vHUaCpPzBnCSNinDomNk0b9PZZ4sUC9eY1+8CG4gn5IfRrESTogyUvHFwPrA4du5\n" +
      "NK3p+xtRqBL0XIrDYHC+vnuGHRLt3XskZFCZn80CgYEA7d8B7UczBe+o7SrILjpq\n" +
      "/yNfFi7H4eDH1r+1FKyyjmcQyQMo3V1orG7OgApOYLPZmVjiKr13JExFMFKgbqEl\n" +
      "Khd3ahcGtpW9j7iqPLihLW+H1ckVbvmxB8cT9bIZvUbbWZ9TXnWrvm+ktyYwxcoU\n" +
      "ryDSsC5US7ejrh4NWFPvsy0CgYEAvdttebrGW6Z/cOyYFj234hACJ6HkTK8jw5IB\n" +
      "L4FC+2TN5LRnEcQXk8UODVAPc5rQGMOznS7EXbWvPY5ZlPGJfXwpRhz7r0Ror6y7\n" +
      "85NRHJnPDLDhoLvZBYk1GnRBOLUA9rLFYslXx0ahSGJwGCSFk60l+f/WFdu5OYDY\n" +
      "IuPSvW8CgYEA4kr0n1HLxYrw7udzVx82KRDyZb0NZOKd2ru4PjnpCDYersx1tNon\n" +
      "OVuU0hR76d1PVmZLixOB46M3czg37ecZ3whCD0hml46urqqkMW4Hz5y54fURkeiy\n" +
      "tM58O5I6kGl3RbSf8E4Lm/jD/4Syg4ey08RrCzaX9Qx4B64JTg1UDOUCgYEAsP3m\n" +
      "yRy93qMRG4z1G4bd7flOiPP7iSGdDa0HPeobL5GCADvN+ln8QN3rg62nOfaRGQUY\n" +
      "ZOg8V8AQZipWiOvDaSBeueY7G+GCVoOJlEE51Jfu1b3wGZAFeYu33bmTM/JJu7Jd\n" +
      "IQLiufu2T2y1Y0xo2osIZE+EnUwBGQJse9o3lDECgYAuw8Ba1cp2B4GSuyE9eI+W\n" +
      "XWkERv2vRaIq6jsnrwUxBILjCfPi31STplElci9XK1kOSjaf8vfvOXJvp8J2ggXd\n" +
      "L52Yvewop6p9TuJkk9sa1ZNTdTCuf0juIrbG47oHkwPn2oBJdn/ZPtzm7w/2p8PD\n" +
      "/Ruqii+gnLkTPjqpCwP5+g==\n" +
      "-----END PRIVATE KEY-----",

    //用来加密待发送信息的公钥
    publicKey:"-----BEGIN PUBLIC KEY-----\n" +
      "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3PM8AwkuOW/aKt0ZqnDK\n" +
      "mUvpKE9dMlcr0W7m9XkrI/PpX/MnSSqnxDe7IRQZ33beyCno0h97bXlDnq273NPO\n" +
      "YHXKeindneIxUwCSjGPWEMTvG2tqACCEtFrm3Ghg4w51LFJr4Dj33fTG21gZhNTt\n" +
      "L34A5RzC2XAC3N6axkFX7J+4u18oD/XJpCTb4vlh0n27NR52XLEMsJO7MrRZILOS\n" +
      "8h7nNkqzoiop+5zgRiRRjEv1r2Q441ButeYpO3vVQ/I6PDG7NT4fyfyXDrpb2IJa\n" +
      "QmhsQ+sCJQdhA3CS6NZpsEiXKvDEWgcCIRb+tITXQwq7ElefHaa4OJMI/JfxNbqM\n" +
      "AwIDAQAB\n" +
      "-----END PUBLIC KEY-----",
  },
  mutations: {
    receive(state,parameter){
      state.taskName=parameter.taskName;
      state.owner=parameter.owner;
      state.repo=parameter.path;
      state.sha=parameter.branch;
      state.recursive=parameter.recursive;
      state.wareHouse=parameter.wareHouse;
      state.branch=parameter.branch;
      state.scanLanguage=parameter.language;
      state.platform=parameter.platform;
    },

    setRsaKeys(state,Keys){
      state.privateKey = Keys.privateKey1;
      state.publicKey = Keys.publicKey;
    }
  },
  actions: {

  },
  getters
})
