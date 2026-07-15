/*
==============================================================
TORPEDO v2.0.0
National Cyber Intelligence Center
Operations Center

File: analytics.js
Purpose: Analytics Dashboard Controller
==============================================================
*/


"use strict";



const TORPEDO_ANALYTICS = {



    data: {},



    /*
    ----------------------------------------------------------
    INITIALIZE MODULE
    ----------------------------------------------------------
    */


    init() {



        this.loadAnalytics();



        this.bindEvents();



    },





    /*
    ----------------------------------------------------------
    LOAD ANALYTICS DATA
    ----------------------------------------------------------
    */


    async loadAnalytics() {



        try {



            const response =

                await TORPEDO_API.get(

                    "?action=getAnalytics"

                );





            if(

                response.success

                &&

                response.data

            ) {



                this.data =

                    response.data;



            }

            else {



                this.data = {


                    cases: 0,


                    resolution: 0,


                    response: 0,


                    growth: 0


                };



            }





            this.updateCards();



            this.renderTable();



        }

        catch(error) {



            console.error(

                "Analytics error:",

                error

            );


        }



    },





    /*
    ----------------------------------------------------------
    UPDATE SUMMARY CARDS
    ----------------------------------------------------------
    */


    updateCards() {



        const fields = {



            analyticsCases:

                this.data.cases || 0,



            resolutionRate:

                (this.data.resolution || 0)

                +

                "%",



            responseTime:

                (this.data.response || 0)

                +

                "h",



            threatGrowth:

                (this.data.growth || 0)

                +

                "%"



        };





        Object.keys(fields)

        .forEach(

            id => {



                const element =

                    document.getElementById(id);



                if(element) {



                    element.textContent =

                        fields[id];


                }



            }

        );



    },





    /*
    ----------------------------------------------------------
    RENDER ANALYTICS TABLE
    ----------------------------------------------------------
    */


    renderTable() {



        const table =

            document.getElementById(

                "analyticsTableBody"

            );



        if(!table) return;





        table.innerHTML = `



            <tr>


                <td>

                    Total Cases

                </td>


                <td>

                    ${this.data.cases || 0}

                </td>


                <td>

                    -

                </td>


                <td>

                    -

                </td>


                <td>

                    Active

                </td>


            </tr>



            <tr>


                <td>

                    Resolution Rate

                </td>


                <td>

                    ${this.data.resolution || 0}%

                </td>


                <td>

                    -

                </td>


                <td>

                    -

                </td>


                <td>

                    Stable

                </td>


            </tr>



        `;



    },





    /*
    ----------------------------------------------------------
    RENDER CATEGORY DATA
    ----------------------------------------------------------
    */


    renderCategories() {



        const container =

            document.getElementById(

                "categoryBreakdown"

            );



        if(!container) return;





        if(

            !this.data.categories

        ) {



            return;


        }





        container.innerHTML = "";





        this.data.categories.forEach(

            category => {



                container.innerHTML += `



                    <div class="health-item">


                        <span>

                            ${category.name}

                        </span>


                        <strong>

                            ${category.count}

                        </strong>


                    </div>



                `;


            }

        );



    },





    /*
    ----------------------------------------------------------
    EVENTS
    ----------------------------------------------------------
    */


    bindEvents() {



        document.addEventListener(

            "click",

            event => {



                if(

                    event.target.id

                    ===

                    "refreshAnalytics"

                ) {



                    this.loadAnalytics();



                    TORPEDO_UI.toast(

                        "Analytics updated",

                        "success"

                    );


                }



            }

        );



    }



};





/* ==========================================================
   START MODULE
========================================================== */


window.addEventListener(

    "viewLoaded",

    event => {



        if(

            event.detail.view

            ===

            "analytics"

        ) {



            TORPEDO_ANALYTICS.init();



        }



    }

);



window.TORPEDO_ANALYTICS = TORPEDO_ANALYTICS;
