window.onload = function(){
    let form = document.querySelector('.form_register');
    form.addEventListener('submit', (e) => {
        let errors = [];

        let name = document.querySelector('#Name');
        let lastName = document.querySelector('#lastName');
        let email = document.querySelector('#email');
        let emailFormat = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
        let password = document.querySelector('#password');
        let image = document.querySelector('#myfile');
        let acceptedExtensions = [".jpg", ".png" , ".gif"];
        let fileExtensions = path.extname(file.originalname);
       
        if (name.value == '' || name.value.length < 2 ) {
            errors.push('El campo Apellido no puede estar vacío, debe contener al menos 2 carácteres');
            lastName.classList.add('is-invalid')
        };
        
        if (lastName.value == '' || lastName.value.length < 2 ) {
            errors.push('El campo Apellido no puede estar vacío, debe contener al menos 2 carácteres');
            lastName.classList.add('is-invalid');
        }/*  else {
            lastName.classList.add('is-valid');
            lastName.classList.remove('is-invalid');
        } */;
        if (email.value == '' || !email.value.includes ('@') || !email.value.match (emailFormat)) {
            errors.push('El campo email no puede estar vacío, debe contener un email valido');
            email.classList.add('is-invalid');
        } /* else {
            email.classList.add('is-valid');
            email.classList.remove('is-invalid');
        } */;
        if (password.value == '') {
            errors.push('El campo Password no puede estar vacío');
            password.classList.add('is-invalid');
        }/*  else {
            password.classList.add('is-valid');
            password.classList.remove('is-invalid');
        } */;
        if (password.value.length < 5 || password.value.length > 10) {
            errors.push('El campo password debe ser entre 5 y 10 caracteres');
            password.classList.add('is-invalid');
        }/*  else {
            rating.classList.add('is-valid');
            rating.classList.remove('is-invalid');
            form.awards.focus();
        } */;
        if (!image.fileExtensions.includes (acceptedExtensions)){
            errors.push('Las extensiones aceptadas son '+ acceptedExtensions.join(","));
            image.classList.add('is-invalid');
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