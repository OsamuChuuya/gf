const cards = document.getElementById('cards')
const box = document.getElementById('box')
const card = document.getElementById('card')
const input = document.getElementById('input')
const select = document.getElementById('select')


let users = []
const apiUrl= `https://randomuser.me/api/?results=100`

async function fetchUsers() {
    try{
    box.style.display= 'block'
    const response= await fetch(apiUrl)
    const data = await response.json()
    users = data.results
    displayUsers(users)
    }catch(error){
        console.log(`error`, error)
    }finally{
    box.style.display= "none"
    }
}

function displayUsers(){
   cards.innerHTML=``
   users.forEach(user => {
    const cart = document.createElement('div')
    cart.classList.add('card')
    cart.innerHTML= `
        <img src="${user.picture.medium}" alt="">
        <h2>${user.name.first} ${user.name.last}</h2>
        <p><strong>Yosh:</strong> ${user.dob.age}</p>
        <p><strong>Telefon:</strong> ${user.phone}</p>
        <p><strong>Email:</strong>  ${user.email}</p>
        <p><strong>Manzil:</strong>  ${user.location.city}  ${user.location.country}</p>
    
    
    `
    cards.appendChild(cart)
   }); 
}

function search(){
    const inputValue = input.value.toLowerCase().trim()
    const filter = users.filter(user =>{
        const n = user.name.first.toLowerCase().trim()
        return n.includes(inputValue)
    })
    if(filter.length > 0){
        displayUsers(filter)
    }else{
        cards.innerHTML= `<p>Not found</p>`
    }
}

input.addEventListener('input', search)
fetchUsers()