$(document).ready(async function () {
    await getNav();
    await getBody();
});

let url = location.href;
document.body.addEventListener('click', () => {
    requestAnimationFrame(async () => {
        if (url !== location.href) {
            url = location.href;

            await getBody();
        }
    });
}, true);

window.onhashchange = async function () {
    if (window.innerDocClick) {
        console.log('hash');
    } else {
        await getBody();
        console.log('back button');
    }
}

async function getNav() {
    let sidenav = document.getElementById('sidenav');
    let response = await fetch('../nav.html');
    let responseText = await response.text();

    sidenav.innerHTML = responseText;
}

async function getBody() {
    let main = document.getElementById('body-content');
    let currentRoute = window.location.href;
    let response = new Response();
    let responseText = "";

    try {
        if (currentRoute.includes('#')) {
            let route2Array = currentRoute.split('#');
            let lastIndex = route2Array.length;
            let fileName = route2Array[lastIndex - 1];

            response = await fetch(`pages/${fileName}.html`);
            if (response.status == 200) {
                responseText = await response.text();

                main.innerHTML = responseText;
            } else {
                main.innerHTML = '<center><h1>Maaf halaman tidak berhasil dimuat</h1></center>';
            }
        } else {
            response = await fetch(`pages/home.html`);
            responseText = await response.text();

            main.innerHTML = responseText;
        }
    } catch (e) {
        main.innerHTML = '<center><h1>Maaf halaman tidak berhasil dimuat</h1></center>';
    }
}