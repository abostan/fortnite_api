(() => {
    const setupEventListeners = () => {

    }

    const loadShopAndChallenges = () => {
        displayBrNews()
    }

    const displayBrNews = () => {
        window.ApiService.searchNews()
            .then(result => displayBrNewsItems(result.entries))
            .catch(() => $('#br-news-container').empty().append(
                displayAlert(defaultAlertClasses, 'Sorry, but could not display the Battle Royale news.')
            ))
    }

    const displayBrNewsItems = (entries) => $('#br-news-container').empty().append(
        entries.map(
            element => { return brNewsElement(element) }
        )
    )


    const brNewsElement = (element) => {

        function toDateTime(secs) {
            var t = new Date(1970, 0, 1); // Epoch
            t.setSeconds(secs);
            return t;
        }
        var time = element.time;
        time = toDateTime(time)
        
        var myDate = new Date(time);
        var day = myDate.getDate();
        var month = myDate.getMonth();
        var year = myDate.getFullYear();

        function pad(n) {
            return n < 10 ? '0' + n : n
        }

        var date_news = pad(day) + "/" + pad(month + 1) + "/" + year;

        return $('<div></div>').addClass('card shadow p-3 mx-1 my-1 bg-white').height('80%').width('80%')
            .append($('<div></div>').addClass('card-container')
                .append($('<a></a>').attr({ href: element.image, alt: element.title })
                    .append($('<img/>').addClass('card-img-top').attr({ src: element.image, alt: element.title }).height('100%').width('100%')))
                .append($('<div></div>').addClass('card-body')
                    .append($('<div></div>')
                        .append($('<h5></h5>').addClass('card-title text-primary').text(element.title))
                        .append($('<p></p>').text(element.body).addClass('text-justify'))
                        .append($('<p></p>').text(date_news))
                        .append($('<span></span>').text(element.meta.adSpace).addClass('badge badge-success'))
                    )
                )
            );
    }

    const init = () => {
        window.ApiService.apiHost('https://fortnite-public-api.theapinetwork.com/prod09/')
        setupEventListeners()
        loadShopAndChallenges()
    }

    window.FortniteSearchController = {
        init
    }
})()