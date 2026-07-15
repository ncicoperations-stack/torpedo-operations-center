/*
==============================================================
TORPEDO v2.0.0
National Cyber Intelligence Center
Operations Center

File: config.js

Purpose:
Global Application Configuration

==============================================================
*/


"use strict";



const TORPEDO_CONFIG = {



    /*
    ==========================================================
    APPLICATION INFORMATION
    ==========================================================
    */


    APP:{


        NAME:

        "TORPEDO",



        ORGANIZATION:

        "National Cyber Intelligence Center",



        VERSION:

        "2.0.0",



        MODE:

        "PRODUCTION"



    },







    /*
    ==========================================================
    GOOGLE BACKEND
    ==========================================================
    */


    GOOGLE:{


        SCRIPT_URL:


        "https://script.google.com/macros/s/AKfycbx0zb4qKyw2SB0X-0TysCK_ZT4Yqud1ZVm2pFIz01JGXDvI_qAwELGYPXxVlrkY-UAujA/exec"



    },







    /*
    ==========================================================
    API SETTINGS
    ==========================================================
    */


    API:{


        TIMEOUT:

        10000,



        RETRY:

        3



    },







    /*
    ==========================================================
    AUTHENTICATION
    ==========================================================
    */


    AUTH:{


        SESSION_KEY:

        "TORPEDO_SESSION",



        TOKEN_KEY:

        "TORPEDO_TOKEN"



    },







    /*
    ==========================================================
    MODULES
    ==========================================================
    */


    MODULES:{


        DASHBOARD:true,


        CASES:true,


        INVESTIGATORS:true,


        INTELLIGENCE:true,


        ANALYTICS:true,


        EVIDENCE:true,


        ADMIN:true,


        SETTINGS:true



    },







    /*
    ==========================================================
    CASE CATEGORIES
    ==========================================================
    */


    CATEGORIES:[


        "Online Scam",


        "Identity Theft",


        "Financial Fraud",


        "Cybercrime",


        "Honeytrap",


        "Child Safety",


        "Other Incidents"



    ],







    /*
    ==========================================================
    STATUS VALUES
    ==========================================================
    */


    STATUS:{


        RECEIVED:

        "Received",



        REVIEW:

        "Under Review",



        ACTIVE:

        "Active Investigation",



        CLOSED:

        "Closed"



    }






};





/*
==============================================================
MAKE GLOBAL
==============================================================
*/


window.TORPEDO_CONFIG = TORPEDO_CONFIG;
