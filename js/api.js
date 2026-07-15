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

    "PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE",






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
