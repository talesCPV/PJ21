
const btnNovo = document.getElementById("btnNovo");
const btnPesq = document.getElementById("btnPesq");
const edtBusca = document.getElementById('edtBusca');
const cmbBusca = document.getElementById('cmbBusca');
const table = document.querySelector('.search-table');


btnNovo.addEventListener("click", function(){
    openHTML("cad_prod.html","","Cadastro de Produto","modal");
});

btnPesq.addEventListener("click", function(){

    table.innerHTML = 
    `<table>
    <th>Cod</th>
    <th>Descrição</th>    
    </table>`;

    const resp = queryDB("pesq_prod",[cmbBusca.value,edtBusca.value]);

    resp.then(result =>{
        let arr = JSON.parse(result);

        arr.forEach((item)=>{
            let row = document.createElement('tr');
            let id = document.createElement('td');
            id.style.display = 'none';
            id.innerHTML = item[0];
            row.appendChild(id);
            let cod = document.createElement('td');
            cod.innerHTML = item[1];
            row.appendChild(cod);
            let desc = document.createElement('td');
            desc.innerHTML = item[2];
            row.appendChild(desc);


            table.appendChild(row);
//            alert(index+"-"+item);
        
        });

 
       
    });
    resp.catch(error =>{
        alert(error);
    });

});
