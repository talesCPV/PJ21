const btnLogin = document.getElementById("btnLogin");
const edtUser = document.getElementById("edtUser");
const edtPass = document.getElementById("edtPass");


btnLogin.addEventListener("click",function(){

    const resp = queryDB('login',[edtUser.value,edtPass.value]);

    resp.then(result =>{
        let resp = JSON.parse(result);
        let status = resp[0];
        if (status === 200){
            alert("Seja bem vindo "+resp[1]+" sua permissão é "+resp[2]);
            modal.style.display = "none";
        }else{
            alert(resp[1]);
        }
       
    });
    resp.catch(error =>{
        alert(error);
    });

});