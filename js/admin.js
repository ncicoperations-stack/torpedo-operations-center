/*
==============================================================
TORPEDO v2.0.0
National Cyber Intelligence Center
Operations Center

File: admin.js

Purpose:
Administration Controller

==============================================================
*/


"use strict";



const TORPEDO_ADMIN = {



    users: [],

    logs: [],





    /*
    ==========================================================
    INITIALIZE
    ==========================================================
    */


    init(){



        this.bindEvents();



        this.loadUsers();



        this.loadAudit();



    },







    /*
    ==========================================================
    LOAD USERS
    ==========================================================
    */


    async loadUsers(){



        try{



            const response =

                await TORPEDO_API.get(

                    "?action=getUsers"

                );





            if(

                response.success

                &&

                response.data

            ){



                this.users =

                    response.data;



            }

            else{


                this.users=[];


            }





            this.renderUsers();



        }



        catch(error){



            console.error(

                "User loading error:",

                error

            );



        }



    },







    /*
    ==========================================================
    LOAD AUDIT LOG
    ==========================================================
    */


    async loadAudit(){



        try{



            const response =

                await TORPEDO_API.get(

                    "?action=getAudit"

                );





            if(

                response.success

                &&

                response.data

            ){



                this.logs =

                    response.data;



            }

            else{


                this.logs=[];


            }





            this.renderAudit();



        }



        catch(error){



            console.error(

                "Audit loading error:",

                error

            );



        }



    },







    /*
    ==========================================================
    RENDER USERS
    ==========================================================
    */


    renderUsers(){



        const table =

            document.getElementById(

                "usersTableBody"

            );





        if(!table)

            return;





        if(

            this.users.length===0

        ){



            table.innerHTML=`



            <tr>

                <td colspan="6">

                    No users available

                </td>

            </tr>



            `;



            return;


        }






        table.innerHTML="";





        this.users.forEach(user=>{



            table.innerHTML += `



            <tr>


                <td>

                    ${user.UserID || "-"}

                </td>



                <td>

                    ${user.Name || "-"}

                </td>



                <td>

                    ${user.Role || "-"}

                </td>



                <td>

                    ${user.Status || "-"}

                </td>



                <td>

                    ${user.LastLogin || "-"}

                </td>



                <td>



                    <button

                    class="table-button"

                    onclick="TORPEDO_ADMIN.manage('${user.UserID}')">


                    Manage


                    </button>



                </td>



            </tr>



            `;



        });



    },







    /*
    ==========================================================
    RENDER AUDIT
    ==========================================================
    */


    renderAudit(){



        const table =

            document.getElementById(

                "auditTableBody"

            );





        if(!table)

            return;





        if(

            this.logs.length===0

        ){



            table.innerHTML=`



            <tr>

                <td colspan="4">

                    No audit records

                </td>

            </tr>



            `;



            return;


        }







        table.innerHTML="";





        this.logs.forEach(log=>{



            table.innerHTML += `



            <tr>



                <td>

                    ${log.EventID || "-"}

                </td>



                <td>

                    ${log.User || "-"}

                </td>



                <td>

                    ${log.Action || "-"}

                </td>



                <td>

                    ${log.Date || "-"}

                </td>



            </tr>



            `;



        });



    },







    /*
    ==========================================================
    USER MANAGEMENT
    ==========================================================
    */


    manage(id){



        TORPEDO_UI.modal(


            "User Management",


            `


            <p>

            Managing User:

            <strong>${id}</strong>


            </p>



            <button

            class="primary-button">


            Update Permissions


            </button>



            `


        );



    },







    /*
    ==========================================================
    CREATE USER
    ==========================================================
    */


    createUser(){



        TORPEDO_UI.toast(

            "User creation module ready",

            "info"

        );



    },







    /*
    ==========================================================
    EVENTS
    ==========================================================
    */


    bindEvents(){



        document.addEventListener(

            "click",

            event=>{



                if(

                    event.target.id

                    ===

                    "createUserButton"

                ){



                    this.createUser();



                }



                if(

                    event.target.id

                    ===

                    "refreshAdmin"

                ){



                    this.loadUsers();

                    this.loadAudit();



                    TORPEDO_UI.toast(

                        "Administration refreshed",

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

            "admin"

        ){



            TORPEDO_ADMIN.init();



        }



    }



);








window.TORPEDO_ADMIN =

    TORPEDO_ADMIN;
