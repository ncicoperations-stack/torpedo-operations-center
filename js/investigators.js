/*
==============================================================
TORPEDO v2.0.0
National Cyber Intelligence Center
Operations Center

File: investigators.js
Purpose: Investigator Management Controller
==============================================================
*/


"use strict";



const TORPEDO_INVESTIGATORS = {



    investigators: [],



    /*
    ----------------------------------------------------------
    INITIALIZE MODULE
    ----------------------------------------------------------
    */


    init() {



        this.bindEvents();



        this.loadInvestigators();



    },





    /*
    ----------------------------------------------------------
    LOAD INVESTIGATORS
    ----------------------------------------------------------
    */


    async loadInvestigators() {



        const table =

            document.getElementById(

                "investigatorTableBody"

            );



        if(!table) return;





        try {



            const response =

                await TORPEDO_API.get(

                    "?action=getInvestigators"

                );





            if(

                response.success

                &&

                response.data

            ) {



                this.investigators =

                    response.data;



            }

            else {



                this.investigators = [];



            }





            this.render();



        }

        catch(error) {



            console.error(

                "Investigator loading error:",

                error

            );



            this.renderEmpty();



        }



    },





    /*
    ----------------------------------------------------------
    RENDER TABLE
    ----------------------------------------------------------
    */


    render() {



        const table =

            document.getElementById(

                "investigatorTableBody"

            );



        if(!table) return;





        if(

            this.investigators.length === 0

        ) {



            this.renderEmpty();


            return;


        }





        table.innerHTML = "";





        this.investigators.forEach(

            person => {



                table.innerHTML += `



                <tr>


                    <td>

                        ${person.id || "-"}

                    </td>


                    <td>

                        ${person.name || "-"}

                    </td>


                    <td>

                        ${person.department || "-"}

                    </td>


                    <td>

                        ${person.clearance || "-"}

                    </td>


                    <td>


                        <span class="status-badge">

                            ${person.status || "Offline"}

                        </span>


                    </td>


                    <td>

                        ${person.cases || 0}

                    </td>


                    <td>

                        ${person.lastActivity || "-"}

                    </td>


                    <td>


                        <button class="table-button"

                                onclick="TORPEDO_INVESTIGATORS.view('${person.id}')">


                            View


                        </button>


                    </td>



                </tr>



                `;



            }

        );



        this.updateStats();



    },





    /*
    ----------------------------------------------------------
    EMPTY STATE
    ----------------------------------------------------------
    */


    renderEmpty() {



        const table =

            document.getElementById(

                "investigatorTableBody"

            );



        if(table) {



            table.innerHTML = `



            <tr>


                <td colspan="8">


                    No investigators available


                </td>


            </tr>



            `;



        }



        this.updateStats();



    },





    /*
    ----------------------------------------------------------
    STATISTICS
    ----------------------------------------------------------
    */


    updateStats() {



        const total =

            this.investigators.length;



        let available = 0;

        let restricted = 0;

        let activeCases = 0;





        this.investigators.forEach(

            item => {



                if(

                    item.status

                    ===

                    "Available"

                )

                    available++;





                if(

                    item.status

                    ===

                    "Restricted"

                )

                    restricted++;





                activeCases +=

                    Number(

                        item.cases || 0

                    );



            }

        );





        const totalEl =

            document.getElementById(

                "totalInvestigators"

            );



        const availableEl =

            document.getElementById(

                "availableInvestigators"

            );



        const casesEl =

            document.getElementById(

                "assignedCases"

            );



        const restrictedEl =

            document.getElementById(

                "restrictedInvestigators"

            );





        if(totalEl)

            totalEl.textContent = total;



        if(availableEl)

            availableEl.textContent = available;



        if(casesEl)

            casesEl.textContent = activeCases;



        if(restrictedEl)

            restrictedEl.textContent = restricted;



    },





    /*
    ----------------------------------------------------------
    SEARCH
    ----------------------------------------------------------
    */


    search(value) {



        const term =

            value.toLowerCase();





        this.investigators =

            this.investigators.filter(

                person =>



                JSON.stringify(person)

                .toLowerCase()

                .includes(term)



            );



        this.render();



    },





    /*
    ----------------------------------------------------------
    EVENTS
    ----------------------------------------------------------
    */


    bindEvents() {



        document.addEventListener(

            "input",

            event => {



                if(

                    event.target.id

                    ===

                    "investigatorSearch"

                ) {



                    this.search(

                        event.target.value

                    );


                }



            }

        );





        document.addEventListener(

            "click",

            event => {



                if(

                    event.target.id

                    ===

                    "addInvestigatorButton"

                ) {



                    TORPEDO_UI.toast(

                        "Investigator creation module ready",

                        "info"

                    );


                }



            }

        );



    },





    /*
    ----------------------------------------------------------
    VIEW PROFILE
    ----------------------------------------------------------
    */


    view(id) {



        TORPEDO_UI.toast(

            "Opening investigator: "

            +

            id,

            "info"

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

            "investigators"

        ) {



            TORPEDO_INVESTIGATORS.init();



        }



    }

);



window.TORPEDO_INVESTIGATORS = TORPEDO_INVESTIGATORS;
