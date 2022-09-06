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
class User {
    constructor(profile, quote, pokemon, about, friends) {
        this.profile = profile;
        this.quote = quote;
        this.pokemon = pokemon;
        this.about = about;
        this.friends = friends;
        this.profile = profile;
        this.quote = quote;
        this.pokemon = pokemon;
        this.about = about;
        this.friends = friends;
    }
}
class Model {
    static generateData() {
        return __awaiter(this, void 0, void 0, function* () {
            let profileResponse = yield Model.generateProfile();
            let aboutResponse = yield Model.generateAbout();
            let quoteResponse = yield Model.generateQuote();
            let pokeResponse = yield Model.generatePokemon();
            let friendResponse = yield Model.generateFriends(profileResponse.fname, profileResponse.lname);
            Model.currentUser = new User(profileResponse, quoteResponse, pokeResponse, aboutResponse, friendResponse);
            return Model.currentUser;
        });
    }
    static generateProfile() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield $.get("https://randomuser.me/api/?results=1&inc=name,location,picture");
            let fname = response.results[0].name.first;
            let lname = response.results[0].name.last;
            let city = response.results[0].location.city;
            let country = response.results[0].location.country;
            console.log(response.results[0].picture);
            let imgUrl = response.results[0].picture.medium;
            return {
                fname,
                lname,
                city,
                country,
                imgUrl,
            };
        });
    }
    static generateQuote() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield $.get("https://api.kanye.rest/");
            let quote = response.quote;
            return quote;
        });
    }
    static generatePokemon() {
        return __awaiter(this, void 0, void 0, function* () {
            let num = Math.floor(Math.random() * 900);
            const response = yield $.get(`https://pokeapi.co/api/v2/pokemon/${num}/`);
            let name = response.name;
            let imgUrl = response.sprites.front_default;
            return { name, imgUrl };
        });
    }
    static generateAbout() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield $.get("https://baconipsum.com/api/?type=meat-and-filler&sentences=1");
            let about = response[0];
            return about;
        });
    }
    static generateFriends(profilefirst, profileLast) {
        return __awaiter(this, void 0, void 0, function* () {
            const friends = [];
            let i = 0;
            const response = yield $.get("https://randomuser.me/api/?results=8&inc=name");
            let listOfFriends = response.results;
            for (let friend of listOfFriends) {
                if (i == 7) {
                    break;
                }
                if (friend.name.first === profilefirst && friend.name.last === profileLast) {
                    continue;
                }
                let fname = friend.name.first;
                let lname = friend.name.last;
                friends.push({ fname, lname });
                i++;
            }
            console.log(friends);
            return friends;
        });
    }
}
