var form = document.getElementById("my-form");

    async function handleSubmit(event) {
      event.preventDefault();
      var status = document.getElementById("status");
      var data = new FormData(event.target);
      fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          status.innerHTML = "Grazie per averci contattato!";
          form.reset()
        } else {
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
            } else {
              status.innerHTML = "Oops! C'è stato un problema durante la compilazione del form, riprova."
            }
          })
        }
      }).catch(error => {
        status.innerHTML = "Oops! C'è stato un problema durante la compilazione del form, riprova."
      });
    }
    form.addEventListener("submit", handleSubmit)
