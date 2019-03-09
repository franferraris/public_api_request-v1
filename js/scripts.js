const modalBody = document.querySelector("body");
const cardsGallery = document.querySelector("#gallery");
const totalResults = 12;
let allModals = [];


const appendGallery = (allEmployees) => {
    allEmployees.forEach((employee) => {
        
        let employeeCard = document.createElement("div");
        employeeCard.classList.add("card");
        employeeCard.innerHTML = `
            <div class="card-img-container">
                <img class="card-img" src="${employee.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="card-text">${employee.email}</p>
                <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
            </div>
        `;
        cardsGallery.appendChild(employeeCard);

        employeeCard.addEventListener ("click", () => {
            let employeeModal = document.createElement("div");
            employeeModal.classList.add("modal-container");
            let employeeRawBirthday = employee.dob.date.match(/(\d+)-(\d+)-(\d+)/);
            employeeModal.innerHTML =
            `<div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="modal-text">${employee.email}</p>
                <p class="modal-text cap">${employee.location.city}</p>
                <hr>
                <p class="modal-text">Tel: ${employee.cell}</p>
                <p class="modal-text cap">${employee.location.street}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
                <p class="modal-text">Birthday: ${employeeRawBirthday[3]}/${employeeRawBirthday[2]}/${employeeRawBirthday[1]}</p>
            </div>
            <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>`;
            allModals.push(employeeModal);
            modalBody.appendChild(employeeModal);
            document.querySelector(".modal-close-btn").addEventListener("click", () => {
            modalBody.removeChild(employeeModal);
            });
        });
    });
    
}

fetch(`https://randomuser.me/api/?results=${totalResults}`)
.then(response => response.json())
.then(data => appendGallery(data.results))