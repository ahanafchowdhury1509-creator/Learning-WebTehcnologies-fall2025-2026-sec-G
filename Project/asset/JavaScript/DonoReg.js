document.getElementById("LoginBut").addEventListener('click',()=>{
            const UN=document.getElementById("UserName");
            const DN=document.getElementById("DonerID");
            const PS=document.getElementById("pass");
            const pa=/^\d\d\d$/;
               // Check if any field is empty
            if (UN.value === "" || DN.value === "" || PS.value === "") {
                if (UN.value === "") {
                    UN.placeholder = "Empty Field Must be Filled";
                    UN.classList.add("error-placeholder");
                }
                if (DN.value === "") {
                    DN.placeholder = "Empty Field Must be Filled";
                    DN.classList.add("error-placeholder");
                }
                if (PS.value === "") {
                    PS.placeholder = "Empty Field Must be Filled";
                    PS.classList.add("error-placeholder");
                }
                return; 
            }
            else{
                if(!pa.test(DN.value)){
                   DN.value = "";
                    DN.placeholder = "Invalid DonerID";  
                    DN.classList.add("error");   
                   
                  
                }
                if(PS.value==="1!2!3!"){
              
                    alert("Login Succesful")
                    UN.value="";
                    DN.value="";
                    PS.value="";
                    
                }
                else{
                    
                
                    alert("Wrong Password")
                    UN.value="";
                    DN.value="";
                    PS.value="";
                   
                }
              
                     
            }


 })
    

