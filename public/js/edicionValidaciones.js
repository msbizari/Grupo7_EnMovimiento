window.onload = function(){
    

    //------DESDE AQUÍ CONTINUE CON LAS VALIDACIONES DEL FORMULARIO -------//    
        let form = document.querySelector('.form_edicion');
        
      
        

    form.addEventListener('submit', (e) => {  
        let errors = [];
        let name = document.querySelector('#name');
        let description = document.querySelector('#description');
        //let imagen = document.querySelector('#imagen');
        //let acceptedExtensions = ["jpg", "png" , "gif"];
        let size = document.querySelector('#size');
        let price = document.querySelector('#price');
        let discount = document.querySelector('#discount'); 


        if (name.value == '' || name.value.length < 05 ){
            errors.push('Nombre de producto es obligatorio y debe contener como minimo 5 carácteres');
            name.classList.add('is-invalid'); 
            
        };
        
        if (description.value == "" || description.value.length < 20 ){
            errors.push("Descripción no puede estar vacia y requiere mínimo 20 caracteres");
            description.classList.add("is-invalid");
            
        };
        
        /*if(imagen.value == "") {
            errors.push("Debes adjuntar una imagen");
            imagen.classList.add("is-invalid");
        }else{
            imagen.classList.remove("is-invalid");
            imagen.classList.add("is-valid"); 
        };*/

        if (size.value == ''){
            errors.push('Campo Talle: debes ingresar un parametro valido');
            size.classList.add('is-invalid'); 
            
        };

        if (price.value <= 0 ){
            errors.push('Campo precio: debe colocar el nuevo precio');
            price.classList.add('is-invalid');
            
        };

        if (discount.value <= 0){
            errors.push('Campo descuento: debe indicar nuevo descuento');
            discount.classList.add('is-invalid');
        };

        if(errors.length > 0){
            e.preventDefault();

            let listaErrores = document.querySelector('.errors'); 
            //listaErrores.classList.add('.alert-warning');
            listaErrores.innerHTML = '';  
            for(error of errors){
                listaErrores.innerHTML += '<li>' + error + '</li>'
            
            }
            }
        })
    

        }