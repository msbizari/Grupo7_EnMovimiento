window.onload = function(){
    let form = document.querySelector('.register-body');
    form.addEventListener('submit', (e) => {
        let errors = [];

        let description = document.querySelector('#description');
        //let image = document.querySelector('#myfile');
        //let acceptedExtensions = [".jpg", ".png" , ".gif"];
        //let fileExtensions = path.extname(file.originalname);
        let price = document.querySelector('#price'); 
       
        if (description.value == '' || description.value.length < 10 ) {
            errors.push('El campo descripción no puede estar vacío');
            description.classList.add('is-invalid')
        };

        /*if (!image.fileExtensions.includes (acceptedExtensions)){
            errors.push('Las extensiones aceptadas son '+ acceptedExtensions.join(","));
            image.classList.add('is-invalid');
        };*/

        if (price.value == '' || price.value.length < 2 ) {
            errors.push('El campo precio no puede estar vacío');
            price.classList.add('is-invalid')
        };


        if (errors.length > 0){
            e.preventDefault();
            
            let listaErrores = document.querySelector(".errors"); 
            listaErrores.innerHTML = "";  
            for(error of errors){
                listaErrores.innerHTML += "<li>" + error + "</li>"
            }
        }
    })
    }