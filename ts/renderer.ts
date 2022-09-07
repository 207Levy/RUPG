
class Renderer{
    profileTemplate: HandlebarsTemplateDelegate<any>
    quoteTemplate: HandlebarsTemplateDelegate<any>
    aboutTemplate: HandlebarsTemplateDelegate<any>
    friendsTemplate: HandlebarsTemplateDelegate<any>
    pokemonTemplate: HandlebarsTemplateDelegate<any>

    constructor() {
        this.profileTemplate = Handlebars.compile($("#profile-template").html());
        this.quoteTemplate = Handlebars.compile($("#kanye-template").html());
        this.aboutTemplate = Handlebars.compile($("#about-template").html());
        this.friendsTemplate = Handlebars.compile($("#friends-template").html());
        this.pokemonTemplate = Handlebars.compile($("#pokemon-template").html());

    }

    render(data:Data){
        this.renderProfile(data.profile);
        this.renderQuote(data.quote);
        this.renderPokemon(data.pokemon)
        this.renderAbout(data.about);
        this.renderFriends(data.friends)
    }


    renderProfile(profile: Profile):void {
        $(".profile").empty();
        const inject = this.profileTemplate(profile);
        $(".profile").append(inject);
    }     

    renderQuote(quote: string):void {
        $(".quote").empty();
        const inject = this.quoteTemplate({quote});
        $(".quote").append(inject);
    }
    renderAbout(about: string){
        $(".about").empty();
        const inject = this.aboutTemplate({about});
        $(".about").append(inject);
    }
    renderFriends(friends: Friend[]):void {
        $(".friends").empty();
        const inject = this.friendsTemplate({friend: friends});
        $(".friends").append(inject);
    }

    renderPokemon(pokemon: Pokemon):void{
        $(".poke").empty();
        const inject = this.pokemonTemplate(pokemon);
        $(".poke").append(inject);
    }

    renderSavedUsers(): void{
        if(!localStorage.users){
            alert("No users on localstorage");
            return;
        }
        this.emptyAll();
        const container = $(".quote");
        const ul = $(`<ul class="users"></ul>`);
        const users = JSON.parse(localStorage.users);
        for (let i=0; i<users.length; i++) {
            ul.append(`<li class="user" data-id="${i}">${users[i].profile.fname} ${users[i].profile.lname}</li>`)
        }
        container.append(ul);
    }

    private emptyAll():void {
        $(".profile").empty();
        $(".quote").empty();
        $(".about").empty();
        $(".poke").empty();
        $(".friends").empty();
    }
}