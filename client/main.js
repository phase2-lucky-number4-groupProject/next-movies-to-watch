let defaultUrl = 'http://localhost:3000';
let tampungMovie = [];

$(document).ready(function(){
    auth()
    CekWeather()
})


function Carousel(){
    $("#waterwheelCarousel").waterwheelCarousel("horizontal",{
    startingItem:               1,   // item to place in the center of the carousel. Set to 0 for auto
    separation:                 175, // distance between items in carousel
    separationMultiplier:       0.6, // multipled by separation distance to increase/decrease distance for each additional item
    horizonOffset:              0,   // offset each item from the "horizon" by this amount (causes arching)
    horizonOffsetMultiplier:    1,   // multipled by horizon offset to increase/decrease offset for each additional item
    sizeMultiplier:             0.7, // determines how drastically the size of each item changes
    opacityMultiplier:          0.8, // determines how drastically the opacity of each item changes
    horizon:                    0,   // how "far in" the horizontal/vertical horizon should be set from the container wall. 0 for auto
    flankingItems:              3,   // the number of items visible on either side of the center                  

    // animation
    speed:                      300,      // speed in milliseconds it will take to rotate from one to the next
    animationEasing:            'linear', // the easing effect to use when animating
    quickerForFurther:          true,     // set to true to make animations faster when clicking an item that is far away from the center
    edgeFadeEnabled:            false,    // when true, items fade off into nothingness when reaching the edge. false to have them move behind the center image
    
    // misc
    linkHandling:               2,                 // 1 to disable all (used for facebox), 2 to disable all but center (to link images out)
    autoPlay:                   0,                 // indicate the speed in milliseconds to wait before autorotating. 0 to turn off. Can be negative
    orientation:                'horizontal',      // indicate if the carousel should be 'horizontal' or 'vertical'
    activeClassName:            'carousel-center', // the name of the class given to the current item in the center
    keyboardNav:                false,             // set to true to move the carousel with the arrow keys
    keyboardNavOverride:        true,              // set to true to override the normal functionality of the arrow keys (prevents scrolling)
    imageNav:                   true,              // clicking a non-center image will rotate that image to the center

    // preloader
    preloadImages:              true,  // disable/enable the image preloader. 
    forcedImageWidth:           0,     // specify width of all images; otherwise the carousel tries to calculate it
    forcedImageHeight:          0,     // specify height of all images; otherwise the carousel tries to calculate it

    // callback functions
    movingToCenter:             $.noop, // fired when an item is about to move to the center position
    movedToCenter:              $.noop, // fired when an item has finished moving to the center
    clickedCenter:              $.noop, // fired when the center item has been clicked
    movingFromCenter:           $.noop, // fired when an item is about to leave the center position
    movedFromCenter:            $.noop  // fired when an item has finished moving from the center
  });
}

function auth(){
    event.preventDefault()
    if(localStorage.token){
        //sudah login
        //menu
        $('#menuLogin').hide()
        $('#menuRegister').hide()
        $('#menuHome').show()
        $('#menuLogout').show()

        //page
        $('#loginPage').hide()
        $('#loginRegister').hide()
        fetchMovie(event)
        fetchQuote(event)
        $('#loungePage').show()
        $('#quotePage').show()
        $('#movieDetail').hide()
        
        
    } else {
        //belum login

        // menu
        $('#menuLogin').show()
        $('#menuRegister').show()
        $('#menuHome').hide()
        $('#menuLogout').hide()

        // page
        $('#loginPage').show()
        $('#loginRegister').show()
        $('#loungePage').hide()
        $('#quotePage').hide()
        $('#movieDetail').hide()
    }
}

//=======//
// Login //
//=======//

function logina(event){
    event.preventDefault()
    console.log('ok')
}

function searchMovie(event){
    event.preventDefault()
    let  searchGenre = $('#searchGenre').val()
    $.ajax({
        url: `${defaultUrl}/movies/${searchGenre}`,
        method: 'get'
    })
    .done(data => {
        // console.table(data[0].title)
         $('#waterwheelCarousel').empty()
        //  console.log(data.movieList[0].title)
        data.movieList.forEach(each => {
             console.log(each.title)
            //console.log(`<img src="${each.image}" title="${each.title}" />`)
            $('#waterwheelCarousel').append(`<a href="apa.html"><img src="${each.image}" width=200px title="${each.title}\nRate: ${each.rating}" /></a>`)
        })
        Carousel()     
    })
    .fail(err => {
        swal(err.responseJSON.error.join())
    })
    .always(_ => {      
    })
}

