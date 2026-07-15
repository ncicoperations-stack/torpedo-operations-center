/*
==============================================================
TORPEDO v2.0.0
National Cyber Intelligence Center
Operations Center

File: evidence.js

Purpose:
Evidence Management Controller

==============================================================
*/


"use strict";



const TORPEDO_EVIDENCE = {



    evidence: [],



    /*
    ==========================================================
    INITIALIZE
    ==========================================================
    */


    init(){


        this.bindEvents();


        this.loadEvidence();



    },







    /*
    ==========================================================
    LOAD EVIDENCE
    ==========================================================
    */


    async loadEvidence(){



        try{



            const response =

                await TORPEDO_API.get(

                    "?action=getEvidence"

                );





            if(

                response.success

                &&

                response.data

            ){



                this.evidence =

                    response.data;



            }

            else{


                this.evidence=[];


            }






            this.render();



        }



        catch(error){



            console.error(

                "Evidence loading error:",

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

                "evidenceTableBody"

            );





        if(!table)

            return;





        if(

            this.evidence.length===0

        ){



            this.renderEmpty();


            return;


        }






        table.innerHTML="";






        this.evidence.forEach(item=>{





            table.innerHTML += `



            <tr>



                <td>

                    ${item.EvidenceID || "-"}

                </td>



                <td>

                    ${item.CaseReference || "-"}

                </td>



                <td>

                    ${item.Type || "-"}

                </td>



                <td>

                    ${item.SubmittedBy || "-"}

                </td>



                <td>

                    ${item.Custodian || "-"}

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

                    onclick="TORPEDO_EVIDENCE.view('${item.EvidenceID}')">


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

                "evidenceTableBody"

            );





        if(table){



            table.innerHTML=`



            <tr>


                <td colspan="8">


                    No evidence records available


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



        const total =

            this.evidence.length;



        let secured=0;


        let pending=0;


        let restricted=0;






        this.evidence.forEach(item=>{



            if(item.Status==="Secured")

                secured++;





            if(item.Status==="Review")

                pending++;





            if(item.Status==="Restricted")

                restricted++;



        });







        this.setText(

            "totalEvidence",

            total

        );



        this.setText(

            "securedEvidence",

            secured

        );



        this.setText(

            "pendingEvidence",

            pending

        );



        this.setText(

            "restrictedEvidence",

            restricted

        );





        this.setText(

            "evidenceCount",

            total+" Items"

        );



    },







    /*
    ==========================================================
    UPDATE TEXT
    ==========================================================
    */


    setText(id,value){



        const el =

            document.getElementById(id);



        if(el)

            el.textContent=value;



    },







    /*
    ==========================================================
    SEARCH
    ==========================================================
    */


    search(value){



        const term =

            value.toLowerCase();





        this.evidence =

            this.evidence.filter(item=>{


                return JSON.stringify(item)

                .toLowerCase()

                .includes(term);



            });





        this.render();



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

                    "evidenceSearch"

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

                    "uploadEvidenceButton"

                ){



                    TORPEDO_UI.toast(

                        "Evidence upload module ready",

                        "info"

                    );



                }



            }


        );



    },







    /*
    ==========================================================
    VIEW EVIDENCE
    ==========================================================
    */


    view(id){



        TORPEDO_UI.toast(

            "Opening evidence: "

            +

            id,

            "info"

        );



    }




};







window.addEventListener(

    "viewLoaded",

    event=>{



        if(

            event.detail.view

            ===

            "evidence"

        ){



            TORPEDO_EVIDENCE.init();



        }



    }



);







window.TORPEDO_EVIDENCE =

    TORPEDO_EVIDENCE;
