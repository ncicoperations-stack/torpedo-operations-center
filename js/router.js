/*
==============================================================
TORPEDO v2.0.0
National Cyber Intelligence Center
Operations Center

File: router.js
Purpose: Single Page Application Router
==============================================================
*/


"use strict";



/* ==========================================================
   ROUTER
========================================================== */


const TORPEDO_ROUTER = {



    /*
    ----------------------------------------------------------
    ROUTE DEFINITIONS
    ----------------------------------------------------------
    */


    routes:

    {


        dashboard:

            {

                title:

                    "Dashboard",


                subtitle:

                    "Operations Overview",


                file:

                    "views/dashboard.html"


            },



        cases:

            {

                title:

                    "Case Management",


                subtitle:

                    "Investigation Records",


                file:

                    "views/cases.html"


            },



        investigators:

            {

                title:

                    "Investigators",


                subtitle:

                    "Personnel Management",


                file:

                    "views/investigators.html"


            },



        intelligence:

            {

                title:

                    "Intelligence Center",


                subtitle:

                    "Threat Intelligence Operations",


                file:

                    "views/intelligence.html"


            },



        evidence:

            {

                title:

                    "Evidence Management",


                subtitle:

                    "Evidence Tracking System",


                file:

                    "views/evidence.html"


            },



        analytics:

            {

                title:

                    "Analytics",


                subtitle:

                    "Operational Data Analysis",


                file:

                    "views/analytics.html"


            },



        admin:

            {

                title:

                    "Administration",


                subtitle:

                    "System Administration",


                file:

                    "views/admin.html"


            },



        settings:

            {

                title:

                    "Settings",


                subtitle:

                    "System Configuration",


                file:

                    "views/settings.html"


            }


    },





    /*
    ----------------------------------------------------------
    INITIALIZE ROUTER
    ----------------------------------------------------------
    */


    init() {



        window.addEventListener(

            "hashchange",

            () => {


                this.load();


            }

        );



        this.load();



    },





    /*
    ----------------------------------------------------------
    LOAD CURRENT VIEW
    ----------------------------------------------------------
    */


    async load() {



        let view =

            window.location.hash.replace(

                "#",

                ""

            );



        if(!view) {



            view =

                TORPEDO_CONFIG.DEFAULT_VIEW;



        }



        if(!this.routes[view]) {



            view =

                "dashboard";



        }





        const route =

            this.routes[view];



        const container =

            document.getElementById(

                "view-container"

            );



        if(!container) return;





        try {



            TORPEDO_UI.showLoading(

                "Loading " +

                route.title

            );



            const response =

                await fetch(

                    route.file

                );



            if(!response.ok) {



                throw new Error(

                    "View not found"

                );


            }



            container.innerHTML =

                await response.text();





            TORPEDO_UI.updateTitle(

                route.title,

                route.subtitle

            );



            this.updateNavigation(

                view

            );



            window.dispatchEvent(

                new CustomEvent(

                    "viewLoaded",

                    {

                        detail:

                        {

                            view:

                                view

                        }

                    }

                )

            );



        }

        catch(error) {



            console.error(

                "Router Error:",

                error

            );



            container.innerHTML = `


                <div class="empty-state">


                    <i class="fa-solid fa-triangle-exclamation"></i>


                    <p>

                        Unable to load module

                    </p>


                </div>


            `;



        }

        finally {



            TORPEDO_UI.hideLoading();



        }



    },





    /*
    ----------------------------------------------------------
    UPDATE ACTIVE MENU
    ----------------------------------------------------------
    */


    updateNavigation(view) {



        document

            .querySelectorAll(

                ".nav-link"

            )

            .forEach(

                link => {



                    link.classList.remove(

                        "active"

                    );



                    if(

                        link.dataset.view

                        ===

                        view

                    ) {



                        link.classList.add(

                            "active"

                        );


                    }



                }

            );



        const breadcrumb =

            document.getElementById(

                "breadcrumbCurrent"

            );



        if(breadcrumb) {



            breadcrumb.textContent =

                this.routes[view].title;



        }



    }





};





/* ==========================================================
   EXPORT
========================================================== */


window.TORPEDO_ROUTER = TORPEDO_ROUTER;
