$(document).ready(function(){
const employeeGallery = $('#gallery')

const url ='https://randomuser.me/api/?results=12&nat=us';
// retrieving and creating card element out of the api response of employees
    $.getJSON(url,function(data){
        const array = [];
    data.results.forEach(employee => {
        
        if(employee.phone.replace(/[^\d]/g, "").length === 10){
            
            array.push(employee)
        }
    })

    const employeeArray =[]
    for(let i = 0; i < 12; i++){
        employeeArray.push( array[i])
    }
    
    const employeesData = employeeArray.map((employee,index) =>{
       
            return `  <div class="card" data-index=${index}>
            <div class="card-img-container">
                <img class="card-img" src=${employee.picture.large} alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="card-text">${employee.email}</p>
                <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
            </div>
            </div>`
        
   
    }
    )
   
    // Formaating phine number
    function formatNumber(num){
          // stripe all none number 
          const number = num.replace(/[^\d]/g, "");
          const employeePhone = number.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
          return employeePhone;
    }
    // Formating date of birth
    function dOB(dateOfB){
        const date = dateOfB.date;
            
            const arry = date.substring(0,10).split('-');
            const dateOfBirth = arry.reverse().join('/');
            return dateOfBirth;
    }
    // Showing the previous 
    function previous(e){
        const modal = e.currentTarget.parentNode.parentNode;
        
        // Selected modal name 
        // const selectedModalName = $('#name').html();
        let indexNum;

        // Cards array
        const cardsArray = document.querySelectorAll('.card');
        cardsArray.forEach((el) => {
            const cardName =  modal.children[1].children[1].innerHTML;
            
            if (el.children[1].children[0].innerHTML === cardName){
                let cardIndex = el.dataset.index
                indexNum = parseInt(cardIndex);
                let prevcard;
                if(indexNum === 0 || indexNum === 11){
                    prevcard = cardsArray[indexNum ]
                } else{
                    prevcard = cardsArray[indexNum + 1]
                }
                const prvName =prevcard.children[1].children[0].innerHTML;
                
                data.results.forEach(employee =>{
                    const name = `${employee.name.first} ${employee.name.last}`;
                    const employeePhone = formatNumber(employee.phone);
        
                    // user date of birth 
                    const date =  dOB(employee.dob);
                    
                    if(name === prvName){
                        $('.modal-container').remove();
                        $('body').append( `<div class="modal-container">
                        <div class="modal">
                            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                            <div class="modal-info-container">
                                <img class="modal-img" src=${employee.picture.large} alt="profile picture">
                                <h3 id="name" class="modal-name cap">${name}</h3>
                                <p class="modal-text">${employee.email} </p>
                                <p class="modal-text cap">${employee.location.city} </p>
                                <hr>
                                <p class="modal-text">${employeePhone}</p>

                                <p class="modal-text">${employee.location.postcode} ${employee.location.state} , ${employee.location.state}, OR 97204</p>
                                <p class="modal-text">Birthday: ${date}</p>
                            </div>
                            <div class="modal-btn-container">
                                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                                </div>
                        </div>`)
                    } 
                })
                 
             
                




                $('#modal-close-btn').click(() => $('.modal-container').remove()); 
            }
            
        })
    }
    // Showing the next 
    function next(e){
        const modal = e.currentTarget.parentNode.parentNode;
        // Selected modal name 
        // const selectedModalName = $('#name').html();
        let indexNum;

        // Cards array
        const cardsArray = document.querySelectorAll('.card');
        cardsArray.forEach((el) => {
            const cardName =  modal.children[1].children[1].innerHTML;
            
            if (el.children[1].children[0].innerHTML === cardName){
                let cardIndex = el.dataset.index
                indexNum = parseInt(cardIndex);
                let prevcard;
                if(indexNum === 0 || indexNum === 11){
                    prevcard = cardsArray[indexNum ]
                } else{
                    prevcard = cardsArray[indexNum + 1]
                }
                
                
                const prvName =prevcard.children[1].children[0].innerHTML;
                
                data.results.forEach(employee =>{
                    const name = `${employee.name.first} ${employee.name.last}`;
                    const employeePhone = formatNumber(employee.phone);
        
                    // user date of birth 
                    const date =  dOB(employee.dob);
                    
                    if(name === prvName){
                        $('.modal-container').remove();
                        $('body').append( `<div class="modal-container">
                        <div class="modal">
                            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                            <div class="modal-info-container">
                                <img class="modal-img" src=${employee.picture.large} alt="profile picture">
                                <h3 id="name" class="modal-name cap">${name}</h3>
                                <p class="modal-text">${employee.email} </p>
                                <p class="modal-text cap">${employee.location.city} </p>
                                <hr>
                                <p class="modal-text">${employeePhone}</p>

                                <p class="modal-text">${employee.location.postcode} ${employee.location.state} , ${employee.location.state}, OR 97204</p>
                                <p class="modal-text">Birthday: ${date}</p>
                            </div>
                            <div class="modal-btn-container">
                                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                                </div>
                        </div>`)
                    } 
                })
                 
             
                




                $('#modal-close-btn').click(() => $('.modal-container').remove()); 
            }
            
        })
    }
    // inserting the employes cards in the gallery
    employeeGallery.html(employeesData)

    // adding click event to the employeee cards
    $('.card').click((e) => {
        
        const selectedEmployeeName = (e.currentTarget.querySelector('#name').innerHTML)
        const employees = data.results;
        employees.forEach(employee => {
            const name = `${employee.name.first} ${employee.name.last}`;
            const employeePhone = formatNumber(employee.phone);
            
            // user date of birth 
            const date =  dOB(employee.dob);
            
            // const arry = date.substring(0,10).split('-');
            // const dateOfBirth = arry.reverse().join('/');
            if(name === selectedEmployeeName){
                $('body').append( `<div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src=${employee.picture.large} alt="profile picture">
                <h3 id="name" class="modal-name cap">${name}</h3>
                <p class="modal-text">${employee.email} </p>
                <p class="modal-text cap">${employee.location.city} </p>
                <hr>
                <p class="modal-text">${employeePhone}</p>
                <p class="modal-text">${employee.location.postcode} ${employee.location.state} , ${employee.location.state}, OR 97204</p>
                <p class="modal-text">Birthday: ${date}</p>
            </div>
            <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
        </div>`)
        // Selecting previous button
        $('#modal-prev').click((e)=>{
            previous(e)
            
        })
        // Selecting next button
        $('#modal-next').click((e)=>{
            
            next(e);
        })
            }
        });

        // Closing modal on click 
        $('#modal-close-btn').click(() => $('.modal-container').remove());
        
    })
    // search functionality
    const $searchContainer =  $('.search-container');
    $searchContainer.html(`<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
</form>`);

    const $searchForm = $('form');
    $searchForm.submit((e)=>{
        e.preventDefault();
        const $searchInput = $('.search-input').val();
        // employess array 
        const emplaoyeeArray = employeeGallery.children();
        employeeArray.forEach(employee =>{
            
           if($searchInput === employee.name.first || $searchInput === employee.name.last){
            // Formating phone number 
            const employeePhone = formatNumber(employee.phone);
            // Formating date of birth
            const date = dOB(employee.dob);
            employeeGallery.html(
                `  <div class="card">
                <div class="card-img-container">
                    <img class="card-img" src=${employee.picture.large} alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                    <p class="card-text">${employee.email}</p>
                    <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
                </div>
                </div>`
               )
               $('.card').click(()=>{
                $('body').append( `<div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src=${employee.picture.large} alt="profile picture">
                        <h3 id="name" class="modal-name cap">${name}</h3>
                        <p class="modal-text">${employee.email} </p>
                        <p class="modal-text cap">${employee.location.city} </p>
                        <hr>
                        <p class="modal-text">${employeePhone}</p>
                        <p class="modal-text">${employee.location.postcode} ${employee.location.state}. , ${employee.location.state}, OR 97204</p>
                        <p class="modal-text">Birthday: ${date}</p>
                    </div>
                    
                </div>`)
                $('#modal-close-btn').click(()=>$('.modal-container').remove())
               })
               
               
           } 
           
        });
       
        
    })
   

    });


    
    
})
