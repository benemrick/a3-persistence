window.onload = function () {
    document.getElementById("signButton").addEventListener("click", function () {
        console.log("clicked the sign in")

        const resp = fetch('/index', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    });

}