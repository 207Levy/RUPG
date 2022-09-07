interface Profile {
    fname: string,
    lname: string,
    city: string,
    country: string,
    imgUrl: string,
}

interface Pokemon{
  name: string,
  imgUrl: string
}

interface Friend{
  fname: string,
  lname:string
}


interface Data{
  profile: Profile,
  quote:string,
  pokemon: Pokemon
  about: string,
  friends: Friend[]
}

class User implements Data{
  
  constructor(public profile:Profile, public quote: string,public pokemon: Pokemon, public about:string, public friends: Friend[]){
    this.profile = profile;
    this.quote = quote;
    this.pokemon = pokemon;
    this.about = about;
    this.friends = friends;
  }
}

class Model {
    static currentUser:User;
    static async generateData(){
      
      let profileResponse = await Model.generateProfile();
      let aboutResponse = await Model.generateAbout();
      let quoteResponse = await Model.generateQuote();
      let pokeResponse = await Model.generatePokemon();
      let friendResponse = await Model.generateFriends(profileResponse.fname, profileResponse.lname);

      Model.currentUser = new User(profileResponse, quoteResponse, pokeResponse ,aboutResponse, friendResponse);
      return Model.currentUser;
    }

    static async generateProfile(): Promise<Profile> {
      const response = await $.get(
        "https://randomuser.me/api/?results=1&inc=name,location,picture"
      );
      let fname: string = response.results[0].name.first;
      let lname: string = response.results[0].name.last;
      let city: string = response.results[0].location.city;
      let country: string = response.results[0].location.country;
      console.log(response.results[0].picture);
      let imgUrl: string = response.results[0].picture.medium;
      return {
        fname,
        lname,
        city,
        country,
        imgUrl,
      };
    }

    static async generateQuote(){
        const response = await $.get("https://api.kanye.rest/");
        let quote: string = response.quote;
        return quote;
    }

    static async generatePokemon(): Promise<Pokemon>{
      let num = Math.floor(Math.random()*900)
      const response = await $.get(`https://pokeapi.co/api/v2/pokemon/${num}/`);
      let name = response.name;
      name= name.toUpperCase()[0] + name.slice(1);
      let imgUrl = response.sprites.front_default;
      return {name, imgUrl}
    }
    static async generateAbout(){
        const response = await $.get("https://baconipsum.com/api/?type=meat-and-filler&sentences=1");
        let about: string = response[0];
        return about;
    }

    static async generateFriends(profilefirst:string, profileLast:string ){
        const friends = [];
        let i = 0;
        const response = await $.get("https://randomuser.me/api/?results=8&inc=name");
        let listOfFriends = response.results;
        for(let friend of listOfFriends){
          if(i==7){
            break;
          }
            if(friend.name.first === profilefirst && friend.name.last === profileLast){
                continue;
            }
            let fname: string = friend.name.first;
            let lname: string = friend.name.last;

            friends.push({fname, lname});
            i++;
        }
        console.log(friends);
        return friends;
    }

    static loadUser(index: number): User{
      let users = JSON.parse(localStorage.users);
      Model.currentUser = users[index];
      console.log(users);
      return users[index];
    }
  }