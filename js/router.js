/*
==============================================================
TORPEDO v2.0.0
National Cyber Intelligence Center
Operations Center

File: router.js

Purpose:
Single Page Application Router

==============================================================
*/


"use strict";



const TORPEDO_ROUTER = {



    currentView:

        "dashboard",



    routes:{



        dashboard:

        "views/dashboard.html",



        cases:

        "views/cases.html",



        investigators:

        "views/investigators.html",



        intelligence:

        "views/intelligence.html",



        analytics:

        "views/analytics.html",



        evidence:

        "views/evidence.html",



        admin:

        "views/admin.html",



        settings:

        "views/settings.html"



    },







    /*
    ==========================================================
    INITIALIZE
    ==========================================================
    */


    init(){



        this.bindNavigation();



        const hash =

            location.hash.replace(

                "#",

                ""

            );





        this.load(

            hash ||

            "dashboard"

        );



    },







    /*
    ==========================================================
    LOAD VIEW
    ==========================================================
    */


    async load(view){



        if(

            !this.routes[view]

        ){



            view = "dashboard";



        }






        const container =

            document.getElementById(

                "view-container"

            );





        if(!container)

            return;





        try{



            container.innerHTML = `



                <div class="loading-panel">

                    Loading ${view}...

                </div>



            `;






            const response =

                await fetch(

                    this.routes[view]

                );





            const html =

                await response.text();





            container.innerHTML = html;





            this.currentView = view;





            this.updateNavigation();





            this.updateBreadcrumb();





            window.dispatchEvent(


                new CustomEvent(

                    "viewLoaded",

                    {


                        detail:{


                            view:view


                        }


                    }


                )


            );



        }



        catch(error){



            console.error(

                "View loading error:",

                error

            );



            container.innerHTML = `



                <div class="error-panel">

                    Unable to load module

                </div>



            `;



        }



    },







    /*
    ==========================================================
    NAVIGATION EVENTS
    ==========================================================
    */


    bindNavigation(){



        document.addEventListener(

            "click",

            event=>{





                const link =

                    event.target.closest(

                        "[data-route]"

                    );





                if(!link)

                    return;





                event.preventDefault();





                const route =

                    link.dataset.route;





                location.hash = route;





                this.load(

                    route

                );





            }


        );






        window.addEventListener(

            "hashchange",

            ()=>{



                const view =

                    location.hash.replace(

                        "#",

                        ""

                    );



                this.load(

                    view

                );



            }


        );



    },







    /*
    ==========================================================
    ACTIVE MENU
    ==========================================================
    */


    updateNavigation(){



        document

        .querySelectorAll(

            "[data-route]"

        )

        .forEach(item=>{



            item.classList.remove(

                "active"

            );





            if(

                item.dataset.route

                ===

                this.currentView

            ){



                item.classList.add(

                    "active"

                );



            }



        });



    },







    /*
    ==========================================================
    BREADCRUMB
    ==========================================================
    */


    updateBreadcrumb(){



        const breadcrumb =

            document.getElementById(

                "breadcrumb"

            );





        if(breadcrumb){



            breadcrumb.textContent =


                this.currentView

                .charAt(0)

                .toUpperCase()

                +

                this.currentView.slice(1);



        }



    }






};








window.TORPEDO_ROUTER =

    TORPEDO_ROUTER;
