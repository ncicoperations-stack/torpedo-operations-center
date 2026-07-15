/*
==============================================================
TORPEDO v2.0.0
National Cyber Intelligence Center
Operations Center

File: ui.js
Purpose: User Interface Controller
==============================================================
*/


"use strict";



/* ==========================================================
   UI CONTROLLER
========================================================== */


const TORPEDO_UI = {



    /*
    ----------------------------------------------------------
    LOAD HTML COMPONENT
    ----------------------------------------------------------
    */


    async loadComponent(

        containerId,

        filePath

    ) {



        try {



            const container =

                document.getElementById(containerId);



            if(!container) {



                console.error(

                    "Container not found:",

                    containerId

                );


                return false;


            }



            const response = await fetch(filePath);



            if(!response.ok) {



                throw new Error(

                    "Unable to load component "

                    +

                    filePath

                );


            }



            container.innerHTML =

                await response.text();



            return true;



        }

        catch(error) {



            console.error(

                "Component loading error:",

                error

            );



            return false;


        }



    },





    /*
    ----------------------------------------------------------
    LOAD MULTIPLE COMPONENTS
    ----------------------------------------------------------
    */


    async loadLayout() {



        await this.loadComponent(

            "sidebar-container",

            "components/sidebar.html"

        );



        await this.loadComponent(

            "topbar-container",

            "components/topbar.html"

        );



        await this.loadComponent(

            "breadcrumb-container",

            "components/breadcrumb.html"

        );



        await this.loadComponent(

            "statusbar-container",

            "components/statusbar.html"

        );



    },





    /*
    ----------------------------------------------------------
    LOADING OVERLAY
    ----------------------------------------------------------
    */


    showLoading(message = "Loading...") {



        const overlay =

            document.getElementById(

                "loading-overlay"

            );



        const text =

            document.getElementById(

                "loadingMessage"

            );



        if(text) {


            text.textContent = message;


        }



        if(overlay) {


            overlay.classList.remove(

                "hidden"

            );


        }


    },





    hideLoading() {



        const overlay =

            document.getElementById(

                "loading-overlay"

            );



        if(overlay) {


            overlay.classList.add(

                "hidden"

            );


        }


    },





    /*
    ----------------------------------------------------------
    TOAST NOTIFICATIONS
    ----------------------------------------------------------
    */


    toast(

        message,

        type = "info"

    ) {



        const root =

            document.getElementById(

                "toast-root"

            );



        if(!root) return;



        const toast =

            document.createElement(

                "div"

            );



        toast.className =

            "toast "

            +

            type;



        toast.innerHTML = `

            <span>

                ${message}

            </span>

        `;



        root.appendChild(toast);



        setTimeout(

            () => {


                toast.remove();


            },

            4000

        );



    },





    /*
    ----------------------------------------------------------
    MODALS
    ----------------------------------------------------------
    */


    openModal(content) {



        const root =

            document.getElementById(

                "modal-root"

            );



        if(!root) return;



        root.innerHTML = `


            <div class="modal-backdrop">


                <div class="modal">


                    ${content}


                </div>


            </div>


        `;



    },





    closeModal() {



        const root =

            document.getElementById(

                "modal-root"

            );



        if(root) {



            root.innerHTML = "";


        }



    },





    /*
    ----------------------------------------------------------
    UPDATE PAGE TITLE
    ----------------------------------------------------------
    */


    updateTitle(

        title,

        subtitle = ""

    ) {



        const pageTitle =

            document.getElementById(

                "pageTitle"

            );



        const pageSubtitle =

            document.getElementById(

                "pageSubtitle"

            );



        if(pageTitle) {


            pageTitle.textContent = title;


        }



        if(pageSubtitle) {


            pageSubtitle.textContent = subtitle;


        }


    }




};





/* ==========================================================
   EXPORT
========================================================== */


window.TORPEDO_UI = TORPEDO_UI;
