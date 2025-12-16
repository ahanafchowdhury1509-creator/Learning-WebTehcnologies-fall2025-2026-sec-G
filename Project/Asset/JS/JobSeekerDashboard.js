var recommendedJobs=[
    {id:1,title:"Senior Full Stack Engineer",company:"Tech Innovators Inc.",location:"Remote (PST)",description:"Develop and maintain web applications using React and Node.js. 5+ years of experience required. Strong knowledge of cloud infrastructure is a plus."},
    {id:2,title:"UX/UI Designer",company:"Creative Solutions Co.",location:"New York, NY",description:"Design user-friendly interfaces and conduct user research. Must be proficient in Figma or Sketch. Portfolio required for consideration."},
    {id:3,title:"Data Analyst",company:"Global Finance Group",location:"Chicago, IL",description:"Analyze large datasets to provide business insights. Experience with SQL and Python/R is essential. Focus on market trends and risk assessment."}];

var jobFeedContainer=document.getElementById("recommended-jobs-feed");
var modal=document.getElementById("job-detail-modal");
var closeButton=document.querySelector(".close-button");
var applyButton=document.getElementById("apply-button");

var jobTitleEl=document.getElementById("job-title");
var jobCompanyEl=document.getElementById("job-company");
var jobLocationEl=document.getElementById("job-location");
var jobDescriptionEl=document.getElementById("job-description");

function createJobCard(job){
    var card=document.createElement("div");
    card.className="job-card";
    card.setAttribute("data-job-id",job.id);

    var title=document.createElement("h4");
    title.textContent=job.title;

    var company=document.createElement("p");
    company.textContent="Company: "+job.company;

    var location=document.createElement("p");
    location.textContent="Location: "+job.location;

    card.appendChild(title);
    card.appendChild(company);
    card.appendChild(location);

    card.addEventListener("click",function(){
        openJobModal(job.id);
    });

    jobFeedContainer.appendChild(card);
}

function populateJobFeed(){
    for(var i=0;i<recommendedJobs.length;i++){
        createJobCard(recommendedJobs[i]);
    }
}

function openJobModal(jobId){
    var job=null;
    for(var i=0;i<recommendedJobs.length;i++){
        if(recommendedJobs[i].id===jobId){
            job=recommendedJobs[i];
            break;
        }
    }
    if(job){
        jobTitleEl.textContent=job.title;
        jobCompanyEl.textContent=job.company;
        jobLocationEl.textContent=job.location;
        jobDescriptionEl.textContent=job.description;
        applyButton.setAttribute("onclick",'handleApplyClick("'+job.title+'")');
        modal.style.display="block";
    }
}

function closeModal(){
    modal.style.display="none";
}

function handleApplyClick(jobTitle){
    alert('Applying for "'+jobTitle+'". (This is a placeholder action.)');
    closeModal();
}

closeButton.addEventListener("click",closeModal);

window.addEventListener("click",function(event){
    if(event.target===modal){
        closeModal();
    }
});

document.addEventListener("DOMContentLoaded",populateJobFeed);
