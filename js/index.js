const API_URL = 'https://api.jikan.moe/v3'

document.addEventListener("DOMContentLoaded", function (event) {
    const showNavbar = (toggleId, navId, bodyId, headerId) => {
        const toggle = document.getElementById(toggleId),
            nav = document.getElementById(navId),
            bodypd = document.getElementById(bodyId),
            headerpd = document.getElementById(headerId)

        if (toggle && nav && bodypd && headerpd) {
            toggle.addEventListener('click', () => {
                // show navbar
                nav.classList.toggle('show')
                // change icon
                toggle.classList.toggle('fa-times')
                // add padding to body
                bodypd.classList.toggle('body-pd')
                // add padding to header
                headerpd.classList.toggle('body-pd')
            })
        }
    }

    showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header')

    const linkColor = document.querySelectorAll('.nav_link')

    function colorLink() {
        if (linkColor) {
            linkColor.forEach(l => l.classList.remove('active'))
            this.classList.add('active')
        }
    }
    linkColor.forEach(l => l.addEventListener('click', colorLink))
});

const fetchTopAnime = () => {
    fetch(`${API_URL}/top/anime`)
        .then(
            res => {
                return res.json()
            }
        )
        .then(
            res => {
                renderTopAnime(res)
            }
        )
}

const fetchSearchAnime = (searchValue) => {
    fetch(`${API_URL}/search/anime?q=${searchValue}&page=1`)
    .then(
        res => {
            return res.json()
        }
    )
    .then(
        res => {
            renderSearchAnime(res)
        }
    )
}

const renderTopAnime = (data) => {
    const main = document.getElementById('main')
    const container = document.getElementById('this-season')

    main.firstElementChild.innerHTML = `Top 50 Anime List`

    data.top.map(anime => {
        const card = document.createElement('div')
        const cardImg = document.createElement('img')
        const cardHeader = document.createElement('div')
        const cardBody = document.createElement('div')
        const titleContainer = document.createElement('div')

        const rank = document.createElement('p')
        const title = document.createElement('h3')

        const startDate = document.createElement('p')
        const startDateContent = document.createElement('span')
        const endDate = document.createElement('p')
        const endDateContent = document.createElement('span')
        const score = document.createElement('p')
        const scoreContent = document.createElement('span')
        const episodes = document.createElement('p')
        const episodesContent = document.createElement('span')
        const url = document.createElement('p')
        const urlContent = document.createElement('a')

        card.className = 'card col-12 col-sm-6 col-md-4 col-lg-3 p-0 m-2 shadow-sm'
        cardHeader.className = 'card-header p-0'
        cardImg.className = 'img-fluid w-100 h-100'
        cardBody.className = 'card-body d-flex flex-column justify-content-between'
        rank.className = 'text-center mb-1 h3 fw-bold'
        title.className = 'h5 text-center my-2 fw-bold mt-0'

        cardImg.src = anime.image_url
        rank.innerHTML = `${anime.rank}º`
        title.innerHTML = `${anime.title}`

        startDate.innerHTML = 'Start Date: '
        startDate.className = 'fw-bold'
        startDateContent.className = 'fw-normal'
        startDateContent.innerHTML = `${anime.start_date}`

        endDate.innerHTML = 'End Date: '
        endDate.className = 'fw-bold'
        endDateContent.className = 'fw-normal'
        endDateContent.innerHTML = `${anime.end_date}`

        score.innerHTML = 'Score: '
        score.className = 'fw-bold'
        scoreContent.className = 'fw-normal'
        scoreContent.innerHTML = `${anime.score}`

        episodes.innerHTML = 'Episodes: '
        episodes.className = 'fw-bold'
        episodesContent.className = 'fw-normal'
        episodesContent.innerHTML = `${anime.episodes}`

        url.className = 'text-center'
        urlContent.href = `${anime.url}`
        urlContent.innerHTML = 'See more'
        urlContent.target = '__blank'

        container.appendChild(card)
        card.appendChild(cardHeader)
        card.appendChild(cardBody)
        cardHeader.appendChild(cardImg)
        cardBody.appendChild(titleContainer)
        titleContainer.appendChild(rank)
        titleContainer.appendChild(title)
        cardBody.appendChild(startDate)
        startDate.appendChild(startDateContent)
        cardBody.appendChild(endDate)
        endDate.appendChild(endDateContent)
        cardBody.appendChild(score)
        score.appendChild(scoreContent)
        cardBody.appendChild(episodes)
        episodes.appendChild(episodesContent)
        cardBody.appendChild(url)
        url.appendChild(urlContent)
    })

}

