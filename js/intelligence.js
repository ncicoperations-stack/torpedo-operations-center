/*
==============================================================
TORPEDO v2.0.0
National Cyber Intelligence Center
Operations Center

File: intelligence.js

Purpose:
Threat Intelligence Controller

==============================================================
*/


"use strict";



const TORPEDO_INTELLIGENCE = {



    intelligence: [],






    /*
    ==========================================================
    INITIALIZE
    ==========================================================
    */


    init(){



        this.bindEvents();



        this.loadIntelligence();



    },







    /*
    ==========================================================
    LOAD DATA
    ==========================================================
    */


    async loadIntelligence(){



        try{



            const response =

                await TORPEDO_API.get(

                    "?action=getIntelligence"

                );





            if(

                response.success

                &&

                response.data

            ){



                this.intelligence =

                    response.data;



            }

            else{


                this.intelligence=[];


            }






            this.render();



        }



        catch(error){



            console.error(

                "Intelligence error:",

                error

            );



            this.renderEmpty();



        }



    },







    /*
    ==========================================================
    RENDER TABLE
    ==========================================================
    */


    render(){



        const table =

            document.getElementById(

                "intelligenceTableBody"

            );





        if(!table)

            return;





        if(

            this.intelligence.length===0

        ){



            this.renderEmpty();


            return;


        }







        table.innerHTML="";






        this.intelligence.forEach(item=>{





            table.innerHTML += `



            <tr>



                <td>

                    ${item.ReportID || "-"}

                </td>



                <td>

                    ${item.ThreatType || "-"}

                </td>



                <td>

                    ${item.Severity || "-"}

                </td>



                <td>

                    ${item.Source || "-"}

                </td>



                <td>

                    ${item.Analyst || "-"}

                </td>



                <td>

                    ${item.Status || "-"}

                </td>



                <td>

                    ${item.Date || "-"}

                </td>



                <td>



                    <button

                    class="table-button"

                    onclick="TORPEDO_INTELLIGENCE.view('${item.ReportID}')">


                    View


                    </button>



                </td>



            </tr>



            `;



        });





        this.updateStats();



    },







    /*
    ==========================================================
    EMPTY
    ==========================================================
    */


    renderEmpty(){



        const table =

            document.getElementById(

                "intelligenceTableBody"

            );





        if(table){



            table.innerHTML=`



            <tr>


                <td colspan="8">


                    No intelligence records available


                </td>


            </tr>



            `;



        }





        this.updateStats();



    },







    /*
    ==========================================================
    STATISTICS
    ==========================================================
    */


    updateStats(){



        let critical = 0;


        let active = 0;


        let analysts = [];






        this.intelligence.forEach(item=>{



            if(

                item.Severity

                ===

                "Critical"

            )

                critical++;





            if(

                item.Status

                ===

                "Active"

            )

                active++;





            if(item.Analyst)

                analysts.push(

                    item.Analyst

                );



        });






        this.setText(

            "totalIntelligence",

            this.intelligence.length

        );



        this.setText(

            "criticalThreats",

            critical

        );



        this.setText(

            "activeAnalysis",

            active

        );



        this.setText(

            "activeAnalysts",

            [

                ...new Set(

                    analysts

                )

            ].length

        );



    },







    /*
    ==========================================================
    SEARCH
    ==========================================================
    */


    search(value){



        const term =

            value.toLowerCase();





        this.intelligence =

            this.intelligence.filter(item=>{



                return JSON.stringify(item)

                .toLowerCase()

                .includes(term);



            });





        this.render();



    },







    /*
    ==========================================================
    VIEW
    ==========================================================
    */


    view(id){



        TORPEDO_UI.toast(

            "Opening intelligence report: "

            +

            id,

            "info"

        );



    },







    /*
    ==========================================================
    HELPERS
    ==========================================================
    */


    setText(id,value){



        const element =

            document.getElementById(id);



        if(element)

            element.textContent=value;



    },







    /*
    ==========================================================
    EVENTS
    ==========================================================
    */


    bindEvents(){



        document.addEventListener(

            "input",

            event=>{



                if(

                    event.target.id

                    ===

                    "intelligenceSearch"

                ){



                    this.search(

                        event.target.value

                    );



                }



            }



        );







        document.addEventListener(

            "click",

            event=>{



                if(

                    event.target.id

                    ===

                    "refreshIntelligence"

                ){



                    this.loadIntelligence();



                    TORPEDO_UI.toast(

                        "Intelligence refreshed",

                        "success"

                    );



                }



            }



        );



    }




};







window.addEventListener(

    "viewLoaded",

    event=>{



        if(

            event.detail.view

            ===

            "intelligence"

        ){



            TORPEDO_INTELLIGENCE.init();



        }



    }



);







window.TORPEDO_INTELLIGENCE =

    TORPEDO_INTELLIGENCE;
