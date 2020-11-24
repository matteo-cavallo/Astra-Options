window.addEventListener('load', function () {

    console.log("Astra Options - Remote JS");
    console.log(window.extraoptions);

    var container =  document.getElementById("extra-options");

    fetch("https://3a118d4d377f.ngrok.io/api/options/" + window.extraoptions.shop + "/"+ window.extraoptions.product.id)
    .then( res => res.json())
    .then( data => {
        data.options.forEach( option => {
            let text = document.createElement("input");
            text.value = option.title;
            text.name = "properties["+option.title+"]";
            container.append(text);
        })
    });
})

