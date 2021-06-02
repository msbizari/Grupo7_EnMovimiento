window.onload = function(){
    let form = document.querySelector('.register-body');
    form.addEventListener('submit', (e) => {
        let errors = [];
        e.preventDefault()
        let name = document.querySelector('#name');
        let description = document.querySelector('#description');
        let image = document.querySelector('#myfile');
        let size = document.querySelector('#size');
        let acceptedExtensions = ["jpg", "png" , "gif"];
       /*  let acceptedExtensions = [".jpg", ".png" , ".gif"]; */
        let price = document.querySelector('#price'); 
       

        if (name.value == '' || name.value.length < 5 ) {
            errors.push('Campo nombre de producto: es obligatorio y debe contener como minimo 5 carácteres');
            name.classList.add('is-invalid')
        };
        
        if (description.value == '' || description.value.length < 20 ) {
            errors.push('Campo descripción: no puede estar vacia y requiere mínimo 20 caracteres');
            description.classList.add('is-invalid')
        };
          
        if(image.value != ""){
            let fileExtension =  image.value.split('.').pop() /* image.value.slice((image.value.lastIndexOf(".") - 1 >>> 0) + 2); */;

            if(!acceptedExtensions.includes(fileExtension)){
                errors.push("Las extensiones aceptadas son "+ acceptedExtensions.join(", "));
            }
        };
        if (size.value == ''){
            errors.push('Campo Talle: debes ingresar un parametro valido');
            size.classList.add('is-invalid'); 
            
        };

        if (price.value <= 0 ){
            errors.push('Campo precio: debe colocar el nuevo precio');
            price.classList.add('is-invalid');
            
        };

        if (discount.value = 0){
            errors.push('Campo descuento: debe indicar nuevo descuento');
            discount.classList.add('is-invalid');
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