/*
==============================================================
TORPEDO v2.0.0
National Cyber Intelligence Center
Operations Center

File: api.js

Purpose:
Google Apps Script API Connector

==============================================================
*/


"use strict";



const TORPEDO_API = {



    /*
    ==========================================================
    GOOGLE APPS SCRIPT URL

    Replace this with your deployed Web App URL

    Example:

    https://script.google.com/macros/s/XXXX/exec

    ==========================================================
    */


    URL:

"https://script.google.com/macros/s/AKfycbx0zb4qKyw2SB0X-0TysCK_ZT4Yqud1ZVm2pFIz01JGXDvI_qAwELGYPXxVlrkY-UAujA/exec",






    /*
    ==========================================================
    GET REQUEST
    ==========================================================
    */


    async get(action){



        try {



            const response =

                await fetch(

                    this.URL

                    +

                    action

                );





            const data =

                await response.json();





            return data;



        }



        catch(error){



            console.error(

                "TORPEDO API Error:",

                error

            );



            return {


                success:false,


                error:error.toString()



            };


        }



    },







    /*
    ==========================================================
    POST REQUEST

    Used for future:
    - user creation
    - evidence upload
    - intelligence reports

    ==========================================================
    */


    async post(payload){



        try {



            const response =

                await fetch(

                    this.URL,

                    {


                        method:"POST",


                        headers:{


                            "Content-Type":

                            "text/plain"

                        },


                        body:

                        JSON.stringify(payload)



                    }

                );





            return await response.json();



        }



        catch(error){



            console.error(

                "TORPEDO POST ERROR:",

                error

            );



            return {


                success:false,


                error:error.toString()



            };



        }



    }





};





window.TORPEDO_API = TORPEDO_API;
