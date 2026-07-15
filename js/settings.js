/*
==============================================================
TORPEDO v2.0.0
National Cyber Intelligence Center
Operations Center

File: settings.js

Purpose:
System Settings Controller

==============================================================
*/


"use strict";



const TORPEDO_SETTINGS = {



    /*
    ==========================================================
    INITIALIZE
    ==========================================================
    */


    init(){



        this.loadSystemInfo();



        this.bindEvents();



    },







    /*
    ==========================================================
    LOAD SYSTEM INFORMATION
    ==========================================================
    */


    loadSystemInfo(){



        this.setText(

            "systemName",

            TORPEDO_CONFIG.APP.NAME

        );





        this.setText(

            "organizationName",

            TORPEDO_CONFIG.APP.ORGANIZATION

        );





        this.setText(

            "systemVersion",

            TORPEDO_CONFIG.APP.VERSION

        );





        this.setText(

            "systemMode",

            TORPEDO_CONFIG.APP.MODE

        );





        this.checkAPI();



    },







    /*
    ==========================================================
    API STATUS
    ==========================================================
    */


    async checkAPI(){



        try{



            const result =

                await TORPEDO_API.get(

                    "?action=status"

                );





            if(result.success){



                this.setText(

                    "apiStatus",

                    "Connected"

                );



            }

            else{


                this.setText(

                    "apiStatus",

                    "Error"

                );



            }



        }



        catch(error){



            this.setText(

                "apiStatus",

                "Offline"

            );



        }



    },







    /*
    ==========================================================
    UPDATE DISPLAY
    ==========================================================
    */


    setText(id,value){



        const element =

            document.getElementById(

                id

            );





        if(element)

            element.textContent=value;



    },







    /*
    ==========================================================
    EVENTS
    ==========================================================
    */


    bindEvents(){



        document.addEventListener(

            "click",

            event=>{



                if(

                    event.target.id

                    ===

                    "testConnection"

                ){



                    this.checkAPI();



                    TORPEDO_UI.toast(

                        "Connection test completed",

                        "success"

                    );



                }



            }



        );



    }





};







window.addEventListener(

    "viewLoaded",

    event=>{



        if(

            event.detail.view

            ===

            "settings"

        ){



            TORPEDO_SETTINGS.init();



        }



    }



);







window.TORPEDO_SETTINGS =

    TORPEDO_SETTINGS;
