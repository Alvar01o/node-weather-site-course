console.log('client side javascript file is loaded')

const form = document.querySelector('form')
const input = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')


//messageOne.textContent = ''

form.addEventListener('submit', (e) => {
	messageOne.textContent = 'Loading...'
	messagetwo.textContent = ''
	e.preventDefault()
	const location = input.value

	fetch('http://localhost:3003/weather?address='+location).then((response) => {
		response.json().then((data)=>{
			if (data.error) {
				messageOne.textContent = data.error
				messagetwo.textContent = ''
			} else {
				messageOne.textContent = data.location
				messagetwo.textContent = data.forecast
			}
		})
	})
})