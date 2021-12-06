// Module for event listner
const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchInput.value

    messageOne.textContent = 'Loading....'
    
    fetch(`http://localhost:3000/weather?address=${location}`).then(res => {
    res.json().then(data => {
        if (data.error) {
            return messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})
})