function handleCredentialResponse(response) {
  const responsePayload = parseJwt(response.credential);

  profile = responsePayload;

  setsignin();

}

function setsignin(){

  let button = document.getElementsByClassName("loginbutton")[0];

  document.getElementById("signin").hidden = true;
  document.getElementById("signout").hidden = false;
  document.getElementById("signout").children[1].src = profile.picture;

  button.classList.add("loginbuttonhover");


}


function signinbutton(){

  if(profile != null){

    let button = document.getElementsByClassName("loginbutton")[0];

    document.getElementById("signin").hidden = false;
    document.getElementById("signout").hidden = true;

    button.classList.remove("loginbuttonhover");
    profile = null;

  }

}