const renderSearchSection = () => {
    let searchValue = ''
    const searchBar = document.getElementById('search-bar')
    const inputContainer = document.createElement('div')
    const input = document.createElement('input')
    const button = document.createElement('button')

    inputContainer.className = 'col-8'
    input.className = 'form-control'
    input.placeholder = 'Search your anime'
    input.type = 'text'
    button.className = 'col-4 btn btn-block btn-primary btn-custom-primary'
    button.innerHTML = 'Search'

    main.firstElementChild.innerHTML = `Search`

    searchBar.appendChild(inputContainer)
    inputContainer.appendChild(input)
    searchBar.appendChild(button)

    input.addEventListener('change', (e) => searchValue = e.target.value)
    input.addEventListener('keyup', (e) => {
        (e.key === 'Enter' && searchValue && searchValue.trim()) && fetchSearchAnime(searchValue)
    })
    button.addEventListener('click', () => {
        fetchSearchAnime(searchValue)
    })


}

const renderSearchAnime = (res) => {
    const { results } = res
    const container = document.getElementById('search')

    container.innerHTML = ' '

    results.map(anime => {
        const card = document.createElement('div')
        const cardImg = document.createElement('img')
        const cardHeader = document.createElement('div')
        const cardBody = document.createElement('div')
        const titleContainer = document.createElement('div')
        const title = document.createElement('h3')
        const infoContainer = document.createElement('div')

        const synopsis = document.createElement('p')
        const synopsisContent = document.createElement('span')
        const score = document.createElement('p')
        const scoreContent = document.createElement('span')
        const url = document.createElement('p')
        const urlContent = document.createElement('a')

        card.className = 'card col-12 col-sm-6 col-md-4 col-lg-3 p-0 m-2 shadow-sm'
        cardHeader.className = 'card-header p-0'
        cardImg.className = 'img-fluid w-100 h-100'
        cardBody.className = 'card-body d-flex flex-column'
        title.className = 'h5 text-center my-2 fw-bold mt-0'

        cardImg.src = anime.image_url
        title.innerHTML = `${anime.title}`

        infoContainer.className = 'd-flex flex-column justify-content-between h-100 mt-2'

        synopsis.innerHTML = 'Synopsis: '
        synopsis.className = 'fw-bold'
        synopsisContent.className = 'fw-normal'
        synopsisContent.innerHTML = `${anime.synopsis}`

        score.innerHTML = 'Score: '
        score.className = 'fw-bold'
        scoreContent.className = 'fw-normal'
        scoreContent.innerHTML = `${anime.score}`

        url.className = 'text-center'
        urlContent.href = `${anime.url}`
        urlContent.innerHTML = 'See more'
        urlContent.target = '__blank'

        container.appendChild(card)
        card.appendChild(cardHeader)
        card.appendChild(cardBody)
        cardHeader.appendChild(cardImg)
        cardBody.appendChild(titleContainer)
        titleContainer.appendChild(title)
        cardBody.appendChild(infoContainer)

        infoContainer.appendChild(synopsis)
        synopsis.appendChild(synopsisContent)
        infoContainer.appendChild(score)
        score.appendChild(scoreContent)
        infoContainer.appendChild(url)
        url.appendChild(urlContent)
    })
}

window.onload = function () {
    if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
        fetchTopAnime()
    }
  
    if (window.location.pathname === '/search.html') {
        renderSearchSection()
    }
};