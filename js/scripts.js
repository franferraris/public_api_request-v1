const totalResults = 24;
const engSpeakingCountries = 'au,ca,ie,nz,us';
let employeePages;
let activePage = 1;
let userInput;

const appendGallery = (allEmployees) => {
    
    const modalBody = document.querySelector("body");
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
                modalBody.appendChild(this.modal);
            });
        }
    
        createModal () {
            let employeeModal = document.createElement("div")
            employeeModal.classList.add("modal-container")
        
            employeeModal.innerHTML =
            `<div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
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
            modalBody.removeChild(this.modal)
            });

            let prevButton = employeeModal.querySelector("#modal-prev")
            let nextButton = employeeModal.querySelector("#modal-next")
    
            prevButton.addEventListener("click", () => {
                modalBody.removeChild(employeeModal)
                modalBody.appendChild(allModals[this.index - 1])
            });
    
            nextButton.addEventListener("click", () => {
                modalBody.removeChild(employeeModal)
                modalBody.appendChild(allModals[this.index + 1])
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
        employeeProfile.createModal();
        employeeProfile.createCard();
    });

    let allEmployeeCards = document.querySelectorAll('.card');
    let employeePages = Math.ceil(allEmployeeCards.length / 12);
    
    /***** Page list with links *****/
    var pageList;
    
    const appendPageLinks = () => {
        pageList = document.createElement('ol');
        pageList.classList.add('pagination');
        
        // Creates amount of pages based on number of students
        for (let i = 0; i < employeePages; i++) {
        let pageButton = document.createElement('li');
        let pageLink = document.createElement('a');
        pageLink.innerHTML = i + 1;
        pageLink.setAttribute('href', '#');
        if (pageLink.innerHTML == activePage){
        pageLink.classList.add('active');
        }
        pageButton.appendChild(pageLink);
        pageList.appendChild(pageButton);
        }
        // Adds event listeners to the pages, using the number inside to set Active page
        pageList.addEventListener ('click', (event) => {
        if (event.target.tagName === 'A') {
        pageList.querySelectorAll('a')
        .forEach ( (e) => {
            e.classList.remove('active');
        });
        event.target.classList.add('active');
        activePage = event.target.innerHTML;
        //  showPage();
        }
        }, false);
        // Appends child to the div Page
        modalBody.appendChild(pageList);
    };

    appendPageLinks();
    
    document.querySelector('.search-container').innerHTML = `
    <form action="" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`;
    const searchInput = document.querySelector("#search-input");

    const employeePagination = () => {
        // Checks the input
        userInput = searchInput.value.toLowerCase();
        
        // Adds class visibile to students matching search
        for (let i = 0; i < allEmployeeCards.length; i++) {
            allEmployeeCards[i].style.display = "none";
            if (allEmployeeCards[i].classList.contains("visible")) {
            allEmployeeCards[i].classList.remove("visible");
            }
            if (allEmployeeCards[i].innerText.includes(userInput)) {
            allEmployeeCards[i].classList.add("visible");
            }
        };

    }

    //employeePagination();


}

fetch(`https://randomuser.me/api/?results=${totalResults}&nat=${engSpeakingCountries}`)
.then(response => response.json())
.then(data => appendGallery(data.results))