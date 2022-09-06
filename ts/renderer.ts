
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


    renderProfile(profile: Profile){
        $(".profile").empty();
        const inject = this.profileTemplate(profile);
        $(".profile").append(inject);
    }

    renderQuote(quote: string){
        $(".quote").empty();
        const inject = this.quoteTemplate({quote});
        $(".quote").append(inject);
    }
    renderAbout(about: string){
        $(".about").empty();
        const inject = this.aboutTemplate({about});
        $(".about").append(inject);
    }
    renderFriends(friends: Friend[]){
        $(".friends").empty();
        const inject = this.friendsTemplate({friend: friends});
        $(".friends").append(inject);
    }

    renderPokemon(pokemon: Pokemon){
        $(".poke").empty();
        const inject = this.pokemonTemplate(pokemon);
        $(".poke").append(inject);
    }
}