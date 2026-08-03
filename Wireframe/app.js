/*
===========================================================
 ResearchRAG Application Controller
 Multimodal Research RAG UI Prototype
===========================================================

Responsibilities:
- Load mock data
- Manage application state
- Chat streaming simulation
- Document library interactions
- Citation navigation
- Evidence synchronization
- Upload simulation
- Comparison mode
- Admin dashboard
- Theme switching
- Retrieval diagnostics

===========================================================
*/


const ResearchRAG = {

    state: {

        documents: [],

        citations: [],

        retrieval: {},

        activeDocument: null,

        selectedEvidence: null,

        theme: "light",

        chatHistory: []

    },


    init: async function(){

        console.log(
            "Initializing ResearchRAG..."
        );


        await this.loadMockData();


        this.bindEvents();


        this.render();


        console.log(
            "ResearchRAG Ready"
        );

    },



/*
===========================================================
 DATA LOADING
===========================================================
*/


    loadMockData: async function(){


        try {


            const [
                documents,
                retrieval,
                citations

            ] = await Promise.all([


                fetch(
                    "mock-data/documents.json"
                ).then(
                    r=>r.json()
                ),



                fetch(
                    "mock-data/retrieval.json"
                ).then(
                    r=>r.json()
                ),



                fetch(
                    "mock-data/citations.json"
                ).then(
                    r=>r.json()
                )


            ]);



            this.state.documents =
                documents.documents;



            this.state.retrieval =
                retrieval;



            this.state.citations =
                citations.citations;



        }


        catch(error){


            console.error(

                "Failed loading mock data",

                error

            );


        }


    },





/*
===========================================================
 EVENT BINDINGS
===========================================================
*/


    bindEvents:function(){


        const sendButton =
            document.querySelector(
                ".composer .button"
            );


        if(sendButton){


            sendButton.onclick =
                ()=>this.sendMessage();


        }




        const uploadButtons =
            document.querySelectorAll(
                ".button"
            );



        uploadButtons.forEach(btn=>{


            if(
                btn.innerText.includes(
                    "Upload"
                )
            ){

                btn.onclick =
                    ()=>this.openUpload();

            }



            if(
                btn.innerText.includes(
                    "Compare"
                )
            ){

                btn.onclick =
                    ()=>this.openCompare();

            }



            if(
                btn.innerText.includes(
                    "☾"
                )
            ){

                btn.onclick =
                    ()=>this.toggleTheme();

            }


        });




        const search =
            document.querySelector(
                ".search"
            );


        if(search){


            search.addEventListener(

                "input",

                e=>
                    this.searchDocuments(
                        e.target.value
                    )

            );

        }



        this.bindDocuments();


    },





/*
===========================================================
 DOCUMENT LIBRARY
===========================================================
*/


    bindDocuments:function(){


        document
        .querySelectorAll(
            ".document"
        )
        .forEach(

            (item,index)=>{


                item.onclick=()=>{


                    this.selectDocument(
                        index
                    );


                };


            }

        );


    },





    selectDocument:function(index){


        this.state.activeDocument =
            this.state.documents[index];



        console.log(

            "Active document",

            this.state.activeDocument

        );


    },





    searchDocuments:function(term){


        term =
        term.toLowerCase();



        document
        .querySelectorAll(
            ".document"
        )
        .forEach(doc=>{


            doc.style.display =


            doc.innerText
            .toLowerCase()
            .includes(term)

            ?

            "block"

            :

            "none";


        });


    },





/*
===========================================================
 CHAT
===========================================================
*/


    sendMessage:function(){


        const input =
            document.querySelector(
                ".composer textarea"
            );



        if(!input)
            return;



        const question =
            input.value.trim();



        if(!question)
            return;



        this.addMessage(

            "user",

            question

        );



        input.value="";



        this.streamResponse();



    },





    addMessage:function(
        role,
        content
    ){


        const chat =
            document.querySelector(
                ".chat"
            );



        if(!chat)
            return;



        const div =
            document.createElement(
                "div"
            );



        div.className =
            "message " + role;



        div.innerHTML =

        `

        <div class="bubble">

        ${content}

        </div>

        `;



        chat.appendChild(div);



        chat.scrollTop =
            chat.scrollHeight;


    },







    streamResponse:function(){


        const answer = `


        The proposed architecture improves retrieval accuracy by combining dense,
        sparse, and visual retrieval.


        <br><br>


        The latency benchmark shows an 18% improvement compared with the baseline.


        <br><br>


        <a href="#"
        onclick="ResearchRAG.openCitation('fig-004')">

        [Source: Figure 4]

        </a>


        `;



        const wrapper =
            document.createElement(
                "div"
            );



        wrapper.className =
            "message assistant";



        wrapper.innerHTML =


        `

        <div class="bubble">

        <span id="stream-answer"></span>

        </div>

        `;



        document
        .querySelector(".chat")
        .appendChild(wrapper);



        const target =
            document.querySelector(
                "#stream-answer"
            );



        let position=0;



        const timer =
        setInterval(()=>{


            target.innerHTML =
                answer.substring(
                    0,
                    position
                );


            position++;



            if(
                position >
                answer.length
            ){

                clearInterval(timer);

            }



        },25);



    },





/*
===========================================================
 CITATIONS
===========================================================
*/


    openCitation:function(id){


        if(
            typeof openPDF ===
            "function"
        ){

            openPDF();


        }



        setTimeout(()=>{


            if(
                typeof selectEvidence ===
                "function"
            ){

                selectEvidence(id);


            }


        },300);



    },





/*
===========================================================
 UPLOAD
===========================================================
*/


    openUpload:function(){


        const modal =
            document.getElementById(
                "uploadModal"
            );


        if(modal)

            modal.style.display =
                "flex";


    },




    closeUpload:function(){


        const modal =
            document.getElementById(
                "uploadModal"
            );


        if(modal)

            modal.style.display =
                "none";


    },





    simulateUpload:function(){


        let progress=0;


        const timer =
        setInterval(()=>{


            progress +=10;


            console.log(

                "Ingestion",

                progress+"%"

            );



            if(progress>=100)

            {


                clearInterval(timer);


                console.log(
                    "Indexed"
                );


            }


        },500);


    },





/*
===========================================================
 COMPARISON
===========================================================
*/


    openCompare:function(){


        const view =
            document.getElementById(
                "compareView"
            );


        if(view)

            view.style.display =
                "block";


    },



    closeCompare:function(){


        const view =
            document.getElementById(
                "compareView"
            );


        if(view)

            view.style.display =
                "none";


    },





/*
===========================================================
 ADMIN
===========================================================
*/


    openAdmin:function(){


        document
        .getElementById(
            "adminView"
        )
        .style.display="block";


    },



    closeAdmin:function(){


        document
        .getElementById(
            "adminView"
        )
        .style.display="none";


    },





/*
===========================================================
 THEME
===========================================================
*/


    toggleTheme:function(){


        if(
            this.state.theme==="light"
        ){


            document.body.style.background =
                "#020617";


            document.body.style.color =
                "#e5e7eb";


            this.state.theme =
                "dark";


        }

        else{


            document.body.style.background =
                "#f8fafc";


            document.body.style.color =
                "#111827";


            this.state.theme =
                "light";


        }


    },





/*
===========================================================
 DIAGNOSTICS
===========================================================
*/


    diagnostics:function(){


        const r =
            this.state.retrieval;



        console.table({

            HybridScore:
            r.retrieval?.hybridScore,


            Latency:
            r.retrieval?.latencyMs,


            Figures:
            r.diagnostics?.retrievedFigures,


            Tables:
            r.diagnostics?.retrievedTables,


            Tokens:
            r.retrieval?.promptTokens


        });


    },






/*
===========================================================
 INITIAL RENDER
===========================================================
*/


    render:function(){


        this.bindDocuments();


        console.log({

            Documents:
            this.state.documents.length,


            Citations:
            this.state.citations.length


        });


    }


};





/*
===========================================================
 GLOBAL EXPORTS
===========================================================
*/


window.ResearchRAG =
    ResearchRAG;



document.addEventListener(

"DOMContentLoaded",

()=>{


    ResearchRAG.init();


}

);