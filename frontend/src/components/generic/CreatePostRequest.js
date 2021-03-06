const getCookie = (name) => {
    if (!document.cookie) {
        return null;
    }

    const xsrfCookies = document.cookie.split(';')
        .map(c => c.trim())
        .filter(c => c.startsWith(name + '='));

    if (xsrfCookies.length === 0) {
        return null;
    }
    return decodeURIComponent(xsrfCookies[0].split('=')[1]);
}

export default function createPostRequest(body) {


    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFTOKEN': getCookie('csrftoken'),
        },
        body: JSON.stringify(body)
    }
}