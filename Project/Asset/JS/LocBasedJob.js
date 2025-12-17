let allJobs=[
{id:1,title:"Software Engineer",company:"Brain Station 23",location:"Dhaka, Bangladesh",type:"Onsite"},
{id:2,title:"Data Analyst",company:"BJIT Group",location:"Remote (Bangladesh)",type:"Remote"},
{id:3,title:"UX Designer",company:"Pathao",location:"Chattogram, Bangladesh",type:"Hybrid"},
{id:4,title:"Product Manager",company:"ShopUp",location:"Sylhet, Bangladesh",type:"Onsite"},
{id:5,title:"Technical Writer",company:"bKash",location:"Remote (Bangladesh)",type:"Remote"}
];

let locationInput=document.getElementById("location-input");
let jobTypeSelect=document.getElementById("job-type-select");
let applyFiltersButton=document.getElementById("apply-filters-button");
let detectLocationButton=document.getElementById("detect-location-button");
let jobResultsList=document.getElementById("job-results-list");
let resultCountEl=document.getElementById("result-count");

function filterJobs(){
let locationTerm=locationInput.value.toLowerCase().trim();
let jobType=jobTypeSelect.value;
let filteredJobs=[];
for(let i=0;i<allJobs.length;i++){
let job=allJobs[i];
let locationMatch=true;
let typeMatch=true;
if(locationTerm!==""&&job.location.toLowerCase().indexOf(locationTerm)===-1){
locationMatch=false;
}
if(jobType!=="All"&&job.type!==jobType){
typeMatch=false;
}
if(locationMatch&&typeMatch){
filteredJobs.push(job);
}
}
displayJobResults(filteredJobs);
}

function displayJobResults(jobs){
jobResultsList.innerHTML="";
resultCountEl.textContent=jobs.length;
if(jobs.length===0){
let noResults=document.createElement("p");
noResults.textContent="No jobs match your current filters.";
jobResultsList.appendChild(noResults);
return;
}
for(let i=0;i<jobs.length;i++){
let job=jobs[i];
let item=document.createElement("div");
item.className="job-result-item";
item.setAttribute("data-job-id",job.id);

let title=document.createElement("h4");
title.textContent=job.title;

let details=document.createElement("p");
details.textContent=job.company+" | "+job.location;

let tagsDiv=document.createElement("div");
tagsDiv.className="job-tags";

let typeTag=document.createElement("span");
typeTag.textContent=job.type;

tagsDiv.appendChild(typeTag);
item.appendChild(title);
item.appendChild(details);
item.appendChild(tagsDiv);

item.addEventListener("click",function(){
viewJobDetails(this.getAttribute("data-job-id"));
});

jobResultsList.appendChild(item);
}
}

function viewJobDetails(jobId){
for(let i=0;i<allJobs.length;i++){
if(allJobs[i].id===parseInt(jobId)){
alert("Displaying full details for: "+allJobs[i].title+" at "+allJobs[i].company+" in "+allJobs[i].location);
break;
}
}
}

function autoDetectLocation(){
alert("Simulating auto-detection...");
locationInput.value="Dhaka";
filterJobs();
}

applyFiltersButton.addEventListener("click",filterJobs);
detectLocationButton.addEventListener("click",autoDetectLocation);

document.addEventListener("DOMContentLoaded",function(){
displayJobResults(allJobs);
});
