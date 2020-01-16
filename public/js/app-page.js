const wForm = document.querySelector('form');
const txtLoc = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')
wForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    msg1.textContent = 'Loading...'
    msg2.textContent = ''
    const url = 'http://localhost:3000/weather?loc='+ txtLoc.value
    fetch(url).then((response) => {
        response.json().then((data)=>{
            if(data.error)
            msg1.textContent = data.error
            else
                msg1.textContent = data.location
                msg2.textContent = data.weather
        })
    })
});