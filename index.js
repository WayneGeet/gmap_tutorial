const api_url = "http://127.0.0.1:8000/";
const token = "";

document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    await getCsrf()

    await login(email, password);
});
document.getElementById("logoutForm").addEventListener("submit", async (event) => {
    event.preventDefault()
    await logout()
})
async function getCsrf(){
    const response = await fetch(api_url+"accounts/csrf/")
    const data = await response.json()
    console.log(data)
}



async function logout(){
    const response = await fetch(api_url+"users/logout/", {
        method:"POST",
        credentials:"include",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({})
    })
    const data = await response.json()
    console.log(data)
}

async function login(email, password) {
    const response = await fetch(api_url + "users/login/", {
        method: "POST", // Set the method to POST
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });

    const data = await response.json();
    console.log(data); // Handle the response data as needed
}
