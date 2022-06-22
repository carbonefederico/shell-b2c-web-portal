let config = {
    azServerUrl: "https://auth.pingone.com/cbe83512-3062-4ec9-bb35-1b6abc351173/as",
    tokenEndpoint: "/token",
    azEndpoint: "/authorize",
    logoutEndpoint: "/signoff",
    clientId: "fb4871d1-1b34-40a9-9f07-24933742e7d1",
    redirectUri: "https://shell-b2c-web-portal.glitch.me"
}

const oidcClient = createClient (config); 


window.onload = async () => {
    console.log ("Runnig window.onload");
    
    document.getElementById ("login-button").addEventListener ("click", (e)=> login ());
    document.getElementById ("logout-button").addEventListener ("click", (e) => logout ());
    if (window.location.search.includes ("code=")) {
        console.log ("Redirect from OIDC authorization");
        showSpinner ();
        await oidcClient.handleRedirectBack ();
        console.log (oidcClient.getOidcClaims ());
        console.log (oidcClient.getAccessToken());
        window.history.replaceState({}, document.title, window.location.pathname);
        hideSpinner ();
        updateUI ();
    }
}

function login () {
    console.log ("Login");
    oidcClient.loginWithRedirect ({scope: "openid profile email"});
}

function logout () {
    console.log ("Logout");
    oidcClient.logoutWithRedirect ();
    
}

function updateUI () {
    console.log ("updateUI");
    if (oidcClient.isUserAuthenticated) {
        document.getElementById ("firstname").innerText = oidcClient.getOidcClaims ().given_name;
        hideElement ("login-button");
        hideElement ("index");
        displayElement ("logout-button");
        displayElement ("firstname");
        displayElement ("home");

    } else {
        hideElement ("firstname");
        hideElement ("logout-button");
        hideElement ("home");
        displayElement ("landing");
        displayElement ("login-button");
        displayElement ("index");
    }
}

function displayElement(id) {
    document.getElementById(id).classList.remove("hidden");
}

function hideElement(id) {
    document.getElementById(id).classList.add("hidden");
}

function showSpinner () {
    showElement ("wait-div");
}

function hideSpinner () {
   hideEelement ("wait-div");
}
