"use strict";
class Renderer {
    constructor() {
        this.profileTemplate = Handlebars.compile($("#profile-template").html());
        this.quoteTemplate = Handlebars.compile($("#kanye-template").html());
        this.aboutTemplate = Handlebars.compile($("#about-template").html());
        this.friendsTemplate = Handlebars.compile($("#friends-template").html());
        this.pokemonTemplate = Handlebars.compile($("#pokemon-template").html());
    }
    render(data) {
        this.renderProfile(data.profile);
        this.renderQuote(data.quote);
        this.renderPokemon(data.pokemon);
        this.renderAbout(data.about);
        this.renderFriends(data.friends);
    }
    renderProfile(profile) {
        $(".profile").empty();
        const inject = this.profileTemplate(profile);
        $(".profile").append(inject);
    }
    renderQuote(quote) {
        $(".quote").empty();
        const inject = this.quoteTemplate({ quote });
        $(".quote").append(inject);
    }
    renderAbout(about) {
        $(".about").empty();
        const inject = this.aboutTemplate({ about });
        $(".about").append(inject);
    }
    renderFriends(friends) {
        $(".friends").empty();
        const inject = this.friendsTemplate({ friend: friends });
        $(".friends").append(inject);
    }
    renderPokemon(pokemon) {
        $(".poke").empty();
        const inject = this.pokemonTemplate(pokemon);
        $(".poke").append(inject);
    }
}
