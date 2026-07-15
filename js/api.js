/*
==============================================================
TORPEDO v2.0.0
National Cyber Intelligence Center
Operations Center

File: api.js
Purpose: Google Apps Script / API Communication Layer
==============================================================
*/


"use strict";



/* ==========================================================
   API SERVICE
========================================================== */


const TORPEDO_API = {



    /*
    ----------------------------------------------------------
    GET REQUEST
    ----------------------------------------------------------
    */

    async get(endpoint = "") {


        try {


            const url =

                TORPEDO_CONFIG.API.BASE_URL +

                endpoint;



            const response = await fetch(url,

            {


                method:

                    "GET",


                headers:

                {

                    "Content-Type":

                        "application/json"

                }


            });



            if (!response.ok) {


                throw new Error(

                    "API Request Failed: "

                    +

                    response.status

                );


            }



            return await response.json();



        }

        catch(error) {


            console.error(

                "TORPEDO API GET Error:",

                error

            );


            return {

                success:

                    false,


                error:

                    error.message

            };


        }


    },





    /*
    ----------------------------------------------------------
    POST REQUEST
    ----------------------------------------------------------
    */

    async post(data = {}) {


        try {



            if (

                !TORPEDO_CONFIG.GOOGLE.ENABLED

                ||

                !TORPEDO_CONFIG.GOOGLE.APPS_SCRIPT_URL

            ) {



                console.warn(

                    "Google Apps Script URL not configured"

                );



                return {


                    success:

                        false,


                    error:

                        "Backend not configured"


                };


            }



            const response = await fetch(

                TORPEDO_CONFIG.GOOGLE.APPS_SCRIPT_URL,

            {


                method:

                    "POST",



                headers:

                {

                    "Content-Type":

                        "application/json"


                },


                body:

                    JSON.stringify(data)


            });



            return await response.json();



        }

        catch(error) {



            console.error(

                "TORPEDO API POST Error:",

                error

            );



            return {


                success:

                    false,


                error:

                    error.message


            };


        }


    },





    /*
    ----------------------------------------------------------
    GOOGLE CONNECTION TEST
    ----------------------------------------------------------
    */

    async testConnection() {



        try {



            if (

                !TORPEDO_CONFIG.GOOGLE.APPS_SCRIPT_URL

            ) {



                return {


                    connected:

                        false,


                    message:

                        "Google endpoint missing"


                };


            }




            const response = await fetch(

                TORPEDO_CONFIG.GOOGLE.APPS_SCRIPT_URL

            );



            if(response.ok) {



                return {


                    connected:

                        true,


                    message:

                        "Google connection successful"


                };


            }



            return {


                connected:

                    false,


                message:

                    "Google connection failed"


            };




        }

        catch(error) {



            return {


                connected:

                    false,


                message:

                    error.message


            };


        }


    }



};





/* ==========================================================
   EXPORT
========================================================== */


window.TORPEDO_API = TORPEDO_API;
