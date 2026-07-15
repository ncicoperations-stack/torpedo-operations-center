/*
==============================================================
TORPEDO v2.0.0
National Cyber Intelligence Center
Operations Center

File: cases.js
Purpose: Case Management Controller
==============================================================
*/


"use strict";



const TORPEDO_CASES = {



    cases: [],



    /*
    ----------------------------------------------------------
    INITIALIZE
    ----------------------------------------------------------
    */


    init() {



        this.bindEvents();



        this.loadCases();



    },





    /*
    ----------------------------------------------------------
    LOAD CASE DATA
    ----------------------------------------------------------
    */


    async loadCases() {



        const table =

            document.getElementById(

                "casesTableBody"

            );



        if(!table) return;





        try {



            /*
            Future Google Sheets connection

            Expected response:

            [
                {
                    reference:"NCIC-0001",
                    category:"Online Scam",
                    subject:"Unknown",
                    priority:"High",
                    assigned:"Agent",
                    status:"Open",
                    updated:"2026-07-15"
                }
            ]

            */



            const response =

                await TORPEDO_API.get(

                    "?action=getCases"

                );





            if(

                response.success

                &&

                response.data

            ) {



                this.cases =

                    response.data;



            }

            else {



                /*
                Demo empty state
                */

                this.cases = [];



            }





            this.render();



        }

        catch(error) {



            console.error(

                "Case loading error:",

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

                "casesTableBody"

            );



        if(!table) return;





        if(

            this.cases.length === 0

        ) {



            this.renderEmpty();


            return;


        }





        table.innerHTML = "";





        this.cases.forEach(

            item => {



                table.innerHTML += `



                <tr>


                    <td>

                        ${item.reference || "-"}

                    </td>


                    <td>

                        ${item.category || "-"}

                    </td>


                    <td>

                        ${item.subject || "-"}

                    </td>


                    <td>

                        ${item.priority || "-"}

                    </td>


                    <td>

                        ${item.assigned || "-"}

                    </td>


                    <td>

                        <span class="status-badge">

                            ${item.status || "Open"}

                        </span>

                    </td>


                    <td>

                        ${item.updated || "-"}

                    </td>


                    <td>


                        <button class="table-button"
                                onclick="TORPEDO_CASES.viewCase('${item.reference}')">


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

                "casesTableBody"

            );



        if(table) {



            table.innerHTML = `



                <tr>


                    <td colspan="8">


                        No cases available


                    </td>


                </tr>


            `;



        }



        this.updateStats();



    },





    /*
    ----------------------------------------------------------
    UPDATE COUNTERS
    ----------------------------------------------------------
    */


    updateStats() {



        const total =

            this.cases.length;



        const count =

            document.getElementById(

                "caseCount"

            );



        if(count) {



            count.textContent =

                total +

                " Cases";


        }



        let open = 0;

        let investigating = 0;

        let closed = 0;



        this.cases.forEach(

            item => {



                if(item.status === "Open")

                    open++;



                if(item.status === "Investigating")

                    investigating++;



                if(item.status === "Closed")

                    closed++;



            }

        );



        const openEl =

            document.getElementById(

                "openCasesCount"

            );



        const invEl =

            document.getElementById(

                "investigatingCount"

            );



        const closedEl =

            document.getElementById(

                "closedCasesCount"

            );



        if(openEl)

            openEl.textContent = open;



        if(invEl)

            invEl.textContent = investigating;



        if(closedEl)

            closedEl.textContent = closed;



    },





    /*
    ----------------------------------------------------------
    SEARCH
    ----------------------------------------------------------
    */


    search(value) {



        const term =

            value.toLowerCase();



        this.cases =

            this.cases.filter(

                item =>



                JSON.stringify(item)

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

                    "caseSearch"

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

                    "newCaseButton"

                ) {



                    TORPEDO_UI.toast(

                        "New case module ready",

                        "info"

                    );


                }



            }

        );



    },





    /*
    ----------------------------------------------------------
    VIEW CASE
    ----------------------------------------------------------
    */


    viewCase(reference) {



        TORPEDO_UI.toast(

            "Opening case: "

            +

            reference,

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

            "cases"

        ) {



            TORPEDO_CASES.init();



        }



    }

);



window.TORPEDO_CASES = TORPEDO_CASES;
