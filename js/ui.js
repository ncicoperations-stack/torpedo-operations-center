/*
==============================================================
TORPEDO v2.0.0
National Cyber Intelligence Center
Operations Center

File: ui.js

Purpose:
User Interface Controller

==============================================================
*/


"use strict";



const TORPEDO_UI = {



    /*
    ==========================================================
    TOAST NOTIFICATION
    ==========================================================
    */


    toast(message, type="info"){



        const root =

            document.getElementById(

                "toast-root"

            );





        if(!root)

            return;





        const toast =

            document.createElement(

                "div"

            );





        toast.className =

            "toast "

            +

            type;





        toast.innerHTML = `



            <i class="fa-solid fa-circle-info"></i>


            <span>

                ${message}

            </span>



        `;





        root.appendChild(

            toast

        );





        setTimeout(()=>{



            toast.classList.add(

                "show"

            );



        },50);





        setTimeout(()=>{



            toast.classList.remove(

                "show"

            );





            setTimeout(()=>{


                toast.remove();


            },300);




        },3500);



    },







    /*
    ==========================================================
    MODAL
    ==========================================================
    */


    modal(title,content){



        const root =

            document.getElementById(

                "modal-root"

            );





        if(!root)

            return;





        root.innerHTML = `



        <div class="modal-overlay">



            <div class="modal-box">



                <div class="modal-header">



                    <h2>

                        ${title}

                    </h2>



                    <button id="closeModal">

                        ×

                    </button>



                </div>





                <div class="modal-content">


                    ${content}


                </div>



            </div>



        </div>



        `;






        document

        .getElementById(

            "closeModal"

        )

        ?.addEventListener(

            "click",

            ()=>{


                this.closeModal();


            }


        );



    },







    /*
    ==========================================================
    CLOSE MODAL
    ==========================================================
    */


    closeModal(){



        const root =

            document.getElementById(

                "modal-root"

            );





        if(root)

            root.innerHTML = "";



    },







    /*
    ==========================================================
    CONFIRMATION
    ==========================================================
    */


    confirm(message){



        return window.confirm(

            message

        );



    },







    /*
    ==========================================================
    LOADING
    ==========================================================
    */


    loading(show=true,message="Loading..."){



        const overlay =

            document.getElementById(

                "loading-overlay"

            );





        const text =

            document.getElementById(

                "loadingMessage"

            );





        if(text)

            text.textContent = message;





        if(!overlay)

            return;





        if(show){



            overlay.classList.remove(

                "hidden"

            );



        }


        else{


            overlay.classList.add(

                "hidden"

            );



        }



    },







    /*
    ==========================================================
    EMPTY PANEL
    ==========================================================
    */


    empty(message){



        return `



        <div class="empty-state">



            <i class="fa-solid fa-database"></i>



            <p>

                ${message}

            </p>



        </div>



        `;



    },







    /*
    ==========================================================
    STATUS BADGE
    ==========================================================
    */


    badge(status){



        let color = "gray";





        switch(status){



            case "Received":

                color="blue";

                break;



            case "Active":

                color="green";

                break;



            case "High":

                color="red";

                break;



            case "Closed":

                color="gray";

                break;



        }





        return `



        <span class="badge ${color}">

            ${status}

        </span>



        `;



    }






};







window.TORPEDO_UI =

    TORPEDO_UI;