//=======//
// Quote //
//=======//

function fetchQuote(event){
    event.preventDefault()
    $.ajax({
        url: `${defaultUrl}/quote`,
        method: 'get'
    })
    .done(data => {
        // console.log(data.quotes.id)
         $('#divQuote').empty()
         $('#divQuote').append(`
         <h2>Today's Quote</h2>
         <p>${data.quotes.quote}</p>
         <p class="readmore">${data.quotes.author}</p>`)
    })
    .fail(err => {
        swal(err.responseJSON.error.join())
    })
    .always(_ => {      
    })
}

//=============//
// Fetch Movie //
//============//

function fetchMovie(event){
    event.preventDefault()
    $.ajax({
        url: `${defaultUrl}/movies/action`,
        method: 'get'
    })
    .done(data => {
        // console.table(data[0].title)
         $('#waterwheelCarousel').empty()
        let i = 0;
        data.movieList.forEach(each => {
            tampungMovie.push(each) 
            $('#waterwheelCarousel').append(`<a href="#" onclick="movieDetail(${i})"><img src="${each.image}" width=200px title="${each.title}\nRate: ${each.rating}" /></a>`)
            i++;
        })
        Carousel()     
    })
    .fail(err => {
        swal(err.responseJSON.error.join())
    })
    .always(_ => {      
    })
}

function movieDetail(id){
    event.preventDefault()
    $('#loungePage').hide()
    $('#quotePage').hide()
    $('#movieDetail').show()
    console.log(tampungMovie[id])
    $('#movieDetail').empty()
    $('#movieDetail').append(`
        <div id="featured_intro">
            <div class="fr_left">
             <h2>${tampungMovie[id].title}</h2>
             <p><img class="imgl" src="${tampungMovie[id].image}" alt="" width="250" />
             Rating: ${tampungMovie[id].rating}
             <h3>${tampungMovie[id].description}</h3>
             </p>
            </div>
        <br class="clear" />
        </div>
  `)

    
}

//=======//
// login //
//=======//


function login(event){
    
    
    event.preventDefault()
        localStorage.setItem('token', 'faketoken')
        localStorage.setItem('email', $('#email').val())
        auth()
    // console.log('iniiiii dataaaa login')
    // event.preventDefault()
    // let email = $('#email').val()
    // let password = $('#password').val()
    // $.ajax({
    //     url: `${defaultUrl}/users/login`,
    //     method: 'post',
    //     data: {
    //         email,
    //         password
    //     }
    // })
    // .done(data => {
    //     console.log(data, '<<<<<<<<<< ini data')
    //     localStorage.setItem('token', data.token)
    //     localStorage.setItem('email', data.email)
    //     // CekWeather()
    //     auth()
    // })
    // .fail(err => {
    //     // console.log(err.responseJSON, '<<<<<<<<<<< ini error login')
    //     // let tampung = JSON.parse(err.responseText)
    //     // console.table(err.responseJSON.error.join())
    //     // alert(err)
    //     swal(err.responseJSON.error.join())
    // })
    // .always(_ => {
    //     $('#email').val('')
    //     $('#password').val('')        
    // })
}

//==========//
// kWeather //
//==========//


function CekWeather(){ 
    // console.log('masukkk cek weather')
    $.ajax({
        
        url: `${defaultUrl}/weather`,
        method: 'get'
    })
    .done(data => {
        // console.log(data, 'inii dataaaa weather')
        // console.table(data.weather[0].main)
        let city = data.weather.name
        let weather = data.weather.weather[0].main
        let temp =  Math.round((Number(data.weather.main.temp)-273.15) * 10) / 10
        let pressure =  data.weather.main.pressure
        let humidity =  data.weather.main.humidity
        let kWeatherString = `current weather of ${city} is ${weather} with temperature : ${temp} °C, pressure : ${pressure}, humidity : ${humidity} ` 
        // console.table(data.weathername)
        
    $('#Weather').empty()
    $('#Weather').append(kWeatherString)
    })
    .fail(err => {
        // console.log(err.responseJSON, '<<<<<<<<<<<<<<<<<<< ini error weather')
        swal(err.responseJSON.error.join('\n'))
    })

}

//========//
// Logout //
//========//

function logout(event){
    event.preventDefault()
    localStorage.clear()
    //let auth2 = gapi.auth2.getAuthInstance();
    //auth2.signOut().then(function () {
    //   console.log('User signed out.');
    //});
    auth()
}
