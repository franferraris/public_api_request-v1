const results = 12;
const cardsGallery = document.querySelector("#gallery");
const modalBody = document.querySelector("body");

const appendGallery = (allEmployees) => {
    allEmployees.forEach((employee) => {
        let employeePicture = employee.picture.large;
        let employeeName = `${employee.name.first} ${employee.name.last}`;
        let employeeEmail = employee.email;
        let employeeCity = `${employee.location.city}, ${employee.location.state}`;
        let employeeFullAddress = `${employee.location.street}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}`;
        let employeeRawBirthday = employee.dob.date;
        let employeeBirthday = employeeRawBirthday.replace(/-/g, '/').match(/^[^T]+/);
        let employeeCard = document.createElement("div");
        employeeCard.classList.add("card");
        employeeCard.innerHTML = `
            <div class="card-img-container">
                <img class="card-img" src="${employeePicture}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${employeeName}</h3>
                <p class="card-text">${employeeEmail}</p>
                <p class="card-text cap">${employeeCity}</p>
            </div>
        `;
        cardsGallery.appendChild(employeeCard);

        employeeCard.addEventListener ("click", () => {
            let employeeModal = document.createElement("div");
            employeeModal.classList.add("modal-container");
            employeeModal.innerHTML =
            `<div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                <img class="modal-img" src="${employeePicture}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="modal-text">${employee.email}</p>
                <p class="modal-text cap">${employee.location.city}, ${employee.location.state}</p>
                <hr>
                <p class="modal-text">${employee.cell}</p>
                <p class="modal-text">${employeeFullAddress}</p>
                <p class="modal-text">Birthday: ${employeeBirthday}</p>
            </div>`
            modalBody.appendChild(employeeModal);
            document.querySelector(".modal-close-btn").addEventListener('click', () => {
                modalBody.removeChild(employeeModal);
            })
        });
    });
    
}


fetch(`https://randomuser.me/api/?results=${results}`)
.then(response => response.json())
.then(data => appendGallery(data.results))
