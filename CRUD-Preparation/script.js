class Stagiaire {
    constructor(nom, prenom, cin, cne, telephone, dateNaissance, typeBac) {
        this.nom = nom;
        this.prenom = prenom;
        this.cin = cin;
        this.cne = cne;
        this.telephone = telephone;
        this.dateNaissance = dateNaissance;
        this.typeBac = typeBac;
    }
}
let table = document.getElementById('table')

window.onload = function() {
    if(localStorage.stagiaires) {
        stagiaires = JSON.parse(localStorage.stagiaires);
        showData();
    }else{
        table.style.display = 'none';
    }
};
function updateLocalStorage() {
    localStorage.stagiaires = JSON.stringify(stagiaires);
}
let tableBody = document.getElementById('tableBody');
let form = document.forms[0];
let subBtn = document.getElementById('submit')
let ids = ["nom", "prenom", "cin", "massar", "tel", "datedenaissance", "typeBac"]
let selectedRow = null
let stagiaires = []

form.addEventListener('submit',(e)=>{

    if(selectedRow == null){
        e.preventDefault()
        appendToTable();
    }else{
        e.preventDefault()
        updateTable();
    }

    emptyInputs();
})

function getInputs() {
    let nom = document.getElementById('nom');
    let prenom = document.getElementById('prenom');
    let cin = document.getElementById('cin');
    let cne = document.getElementById('massar');
    let telephone = document.getElementById('tel');
    let datedenaissance = document.getElementById('datedenaissance');
    let typeBac = document.getElementById('typeBac');
    let inputs = [nom, prenom, cin, cne, telephone, datedenaissance, typeBac];
    return inputs;
}

function appendToTable(){
    let inputs = getInputs();
    valuesOk = true
    inputs.forEach((input)=>{
        if(input.value.trim()==''){
            valuesOk = false
        }
    })
    if(!valuesOk){
        alert('Tous les champs sont obligatoires!')
    }else{
        let newRow = tableBody.insertRow(tableBody.rows.length)
        var i =0
        ids.forEach(id=>{
            newRow.insertCell(i)
            newRow.cells[i].innerHTML = inputs[i].value
            i++
        })
        let operationCell = newRow.insertCell(ids.length)
        operationCell.innerHTML = `<button onclick='edit(this)'>Modifier</button>
                                <button onclick='deleteRow(this)'>Supprimer</button>`;
        table.style.display=''
    }
    stagiaires.push(new Stagiaire(inputs[0].value,inputs[1].value,inputs[2].value,inputs[3].value,inputs[4].value,
                    inputs[5].value,inputs[6].value))
    updateLocalStorage();

    
    
}
function edit(button){
    selectedRow = button.parentElement.parentElement;
    var i =0
    ids.forEach(id=>{
        document.getElementById(id).value= selectedRow.cells[i].innerHTML
        i++;
    })
    subBtn.innerHTML = 'Modifier'
    scroll({
        'top':0,
        'behavior':'smooth',
    })
}
function updateTable(){
    let inputs = getInputs();
    inputs.forEach(input=>{
        if(input.value.trim()==''){
            alert('Tous les champs sont obligatoires!')
            return
        }
    })
    for(let i = 0;i<ids.length;i++){
        selectedRow.cells[i].innerHTML = inputs[i].value
    }
    subBtn.innerHTML = 'Inscrivez-vous'
    selectedRow = null
    updateLocalStorage();
    scroll({
        'top':700,
        'behavior':'smooth',
    })
}
function deleteRow(button){
    let rowToDelete =  button.parentElement.parentElement;
    // tableBody.deleteRow(rowToDelete.index)
    let index = rowToDelete.rowIndex 
    // stagiaires.slice(rowToDelete.index,rowToDelete.index+2)
    tableBody.deleteRow(rowToDelete.rowIndex-1);
    stagiaires.splice(index-1, 1);
    updateLocalStorage();
}
function emptyInputs(){
    ids.forEach(id=>{
        document.getElementById(id).value=''
    })
}
let retourBtn = document.getElementById('retourBtn')
retourBtn.style.display = 'none'

function search() {
    let searchValue = document.getElementById('searchValue').value.toLowerCase(); 
    if(!searchValue.trim()==''){
    tableBody.querySelectorAll('tr').forEach(row => {
        let cellValue = row.querySelectorAll('td')[2].innerHTML.toLowerCase(); 
        if (cellValue.includes(searchValue)) {
            row.style.display = ''; 
        } else {
            row.style.display = 'none'; 
        }
    });
    retourBtn.style.display = 'block'; 
}
}
function showData(){
    tableBody.innerHTML = ''
    retourBtn.style.display = 'none'
    stagiaires = JSON.parse(localStorage.getItem('stagiaires'))
    stagiaires.forEach(stagiaire=>{
        let newRow = tableBody.insertRow(tableBody.rows.length)
        var i =0
        ids.forEach(id=>{
            cell = newRow.insertCell(i)
            i++
        })
        newRow.cells[0].innerHTML = stagiaire.nom
        newRow.cells[1].innerHTML = stagiaire.prenom
        newRow.cells[2].innerHTML = stagiaire.cin
        newRow.cells[3].innerHTML = stagiaire.cne
        newRow.cells[4].innerHTML = stagiaire.telephone
        newRow.cells[5].innerHTML = stagiaire.dateNaissance
        newRow.cells[6].innerHTML = stagiaire.typeBac
        let operationCell = newRow.insertCell(ids.length) 
        operationCell.innerHTML = `<button onclick='edit(this)'>Modifier</button>
                                <button onclick='deleteRow(this)'>Supprimer</button>`;
        tableBody.appendChild(newRow)
    })
}
retourBtn.addEventListener('click',showData())