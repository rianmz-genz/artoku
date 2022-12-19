// login
let users = JSON.parse(localStorage.getItem("users")) || []
let handleSubmit = () => {
    // getValue
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let dataUser = { username, password }
    // setTolocalStorage
    localStorage.setItem("users", JSON.stringify(dataUser))
    if(username != "admin"){
        return document.getElementById("notes").innerHTML = "Isi data terlebih dahulu"
    }
    window.location.href = "index"
    // setinput null
    document.getElementById("username").value = ""
    document.getElementById("password").value = ""
}
