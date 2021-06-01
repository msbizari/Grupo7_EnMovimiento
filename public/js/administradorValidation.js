window.onload = function(){
    let form = document.querySelector('.register-body');
    form.addEventListener('submit', (e) => {
        let errors = [];
        e.preventDefault()
        let name = document.querySelector('#name');
        let description = document.querySelector('#description');
        let image = document.querySelector('#myfile');
        let acceptedExtensions = ["jpg", "png" , "gif"];
        let price = document.querySelector('#price'); 
       
        if (name.value == '' || name.value.length < 2 ) {
            errors.push('El campo Nombre del producto no puede estar vacío, debe contener al menos 2 carácteres');
            name.classList.add('is-invalid')
        };
        
        if (description.value == '' || description.value.length < 10 ) {
            errors.push('El campo Descripción no puede estar vacío');
            description.classList.add('is-invalid')
        };
        
        if(image.value != ""){
            let fileExtension =  image.value.split('.').pop() /* image.value.slice((image.value.lastIndexOf(".") - 1 >>> 0) + 2); */;

            if(!acceptedExtensions.includes(fileExtension)){
                errors.push("Las extensiones aceptadas son "+ acceptedExtensions.join(", "));
            }
        };

        if (price.value == '' || price.value.length < 2 ) {
            errors.push('El campo Precio no puede estar vacío');
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