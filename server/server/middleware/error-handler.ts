
export = function() { 
    return function logError(err: any, req : any, res: any, next:any) { 
       if (err) {
           if(err.statusCode == 422){
               if(Object.keys(err.details.messages).length > 1 ){
                   // Custom Status code for multiple error messages
                    err.statusCode = 701
                    err.message = "Invalid Details"
               }
               else{
                    var message_key = err.details.messages.email || 
                        err.details.messages.kp_udise_id || 
                        err.details.messages.phone_number || 
                        err.details.messages.password ||
                        err.details.messages.school_udise_id ||
                        err.details.messages.cluster_udise_id ||
                        err.details.messages.udise_id
                    err.message = message_key[0].toString()
               }
           }
           if(err.code == "23505"){
               if(err.constraint == "custom_user_udise_id_idx"){
                   err.message = "Udise Id Already Exists"
               }
               if(err.constraint == "custom_user_phone_number_idx"){
                    err.message = "Phone Number Already Exists"
               }
           }
         console.log('ERR', err);
         next(err);
       }
       next();
    };
 };