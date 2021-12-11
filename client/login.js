const user = document.getElementById('user');
const pass = document.getElementById('pass');
document.getElementById("login-button").addEventListener('click', async () => {
    const response = await fetch('./login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: user.value, password: pass.value})
    });

    console.log(response.status)

    if(response.status !== 200){
        const error = document.getElementsByClassName('error')[0];
        error.innerText = "Incorrect username or password";
        error.classList.remove("hidden");
    }
    //redirect
    else{
        location.href = "./index.html"
    }
})

document.getElementById("register-button").addEventListener('click', async () => {
    const response = await fetch('./register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: user.value, password: pass.value})
    });

    if(response.status !== 200){
        const error = document.getElementsByClassName('error')[0];
        error.innerText = "Username already in use";
        error.classList.remove("hidden");
    }
    else{
        location.href = "./index.html"
    }
})