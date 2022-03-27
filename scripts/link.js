async function getDetailBerita() {
    let main = document.querySelector("#body-content");

    const response = await fetch('./pages/detail_berita.html');
    const detailBerita = await response.text();

    main.innerHTML = detailBerita;
}

