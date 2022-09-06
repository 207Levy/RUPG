"use strict";
class Controller {
    static saveUser() {
        console.log("sadfsdf");
        if (Model.currentUser) {
            if (localStorage.users) {
                let users = JSON.parse(localStorage.users);
                for (let user of users) {
                    if (JSON.stringify(user) === JSON.stringify(Model.currentUser)) {
                        alert("User already exists...");
                        return;
                    }
                }
                console.log(users.length);
                users.push(Model.currentUser);
                localStorage.users = JSON.stringify(users);
            }
            else {
                localStorage.users = JSON.stringify([Model.currentUser]);
            }
        }
        else {
            alert("no User to save");
        }
    }
    static loadUser() {
    }
}
Controller.renderer = new Renderer();
Controller.generateUser = () => {
    const renderer = new Renderer();
    Model.generateData().then(function (data) {
        renderer.render(data);
    });
};
