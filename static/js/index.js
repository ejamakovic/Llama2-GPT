var pitanje = "";

function posaljiPitanje(){
    pitanje = document.getElementById('pitanje').value;
    var chat = document.getElementById("chat");
    chat.innerHTML = chat.innerHTML + '<div class="user1"><img class="korisnik"><pre class="message">' + pitanje + '</pre></div>' + '<div class="user2"><img class="llama"><span class="loader"></span></div>';
    var user2 = document.querySelectorAll(".user2");
    var zadnjiOdgovor = user2[user2.length - 1];
    zadnjiOdgovor.scrollIntoView({ behavior: "smooth" });
    document.getElementById("pitanje").value = "";
    $.ajax({
        url: '/pitanje',
        type: 'POST',
        data: { 'pitanje': pitanje },
        success: function(response) {
            var odgovor = response;
            var user2 = document.querySelectorAll(".user2");
            var zadnjiOdgovor = user2[user2.length - 1];
            zadnjiOdgovor.innerHTML = '<img class="llama"><pre class="message">' + odgovor + '</pre>';
            zadnjiOdgovor.scrollIntoView({ behavior: "smooth" });
        },
        error: function(error) {
            console.log(error);
        }
    });
}

function izbrisiRazgovor(){
    $.ajax({
        url: '/izbrisiChat',
        type: 'POST',
        success: function(response) {
           // Opcionalno poruka o brisanju chata
        },
        error: function(error) {
            console.log(error);
        }
    });
    chat.innerHTML = "";
}

window.onload = function() {
    var filter = document.getElementById("filter")
    filter.addEventListener("change", function(){
        $.ajax({
            url: '/model',
            type: 'POST',
            data: { 'model': filter.value },
            success: function(response) {
                // Opcionalno poruka o promjeni modela.
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
