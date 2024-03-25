$(document).ready(function () {
    const username = localStorage.getItem("username")
    const allTransactions = JSON.parse(localStorage.getItem("transactions")) || []
    const updatedTransactions = allTransactions.filter((transaction) => transaction.username !== username)

    const redirectToLoginPage = () => {
        window.location.href = "login.html"
    }

    const displayGreeting = (username) => {
        $("#greeting").text(`Hello, ${username}!`)
    }

    const initializePage = () => {
        if (!username) {
            redirectToLoginPage()
        } else {
            displayGreeting(username)
        }
    }

    $("#logout-option").click(() => {
        localStorage.removeItem("username")
        redirectToLoginPage()
    })

    $("#clean-logout-option").click(() => {
        Swal.fire({
            title: "Are you sure to logout and clear all data?",
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.setItem("transactions", JSON.stringify(updatedTransactions))
                localStorage.removeItem("username")
                redirectToLoginPage()
            }
        })
    })

    initializePage()
})
