/*
==============================================================
TORPEDO v2.0.0
National Cyber Intelligence Center
Operations Center

File: app.js
Purpose: Main Application Bootstrap Controller
==============================================================
*/


"use strict";



/* ==========================================================
   APPLICATION CONTROLLER
========================================================== */


const TORPEDO_APP = {



    /*
    ----------------------------------------------------------
    INITIALIZE APPLICATION
    ----------------------------------------------------------
    */


    async init() {



        console.log(

            "Starting TORPEDO Operations Center..."

        );



        try {



            TORPEDO_UI.showLoading(

                "Initializing TORPEDO..."

            );



            await TORPEDO_UI.loadLayout();



            this.bindEvents();



            this.startClock();



            await this.checkGoogleConnection();



            TORPEDO_ROUTER.init();



            console.log(

                "TORPEDO initialized successfully"

            );



        }

        catch(error) {



            console.error(

                "TORPEDO Startup Error:",

                error

            );



            TORPEDO_UI.toast(

                "System initialization failed",

                "danger"

            );


        }

        finally {



            setTimeout(

                () => {


                    TORPEDO_UI.hideLoading();


                },

                500

            );



        }



    },





    /*
    ----------------------------------------------------------
    EVENT HANDLERS
    ----------------------------------------------------------
    */


    bindEvents() {



        /*
        Navigation
        */


        document.addEventListener(

            "click",

            event => {



                const link =

                    event.target.closest(

                        ".nav-link"

                    );



                if(link) {



                    event.preventDefault();



                    const view =

                        link.dataset.view;



                    window.location.hash =

                        view;



                }



            }

        );





        /*
        Mobile Menu
        */


        document.addEventListener(

            "click",

            event => {



                if(

                    event.target.closest(

                        "#mobileMenuButton"

                    )

                ) {



                    const sidebar =

                        document.getElementById(

                            "sidebar-container"

                        );



                    if(sidebar) {



                        sidebar.classList.toggle(

                            "open"

                        );


                    }



                }



            }

        );





        /*
        Logout Buttons
        */


        document.addEventListener(

            "click",

            event => {



                if(

                    event.target.closest(

                        "#logoutButton"

                    )

                    ||

                    event.target.closest(

                        "#topbarLogout"

                    )

                ) {



                    this.logout();



                }



            }

        );



    },





    /*
    ----------------------------------------------------------
    GOOGLE CONNECTION
    ----------------------------------------------------------
    */


    async checkGoogleConnection() {



        const result =

            await TORPEDO_API.testConnection();



        const status =

            document.getElementById(

                "connectionStatus"

            );



        const indicator =

            document.getElementById(

                "connectionIndicator"

            );



        if(

            result.connected

        ) {



            if(status) {



                status.textContent =

                    "Connected";


            }



            if(indicator) {



                indicator.classList.add(

                    "online"

                );


            }



        }

        else {



            if(status) {



                status.textContent =

                    "Offline";


            }



            if(indicator) {



                indicator.classList.remove(

                    "online"

                );


            }



        }



    },





    /*
    ----------------------------------------------------------
    SYSTEM CLOCK
    ----------------------------------------------------------
    */


    startClock() {



        const update = () => {



            const now =

                new Date();



            const time =

                document.getElementById(

                    "currentTime"

                );



            const date =

                document.getElementById(

                    "currentDate"

                );



            const systemTime =

                document.getElementById(

                    "systemTime"

                );



            const formattedTime =

                now.toLocaleTimeString();



            const formattedDate =

                now.toLocaleDateString();



            if(time)

                time.textContent =

                    formattedTime;



            if(date)

                date.textContent =

                    formattedDate;



            if(systemTime)

                systemTime.textContent =

                    formattedTime;



        };



        update();



        setInterval(

            update,

            1000

        );



    },





    /*
    ----------------------------------------------------------
    LOGOUT
    ----------------------------------------------------------
    */


    logout() {



        localStorage.removeItem(

            TORPEDO_CONFIG.AUTH.SESSION_KEY

        );



        TORPEDO_UI.toast(

            "Logged out successfully",

            "success"

        );



        setTimeout(

            () => {


                location.reload();


            },

            1000

        );



    }



};





/* ==========================================================
   APPLICATION START
========================================================== */


document.addEventListener(

    "DOMContentLoaded",

    () => {



        TORPEDO_APP.init();



    }

);



/* ==========================================================
   EXPORT
========================================================== */


window.TORPEDO_APP = TORPEDO_APP;
