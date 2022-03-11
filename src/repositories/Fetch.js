export const fetchIt = (url, method = "GET", body = null) => {
    let options = {
        "method": method,
        "headers": {}
    }

    switch (method) {
        case "POST":
            options.headers = {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("ace__token")}`
            }
            break;
        case "PUT":
            options.headers = {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("ace__token")}`
            }
            break;
        default:
            options.headers = {
                "Authorization": `Token ${localStorage.getItem("ace__token")}`
            }
            break;
    }

    if (body !== null) {
        options.body = body
    }
    if (options.method === "DELETE" || options.method === "PUT") {
        return fetch(url, options)
    } else {
        return fetch(url, options).then(r => r.json())
    }
}