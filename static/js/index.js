var pitanje = "";

function posaljiPitanje(){
    pitanje = document.getElementById('pitanje').value;
    console.log(pitanje);
    var chat = document.getElementById("chat");
    chat.innerHTML = chat.innerHTML + '<div class="user1"><img class="korisnik"><p class="message">' + pitanje + '</p></div>';
    document.getElementById("pitanje").value = "";
    document.getElementById("poruka").innerHTML = "<h2>Vaš zahtjev se obrađuje</h2>";
    document.getElementById("poruka").scrollIntoView({ behavior: "smooth" });
    $.ajax({
        url: '/pitanje',
        type: 'POST',
        data: { 'pitanje': pitanje },
        success: function(response) {
            document.getElementById("poruka").innerHTML = "";
            var odgovor = response;
            console.log(odgovor);
            var chat = document.getElementById("chat");
            chat.innerHTML = chat.innerHTML + '<div class="user2"><img class="llama"><p class="message">' + odgovor + '</p></div>';

            var user2 = document.querySelectorAll(".user2");
            var zadnjiOdgovor = user2[user2.length - 1];
            zadnjiOdgovor.scrollIntoView({ behavior: "smooth" });
        },
        error: function(error) {
            console.log(error);
        }
    });
}

window.onload = function() {
    var filter = document.getElementById("filter")
    filter.addEventListener("change", function(){
        opcija = filter.value;
        $.ajax({
            url: '/model',
            type: 'POST',
            data: { 'model': filter.value },
            success: function(response) {
                // poruka o promjeni modela.
            },
            error: function(error) {
                console.log(error);
            }
        });
    });
    document.getElementById("pitanje").addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
          posaljiPitanje();
        }
      });
}