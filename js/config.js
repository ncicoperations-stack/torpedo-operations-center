/*
==============================================================
TORPEDO v2.0.0
National Cyber Intelligence Center
Operations Center

File: config.js
Purpose: Global Application Configuration
==============================================================
*/


"use strict";



/* ==========================================================
   TORPEDO CONFIGURATION
========================================================== */


const TORPEDO_CONFIG = {


    /*
    ----------------------------------------------------------
    Application Information
    ----------------------------------------------------------
    */

    APP_NAME:

        "TORPEDO",


    ORGANIZATION:

        "National Cyber Intelligence Center",


    MODULE:

        "Operations Center",


    VERSION:

        "2.0.0",



    /*
    ----------------------------------------------------------
    Environment
    ----------------------------------------------------------
    */

    ENVIRONMENT:

        "production",



    /*
    ----------------------------------------------------------
    Application Behavior
    ----------------------------------------------------------
    */

    DEFAULT_VIEW:

        "dashboard",


    ENABLE_LOGGING:

        true,


    AUTO_REFRESH:

        true,


    REFRESH_INTERVAL:

        30000,



    /*
    ----------------------------------------------------------
    Google Integration
    ----------------------------------------------------------

    These values will connect TORPEDO
    with Google Apps Script / Google Sheets.

    Replace only when the backend is ready.

    ----------------------------------------------------------
    */

    GOOGLE:

    {


        ENABLED:

            true,


        APPS_SCRIPT_URL:

            "",


        SPREADSHEET_ID:

            "",


        SHEETS:

        {

            CASES:

                "Cases",


            INVESTIGATORS:

                "Investigators",


            INTELLIGENCE:

                "Intelligence",


            EVIDENCE:

                "Evidence",


            USERS:

                "Users"


        }


    },



    /*
    ----------------------------------------------------------
    API
    ----------------------------------------------------------
    */

    API:

    {


        ENABLED:

            true,


        BASE_URL:

            "",


        TIMEOUT:

            10000


    },



    /*
    ----------------------------------------------------------
    Authentication
    ----------------------------------------------------------
    */

    AUTH:

    {


        REQUIRED:

            true,


        SESSION_KEY:

            "TORPEDO_SESSION",


        ROLE:

            "Administrator"


    }



};



/* ==========================================================
   EXPORT TO WINDOW
========================================================== */


window.TORPEDO_CONFIG = TORPEDO_CONFIG;



/* ==========================================================
   STARTUP LOG
========================================================== */


if (TORPEDO_CONFIG.ENABLE_LOGGING) {


    console.log(

        "%cTORPEDO v" +

        TORPEDO_CONFIG.VERSION +

        " Loaded",

        "color:#2563EB;font-weight:bold;"

    );


}
