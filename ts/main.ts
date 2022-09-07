class Controller {
    
    static renderer = new Renderer();

    static generateUser = () => {
        Model.generateData().then(function (data){
        Controller.renderer.render(data);})
    }

    static saveUser(){
        console.log("saving...")
        if(Model.currentUser)
        {
            if(localStorage.users){
                let users = JSON.parse(localStorage.users);
                console.log(users);
                for (let user of users) {
                    if(JSON.stringify(user) === JSON.stringify(Model.currentUser))
                    {
                        alert("User already exists...");
                        return;
                    }
                }
                users.push(Model.currentUser);
                localStorage.users = JSON.stringify(users);
            }
            else{
                localStorage.users = JSON.stringify([Model.currentUser]);
            }
        }
        else{
            alert("no User to save");
        }
       
    }



    static loadUser(){
        Controller.renderer.renderSavedUsers();
        $(".quote").on("click", "li", function(){
            let userIndex = $(this).data().id;
            console.log(userIndex);
            let user = Model.loadUser(userIndex);
            Controller.renderer.render(user);
        } )
        
        
    }


}