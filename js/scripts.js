const totalResults = 12;
const engSpeakingCountries = "au,ca,ie,nz,us";
let matchingIndexes = [];

const appendGallery = (allEmployees) => {
    
    const pageBody = document.querySelector("body");
    const cardsGallery = document.querySelector("#gallery");
    let allModals = [];
    
    class employeeClass {
        constructor (image, firstName, lastName, email, city, state, street, postcode, cell, rawBirthday, index) {
            this.image = image;
            this.name = `${firstName} ${lastName}`;
            this.email = email;
            this.location = `${city}, ${state}`;
            this.fullAddress = `${street}, ${city}, ${state} ${postcode}`;
            this.cell = cell;
            this.rawBirthday = rawBirthday;
            this.modal;
            this.index = index;
        }
    
        get birthday () {
            let birthday = this.rawBirthday.match(/(\d+)-(\d+)-(\d+)/);
            return `${birthday[3]}/${birthday[2]}/${birthday[1]}`;
        }
    
        createCard () {
            let employeeCard = document.createElement("div")
            employeeCard.classList.add("card")
            employeeCard.innerHTML = `
                <div class="card-img-container">
                    <img class="card-img" src="${this.image}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${this.name}</h3>
                    <p class="card-text">${this.email}</p>
                    <p class="card-text cap">${this.location}</p>
                </div>
            `;
            cardsGallery.appendChild(employeeCard);
            
            employeeCard.addEventListener ("click", () => {
                pageBody.appendChild(this.modal);
            });
        }
    
        createModal () {
            let employeeModal = document.createElement("div")
            employeeModal.classList.add("modal-container")
        
            employeeModal.innerHTML =
            `<div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn btn"><strong>X</strong></button>
                <div class="modal-info-container">
                <img class="modal-img" src="${this.image}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${this.name}</h3>
                <p class="modal-text">${this.email}</p>
                <p class="modal-text cap">${this.location}</p>
                <hr>
                <p class="modal-text">Tel: ${this.cell}</p>
                <p class="modal-text cap">${this.fullAddress}</p>
                <p class="modal-text">Birthday: ${this.birthday}</p>
            </div>
            <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>`;
            allModals.push(employeeModal);
            this.modal = employeeModal;
            
            employeeModal.querySelector(".modal-close-btn").addEventListener("click", () => {
            pageBody.removeChild(this.modal)
            });

            let prevButton = employeeModal.querySelector("#modal-prev")
            let nextButton = employeeModal.querySelector("#modal-next")
    
            prevButton.addEventListener("click", () => {
                pageBody.removeChild(employeeModal);
                let usedIndex = matchingIndexes.indexOf(this.index);
                pageBody.appendChild(allModals[matchingIndexes[usedIndex -1]]);
            });
    
            nextButton.addEventListener("click", () => {
                pageBody.removeChild(employeeModal)
                let usedIndex = matchingIndexes.indexOf(this.index);
                pageBody.appendChild(allModals[matchingIndexes[usedIndex + 1]]);
            });
    
            if (this.index === 0) {
                prevButton.style.visibility = "hidden"
            } else if (this.index === allEmployees.length - 1) {
                nextButton.style.visibility = "hidden"
            };
        }
    }

    allEmployees.forEach((employee, index) => {
        let employeeProfile = new employeeClass (
            employee.picture.large, 
            employee.name.first,
            employee.name.last, 
            employee.email, 
            employee.location.city, 
            employee.location.state,
            employee.location.street,
            employee.location.postcode,
            employee.cell,
            employee.dob.date,
            index
            );
        matchingIndexes.push(index);
        employeeProfile.createModal();
        employeeProfile.createCard();
    });

    const searchByName = () => {
        let userInput = searchInput.value.toLowerCase();
        let allEmployeeCards = document.querySelectorAll(".card");
        let employeeNames = document.querySelectorAll("#name");
        matchingIndexes = [];
        for (i = 0; i < allEmployeeCards.length; i++) {
            allEmployeeCards[i].classList.add("disabled");
            if (employeeNames[i].innerHTML.includes(userInput)) {
                matchingIndexes.push(i); 
                allEmployeeCards[i].classList.remove("disabled");
            }
        }
        for (i = 0; i < allEmployeeCards.length; i++) {
            if (matchingIndexes.indexOf(i) === 0) {
                allModals[i].querySelector("#modal-prev").classList.add("disabled");
            } else if (matchingIndexes.indexOf(i) === matchingIndexes.length - 1) {
                allModals[i].querySelector("#modal-next").classList.add("disabled");
            }

            if (userInput === "") {
                allModals[i].querySelector("#modal-prev").classList.remove("disabled")
                allModals[i].querySelector("#modal-next").classList.remove("disabled")
            }
        }
    };

    
    document.querySelector(".search-container").innerHTML = `
    <form action="#" method="get" autocomplete="off">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`;
    const searchBar = document.querySelector("form");
    const searchInput = document.querySelector("#search-input");

    searchBar.addEventListener("keyup", (e)=> {
        searchByName();
    });
    searchBar.addEventListener("submit", (e)=> {
        searchByName();
    });
}

fetch(`https://randomuser.me/api/?results=${totalResults}&nat=${engSpeakingCountries}`)
.then(response => response.json())
.then(data => appendGallery(data.results))