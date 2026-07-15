/*
==============================================================
TORPEDO v2.0.0
National Cyber Intelligence Center
Operations Center

File: auth.js
Purpose: Authentication and Session Controller
==============================================================
*/


"use strict";



const TORPEDO_AUTH = {



    currentUser: null,



    /*
    ----------------------------------------------------------
    INITIALIZE AUTH SYSTEM
    ----------------------------------------------------------
    */


    init() {



        this.loadSession();



        this.updateUI();



    },





    /*
    ----------------------------------------------------------
    LOAD SESSION
    ----------------------------------------------------------
    */


    loadSession() {



        const session =

            localStorage.getItem(

                TORPEDO_CONFIG.AUTH.SESSION_KEY

            );





        if(session) {



            try {



                this.currentUser =

                    JSON.parse(

                        session

                    );



            }

            catch(error) {



                console.error(

                    "Session error",

                    error

                );



                this.logout();



            }



        }

        else {



            /*
            Temporary development user

            Replace with Google Authentication

            later.

            */


            this.currentUser = {


                id:

                    "ADMIN-001",


                name:

                    "System Administrator",


                role:

                    "Administrator",


                clearance:

                    "Level 4"



            };



            this.saveSession();



        }



    },





    /*
    ----------------------------------------------------------
    SAVE SESSION
    ----------------------------------------------------------
    */


    saveSession() {



        localStorage.setItem(

            TORPEDO_CONFIG.AUTH.SESSION_KEY,

            JSON.stringify(

                this.currentUser

            )

        );



    },





    /*
    ----------------------------------------------------------
    LOGIN
    ----------------------------------------------------------
    */


    login(user) {



        this.currentUser = user;



        this.saveSession();



        this.updateUI();



        return true;



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



        this.currentUser = null;



        location.reload();



    },





    /*
    ----------------------------------------------------------
    CHECK LOGIN
    ----------------------------------------------------------
    */


    isAuthenticated() {



        return (

            this.currentUser

            !==

            null

        );



    },





    /*
    ----------------------------------------------------------
    CHECK ROLE
    ----------------------------------------------------------
    */


    hasRole(role) {



        if(!this.currentUser)

            return false;



        return (

            this.currentUser.role

            ===

            role

        );



    },





    /*
    ----------------------------------------------------------
    GET USER
    ----------------------------------------------------------
    */


    getUser() {



        return this.currentUser;



    },





    /*
    ----------------------------------------------------------
    UPDATE UI
    ----------------------------------------------------------
    */


    updateUI() {



        if(!this.currentUser)

            return;





        const name =

            document.getElementById(

                "userName"

            );



        const role =

            document.getElementById(

                "userRole"

            );



        const avatar =

            document.getElementById(

                "userAvatar"

            );





        if(name)

            name.textContent =

                this.currentUser.name;





        if(role)

            role.textContent =

                this.currentUser.role;





        if(avatar)

            avatar.textContent =

                this.currentUser.name

                .charAt(0)

                .toUpperCase();



    },





    /*
    ----------------------------------------------------------
    PERMISSION CHECK
    ----------------------------------------------------------
    */


    canAccess(module) {



        const permissions = {



            Administrator:

            [

                "dashboard",

                "cases",

                "investigators",

                "intelligence",

                "analytics",

                "evidence",

                "admin",

                "settings"

            ],



            Investigator:

            [

                "dashboard",

                "cases",

                "evidence"

            ],



            Analyst:

            [

                "dashboard",

                "intelligence",

                "analytics"

            ]



        };





        const role =

            this.currentUser?.role;



        if(

            !role

            ||

            !permissions[role]

        )

            return false;





        return (

            permissions[role]

            .includes(module)

        );



    }



};





/* ==========================================================
   START AUTH
========================================================== */


window.addEventListener(

    "DOMContentLoaded",

    () => {



        TORPEDO_AUTH.init();



    }

);



window.TORPEDO_AUTH = TORPEDO_AUTH;
