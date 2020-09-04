let baseUrl = 'http://localhost:3000';
$( document ).ready(function() 
{
    auth();
});

function register(event) {
    event.preventDefault()
    let email = $('#register-email').val()
    let password = $('#register-password').val()
  
    $.ajax({
      url: `${baseUrl}/users/register`,
      method: 'post',
      data: {
        email: email,
        password: password
      }
    })
        .done(res => 
        {
            auth()
        })
        .fail(err => 
        {
            Swal.fire(
            {
                icon: 'error',
                title: 'Oops...',
                text: 'Email or Password must be required!'
            // footer: '<a href>Why do I have this issue?</a>'
            })
        console.log(err.responseJSON.error)
      })
  }

function login(event)
{
        event.preventDefault();
        // alert('disubmit')
        let email = $('#login-email').val();
        let password = $('#login-password').val();
        // console.log(email, password)
        $.ajax(
        {
            url:`${baseUrl}/users/login`,
            method: 'post',
            data:
            {
                email,
                password
            }
        })
        .done(data => 
            {
                // console.log(data, 'dataaaaaaaaa')
                localStorage.setItem('token', data.token)
                auth();
            })
        .fail(err =>
            {
                // alert('salah')
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Invalid Email or Password!',
                    // footer: '<a href>Why do I have this issue?</a>'
                  })
                console.log(err.responseJSON, 'erroooooooooor ')
            })
        .always(() =>
        {
            $('#login-email').val('');
            $('#login-password').val('');
        })
}

function auth()
{
    if(localStorage.token)
    {
        $('#login-page').hide();
        $('#home-page').show()
        $('#register-page').hide();
    }
    else
    {
        $('#login-page').show();
        $('#home-page').hide()
        $('#register-page').hide();
    }
}

function showLogin() {
    event.preventDefault()
    $('#register-page').hide()
    $('#login-page').show()
  }
  
function showRegister() {
    event.preventDefault()
    $('#register-page').show()
    $('#login-page').hide()
}

function logout()
{
    localStorage.clear()
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    console.log('User signed out.');
    });
    auth(); 
    // event.preventDefault();
}

function fetchTodos()
{
    $.ajax(
    {
        url: `${baseUrl}/todos`,
        method:'get',
        headers:
        {
            token: data.localStorage.token
        }
    })
    .done(data =>
        {
            data.t
        })
}

function onSignIn(googleUser) {
    // var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    let id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token, '<<<<<<<<<<<<<<<<<IDTOKEN')
    $.ajax(
    {
        url:`${baseUrl}/users/googleSign`,
        method: `post`,
        data: {
            id_token
        }
    })
        .done(data =>
            {
                // console.log(data, '<<<<<<<<DATAAA');
                localStorage.setItem('token', data.token)
                auth()
            })
        .fail(err =>
            {
                console.log(err.responseJSON, '<<<<<<<<ERRORRRR')
            })
  }