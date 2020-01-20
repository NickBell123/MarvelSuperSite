const baseURL = "http://gateway.marvel.com/v1/public/characters?"
const apikey = "&ts=1&apikey=2479ac670ffd22a005793a85e2cd6556&hash=148c15d91ce2f088e7a99e28892d0da2"

function characterInfo(data){
    
    data = data.data.results;
    console.log(data);

    data.forEach(function(item){
        $("#name").html(`<h2>${item.name}</h2>`);
        $("#thumbnail").html(`<img src="${item.thumbnail.path}/portrait_fantastic.${item.thumbnail.extension}"></img>`);
    })
}

function getCharacterData(event) {
    var characterName = $("#search-box").val();
    if (!characterName) {
        $("#name").html(`<h3>Search for a character...<h3>`);
        return;
    }

    $("#name").html(
        `<div id="loading">
        <p class="text-muted">loading...</p>
        </div>`);

    $.when(
        $.getJSON(baseURL + "&name=" + characterName + apikey).then(
            function (response) {
                var characterData = response;
               //console.log(characterData);
                $("#info").html(characterInfo(characterData));
            }, function (errorResponse) {
                if (errorResponse.status === 404) {
                    $("#info").html(`<h3>No info found for ${characterName}</h3>`)
                } else {
                    console.log(errorResponse);
                    $("#info").html(
                        `<h3>Error: ${errorResponse.responseJSON.message}<h3>`
                    );
                }
            })
    );
}