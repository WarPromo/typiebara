function handleCredentialResponse(response) {
  const responsePayload = parseJwt(response.credential);

  setsignin(responsePayload);

}

function setsignin(profiledetails){

  profile = profiledetails;

  let button = document.getElementsByClassName("loginbutton")[0];

  localStorage.setItem("login", JSON.stringify(profile));

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
