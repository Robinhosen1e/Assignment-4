
function sectionShow(id){
    const sections = document.querySelectorAll(".section");
    sections.forEach(sec=>{
        sec.classList.remove("active");
    });
    document.getElementById(id).classList.add("active");
}

let rejectedList = [];
let interviewList = [];
let currentStatus = 'all'

function CountJob(){
   const totalJob = document.querySelectorAll("#all .job-card").length;
   const interviewJob = document.querySelectorAll("#interview .job-card").length;
   const rejectedJob = document.querySelectorAll("#rejected .job-card").length;

   document.getElementById("total-job-count").innerText = totalJob;
   document.getElementById("interview-job-count").innerText = interviewJob;
   document.getElementById("rejected-job-count").innerText = rejectedJob;

   JobCount.innerText = totalJob +" " + "Job";
   checkEmpty()
}

function checkEmpty(){
const interviewCards = document.querySelectorAll("#interview .job-card").length;
const rejectedCards = document.querySelectorAll("#rejected .job-card").length;

const interviewEmpty = document.getElementById("interview-empty");
const rejectedEmpty = document.getElementById("rejected-empty");

interviewCards === 0 ? interviewEmpty.classList.remove("hidden") : interviewEmpty.classList.add("hidden");
rejectedCards === 0 ? rejectedEmpty.classList.remove("hidden") : rejectedEmpty.classList.add("hidden");
}



function btnStatus(card, type){
    const status = card.querySelector(".status-btn");

    if(type === "interview"){
        status.innerText = "Interview";
        status.className = "status-btn bg-green-100 px-3 py-1 rounded mb-4 border-green-600";
    }

    if(type === "rejected"){
        status.innerText = "Rejected";
        status.className = "status-btn bg-red-100 px-3 py-1 rounded mb-4 border-red-600 ";
    }
}



function deleteExistJobCard(id){
    const cards = document.querySelectorAll("#interview .job-card, #rejected .job-card")
    cards.forEach(card=>{
        if(card.dataset.id === id){
            card.remove();
        }
    });
}


document.addEventListener("click", function(event){

    const card = event.target.closest(".job-card");
    if(!card) return;

    const id = card.dataset.id;
    const currentSection = card.closest(".section").id;

    
    if(event.target.classList.contains("interview-btn")){

        deleteExistJobCard(id);

        if(currentSection === "all"){
            const clone = card.cloneNode(true);
            btnStatus(clone,"interview");
            document.getElementById("interview").appendChild(clone);
        }else{
            btnStatus(card,"interview");
            document.getElementById("interview").appendChild(card);
        }

        btnStatus(card,"interview");
        CountJob();
    }

    
    if(event.target.classList.contains("reject-btn")){

        deleteExistJobCard(id);

        if(currentSection === "all"){
            const clone = card.cloneNode(true);
            btnStatus(clone,"rejected");
            document.getElementById("rejected").appendChild(clone);
        }else{
            btnStatus(card,"rejected");
            document.getElementById("rejected").appendChild(card);
        }

        btnStatus(card,"rejected");
        CountJob();
    }

    
    if(event.target.classList.contains("delete-btn")){
        card.remove();
        CountJob();
    }

});

CountJob();