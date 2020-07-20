const dogsURL = 'http://localhost:3000/dogs'

document.addEventListener('DOMContentLoaded', () => {
    getDogs()
});

function getDogs(){
    fetch(dogsURL)
    .then(response => response.json())
    .then(json => {
        for(const dog of json){
            createDog(dog);
        };
    });
};

function createDog(dog){
    const table = document.getElementById('table-body');
    const tr = document.createElement('tr')

    tr.innerHTML = `
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button>Edit Dog</button></td>
    `;

    tr.id = dog.id;

    const button = tr.getElementsByTagName('button')[0];

    button.addEventListener('click', () => {
        patchDog(dog)
    });

    table.appendChild(tr);
};

function patchDog(dog){
    const dogForm = document.getElementById('dog-form');

    const formName = dogForm.getElementsByTagName('input')[0];
    const formBreed = dogForm.getElementsByTagName('input')[1];
    const formSex = dogForm.getElementsByTagName('input')[2];

    formName.value = dog.name;
    formBreed.value = dog.breed;
    formSex.value = dog.sex;

    dogForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        dog.name = formName.value;
        dog.breed = formBreed.value;
        dog.sex = formSex.value;

        fetch(`${dogsURL}/${dog.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(dog)
        })
        .then(response => response.json())
        .then(json => getDog(json))
    });
};

function getDog(dog){
    fetch(`${dogsURL}/${dog.id}`)
    .then(response => response.json())
    .then(json => showDog(json))
};

function showDog(dog){
    const editedTr = document.getElementById(dog.id)
    editedTr.innerHTML = `
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button>Edit Dog</button></td>
    `;
};