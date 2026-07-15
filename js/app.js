/*
==============================================================
TORPEDO v2.0.0
National Cyber Intelligence Center
Operations Center

File: app.js

Purpose:
Main Application Controller

==============================================================
*/


"use strict";



const TORPEDO_APP = {



    version:

        TORPEDO_CONFIG.APP.VERSION,



    /*
    ==========================================================
    START APPLICATION
    ==========================================================
    */


    async init(){



        console.log(

            "TORPEDO v"

            +

            this.version

            +

            " Starting..."

        );





        this.showLoading(

            "Starting TORPEDO..."

        );





        await this.loadInterface();





        if(

            window.TORPEDO_AUTH

        ){


            TORPEDO_AUTH.init();


        }






        await this.checkConnection();





        if(

            window.TORPEDO_ROUTER

        ){


            TORPEDO_ROUTER.init();


        }






        this.hideLoading();





        console.log(

            "TORPEDO Ready"

        );



    },







    /*
    ==========================================================
    LOAD UI COMPONENTS
    ==========================================================
    */


    async loadInterface(){



        const components = [


            {


                element:

                "sidebar-container",


                file:

                "components/sidebar.html"


            },


            {


                element:

                "topbar-container",


                file:

                "components/topbar.html"


            },


            {


                element:

                "statusbar-container",


                file:

                "components/statusbar.html"


            }



        ];





        for(

            const component of components

        ){



            try {



                const response =

                    await fetch(

                        component.file

                    );





                const html =

                    await response.text();





                const target =

                    document.getElementById(

                        component.element

                    );





                if(target){


                    target.innerHTML = html;


                }



            }



            catch(error){



                console.warn(

                    "Component loading failed:",

                    component.file

                );



            }



        }



    },







    /*
    ==========================================================
    GOOGLE CONNECTION TEST
    ==========================================================
    */


    async checkConnection(){



        try {



            const result =

                await TORPEDO_API.get(

                    "?action=status"

                );





            console.log(

                "Google API:",

                result

            );





            this.updateStatus(

                true

            );



        }



        catch(error){



            console.error(

                "Google connection failed",

                error

            );



            this.updateStatus(

                false

            );



        }



    },







    /*
    ==========================================================
    UPDATE SYSTEM STATUS
    ==========================================================
    */


    updateStatus(online){



        const status =

            document.getElementById(

                "systemStatus"

            );





        if(!status)

            return;





        if(online){


            status.innerHTML =

            `

            <span class="online">

                ● Online

            </span>

            `;


        }


        else{


            status.innerHTML =

            `

            <span class="offline">

                ● Offline

            </span>

            `;


        }



    },







    /*
    ==========================================================
    LOADING SCREEN
    ==========================================================
    */


    showLoading(message){



        const overlay =

            document.getElementById(

                "loading-overlay"

            );



        const text =

            document.getElementById(

                "loadingMessage"

            );





        if(text)

            text.textContent = message;





        if(overlay)

            overlay.classList.remove(

                "hidden"

            );



    },





    hideLoading(){



        const overlay =

            document.getElementById(

                "loading-overlay"

            );





        if(overlay)

            overlay.classList.add(

                "hidden"

            );



    }






};








/*
==============================================================
START
==============================================================
*/


document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        TORPEDO_APP.init();


    }

);





window.TORPEDO_APP = TORPEDO_APP;
