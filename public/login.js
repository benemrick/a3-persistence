function submitForm() {
    event.preventDefault()

    let username = document.getElementById('inputEmail');
    let password = document.getElementById('password');
    let body = JSON.stringify({
        username: username.value,
        password: password.value
    });

    fetch('/login', {
            method: 'POST',
            body: body,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(function (resp) {
            console.log(resp)
            if (resp.ok) {
                console.log("success")
                fetch("/index", {
                        method: 'GET',
                        credentials: "include",
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(function (response) {
                        console.log("success")
                        console.log(response)
                        if (response.ok) {
                            window.location.href = response.url //redirect on client-side
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            } else {
                console.log("failed login")
                document.getElementById("message").innerText = "* Invalid login credentials";
            }
        })
        .catch(err => {
            console.log(err)
        })
}