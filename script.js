const upBtn = document.querySelector('.up-btn')
const rightBtn = document.querySelector('.right-btn')
const downBtn = document.querySelector('.down-btn')
const leftBtn = document.querySelector('.left-btn')

const copperMineBtn = document.querySelector('.copper-mine')
const craftCottageBtn = document.querySelector('.craft-cottage')

const restBtn = document.querySelector('.rest')
const fightBtn = document.querySelector('.fight')
const gatherBtn = document.querySelector('.gather')
const craftBtn = document.querySelector('.craft')

const characterName = document.querySelector('.name')
const cooldownEl = document.querySelector('.cooldownTimer')
const xPlace = document.querySelector('.x-place')
const yPlace = document.querySelector('.y-place')




//Use node index.js in the terminal for execute the script.
//Warning: Firefox does not fully support the editor. Please use a chromimum-based web browser such as Chrome, Brave or Edge.
//This script is a basic example of a player's movement. You can load other examples by clicking on "Load example".
const server = "https://api.artifactsmmo.com"
//Your token is automatically set
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFtZWxpZS5zYWxvbW9uc3NvbnNAZ21haWwuY29tIiwicGFzc3dvcmRfY2hhbmdlZCI6IiJ9.eG8GdAoKDzCYxet_fp4tq_L1cidgEfwiwD4aWY_OOAk"
//Put your character name here
const character = "mamelie"

// Character variables
let currentXPos = 0
let currentYPos = 0
let cooldownTimer = 5

async function getCharacter() {
    const url = server + "/characters/" + character

     const options = {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
    },
  }
  
  try {
    const response = await fetch(url, options)
    const data = await response.json()

    console.log(data)

    currentXPos = data.data.x
    currentYPos = data.data.y

    characterName.innerText = data.data.name
    xPlace.innerText = data.data.x
    yPlace.innerText = data.data.y

    console.log("we've got character info")

  } catch (error) {
    console.log(error)
  }
}
getCharacter()

 
async function movement(currentXPos, currentYPos) {
      
  const url = server + '/my/' + character +'/action/move'
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: `{"x":${currentXPos},"y":${currentYPos}}`//change the position here
  };
  
  try {
    const response = await fetch (url, options)
    const { data } = await response.json()

    console.log(data)

    currentXPos = data.data.destination.x
    currentYPos = data.data.destination.y
    cooldownTimer = data.data.cooldown.remaining_seconds

    xPlace.innerText = data.data.x
    yPlace.innerText = data.data.y

    if(cooldownTimer > 0) {
        cooldown()
    }

  } catch (error) {
    console.log(error)
  }
  }
  

upBtn.addEventListener('click', () => {
    console.log("up")

    movement(currentYPos, (currentYPos - 1))
    getCharacter()
})

rightBtn.addEventListener('click', () => {
    console.log("right")

    movement((currentXPos + 1), currentYPos)
    getCharacter()
})

downBtn.addEventListener('click', () => {
    console.log("down")

    movement(currentYPos, (currentYPos + 1))
    getCharacter()
})

leftBtn.addEventListener('click', () => {
    console.log("left")

    movement((currentXPos - 1), currentYPos)
    getCharacter()
})

function cooldown() {
    cooldownEl.innerText = `chilling for: ${cooldownTimer} seconds`
    if(cooldownTimer > 0) {
        setTimeout(cooldown, 1000)
        cooldownTimer--

        console.log(cooldownTimer)
    }
    else {
        console.log("let's go!")
    }
}

async function rest() {
    const url = server + '/my/' + character +'/action/rest'
  
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
      },
    }
    
    try {
      const response = await fetch(url, options)
      const data = await response.json()
  
      console.log(data)
      cooldownTimer = data.data.cooldown.remaining_seconds
  
      if(cooldownTimer > 0) {
          cooldown()
      }
  
    } catch (error) {
      console.log(error)
    }
}


async function fight() {
    const url = server + '/my/' + character +'/action/fight'
      
    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
        },
    }
        
    try {
        const response = await fetch(url, options)
        const data = await response.json()
      
        console.log(data)
        cooldownTimer = data.data.cooldown.remaining_seconds
      
        if(cooldownTimer > 0) {
             cooldown()
        }
      
    } catch (error) {
          console.log(error)
    }
}


async function gather() {
    const url = server + '/my/' + character +'/action/gathering'
          
    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
        },
    }
            
    try {
        const response = await fetch(url, options)
        const data = await response.json()
          
        console.log(data)
        cooldownTimer = data.data.cooldown.remaining_seconds
          
        if(cooldownTimer > 0) {
            cooldown()
        }
          
    } catch (error) {
        console.log(error)
    }
}

 async function craft () {
  const url = server + '/my/' + character + '/action/crafting'

  const options = {
    method: 'POST',
    headers: {
      'Constent-Type' : 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer' + token
    },
    body: {
      "code": "copper",
      "quantity": 1
  }
}
  try {
    const response = await fetch(url, options)
    const data = await response.json()

    cooldownTimer = data.data.cooldown.remaining_seconds
    
    if(cooldownTimer > 0){
      cooldown()
    }
  }catch (error){
  console.log(error)
  }
}
restBtn.addEventListener('click', rest)
fightBtn.addEventListener('click', fight)
gatherBtn.addEventListener('click',gather)
craftBtn.addEventListener('click',craft)

copperMineBtn.addEventListener('click', () => movement(2,0))
craftCottageBtn.addEventListener('click', () => movement(1,5))