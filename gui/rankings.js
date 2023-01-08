let profile = null;

let amount = 10;

let profiles = [];

let rankingopen = [];

for(var a = 0; a < maplist.length; a++) rankingopen.push(false);

function postranking(map, time){

  if(profile == null) return;

  fetch(`https://typiebara-server-production.up.railway.app/?map=${map}&id=${profile.sub}&time=${time}&imageurl=${profile.picture}&name=${profile.name}`,{
    method:"POST"
  }).then((res) => {
    return res.text();
  }).then(data => {
    document.getElementsByClassName("publishing")[0].style.width = "200px";
    document.getElementById("publishingloading").style.opacity = 0;
    setTimeout(() => {
        document.getElementById("publishinglogged").style.opacity = 1;
    }, 200)


  })

}

function clearrankings(){
  profiles = [];
  document.getElementById("rankcontainer").innerHTML = "";
  document.getElementById("personalrankbox").innerHTML = "";
}

function getrankings(){
  document.getElementById("loadingdots").style.opacity = 0.75;
  for(var i = 0; i < amount; i++){
    fetch(`https://typiebara-server-production.up.railway.app/?map=${maptitle}&rank=${i}`).then((res) => {

      return res.json();

    }).then(manageranking)
  }


  if(profile != null){


    fetch(`https://typiebara-server-production.up.railway.app/?map=${maptitle}&id=${profile.sub}`).then((res) => {

      return res.json();

    }).then(data => {

      let personal = document.getElementById("personalrankbox");

      if(data.map != maptitle || personal.innerHTML != "") return;


      if("notfound" in data){

        let text = document.createElement("p");
        text.classList.add("notime");
        text.innerHTML = "You haven't played this map";
        personal.appendChild(text);

      }
      else{

        let container = createranking(data);
        personal.appendChild(container);

      }


    })

  }
  else{
    let personal = document.getElementById("personalrankbox")
    let text = document.createElement("p");
    text.classList.add("notime");
    text.innerHTML = "Login to compete!";
    personal.appendChild(text);
  }


}

function manageranking(data){





  if(data.map != maptitle) return;

  document.getElementById("loadingdots").style.opacity = 0;

  if("ranklimit" in data){
    return;
  }

  for(var a = 0; a < profiles.length; a++){

    if(profiles[a].rank > data.rank){
      break;
    }
    if(profiles[a].rank == data.rank) return;
    if(a == profiles.length-1) a = profiles.length;

  }

  if(a < profiles.length) profiles.splice(a, 0, data);
  else profiles.push(data);

  insertranking(data, a);

}


function createranking(profile){

  let container = document.createElement("div");
  container.classList.add("rankrowcontainer");

  let newelement = document.createElement("div");
  newelement.classList.add("rankrow");

  let ranktext = document.createElement("h1");
  ranktext.innerHTML = (profile.rank+1) + ".";

  newelement.appendChild(ranktext);

  let ranknameimage = document.createElement("div")
  ranknameimage.classList.add("ranknameimage");

  let profileimage = document.createElement("img");
  profileimage.src = profile.imageurl;
  profileimage.referrerPolicy = "no-referrer"

  let nametext = document.createElement("p");
  nametext.innerHTML = profile.name;

  ranknameimage.appendChild(profileimage);
  ranknameimage.appendChild(nametext);

  newelement.appendChild(ranknameimage);

  let time = profile.time;
  let minutes = Math.floor(time / 60000);
  let seconds = Math.floor( (time % 60000) / 1000 );

  if(seconds < 10) seconds = "0" + seconds;

  let timetext = document.createElement("h2");
  timetext.innerHTML = minutes + ":" + seconds;
  newelement.appendChild(timetext);
  container.appendChild(newelement);

  return container;
}

function insertranking(profile, index){

  let place = document.getElementById("rankcontainer");

  let container = createranking(profile);

  if( ("children" in place == false) || index < place.children.length) {
    place.insertBefore(container, place.children[index]);
  }
  else {
    place.appendChild(container);
  }

}
