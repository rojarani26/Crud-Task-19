function saveTheDetails(event){
    event.preventDefault();
    const name = event.target.username.value;
    const email = event.target.emailId.value;
    const phonenumber = event.target.phonenumber.value;
    // localStorage.setItem('name', name)
    // localStorage.setItem('email', email)
    // localStorage.setItem('phonenumber', phonenumber)

    const obj = {
        name,
        email,
        phonenumber
    }
    localStorage.setItem(obj.email, JSON.stringify(obj))
    showUsersOnScreen(obj)
}

axios.post("https://crudcrud.com/api/21043332b1f14194ae17ecb20f0fe6c1/appointmentData", obj)
.then((response) => {
    showUsersOnScreen(response,data)
    // console.log(response)
})
.catch((err) => {
    document.body.innerHTML = document.body.innerHTML + "<h4>Something Went Wrong</h4>";
    console.log(err)
})

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/21043332b1f14194ae17ecb20f0fe6c1/appointmentData")
    .then((response) => {
        console.log(response)

        for(var i=0;i<response.data.length;i++){
            showUsersOnScreen(response.data[i])
        }
    })
    .catch((error) => {
        console.log(error)
    })
    console.log(data)
})

function deleteUser(userId){
    axios.delete(`https://crudcrud.com/api/21043332b1f14194ae17ecb20f0fe6c1/appointmentData`)
    .then((response) => {
        
    })
}

function showUsersOnScreen(obj){
    const parentElem = document.getElementById('listOfItems')
    const childElem = document.createElement('li');
    childElem.textContent = obj.name + '----' + obj.email + '----' + obj.phonenumber

    const dltBtn = document.createElement('input')
    dltBtn.type = 'button'
    dltBtn.value = 'Delete expense'
    dltBtn.onclick = () => {
        localStorage.removeItem(obj)
        parentElem.removeChild(childElem)
    }

    childElem.appendChild(dltBtn)
    parentElem.appendChild(childElem)

    const editBtn = document.createElement('input')
    editBtn.type = 'button'
    editBtn.value = 'Edit expense'
    editBtn.onclick = () => {
     localStorage.removeItem(obj)
     parentElem.removeChild(childElem)
     document.getElementById('username').value = obj.name;
     document.getElementById('emailId').value = obj.email;
     document.getElementById('phonenumber').value = obj.phonenumber;   
    }
    childElem.appendChild(dltBtn)
    childElem.appendChild(editBtn)
    parentElem.appendChild(childElem)
    
}