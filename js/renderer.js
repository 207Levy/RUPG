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
        this.emptyAll();
        this.renderProfile(data.profile);
        this.renderQuote(data.quote);
        this.renderPokemon(data.pokemon);
        this.renderAbout(data.about);
        this.renderFriends(data.friends);
    }
    renderProfile(profile) {
        const inject = this.profileTemplate(profile);
        $(".profile").append(inject);
    }
    renderQuote(quote) {
        const inject = this.quoteTemplate({ quote });
        $(".quote").append(inject);
    }
    renderAbout(about) {
        const inject = this.aboutTemplate({ about });
        $(".about").append(inject);
    }
    renderFriends(friends) {
        const inject = this.friendsTemplate({ friend: friends });
        $(".friends").append(inject);
    }
    renderPokemon(pokemon) {
        const inject = this.pokemonTemplate(pokemon);
        $(".poke").append(inject);
    }
    renderSavedUsers() {
        if (!localStorage.users) {
            alert("No users on localstorage");
            return;
        }
        const container = $(".dropdown-container");
        container.empty();
        // const ul = $(`<ul class="users"></ul>`);
        const users = JSON.parse(localStorage.users);
        for (let i = 0; i < users.length; i++) {
            container.append(`<a class="user" data-id="${i}">${users[i].profile.fname} ${users[i].profile.lname}</a>`);
        }
        container.toggleClass("show");
    }
    emptyAll() {
        $(".profile").empty();
        $(".quote").empty();
        $(".about").empty();
        $(".poke").empty();
        $(".friends").empty();
        $(".dropdown-container").empty();
    }
}
