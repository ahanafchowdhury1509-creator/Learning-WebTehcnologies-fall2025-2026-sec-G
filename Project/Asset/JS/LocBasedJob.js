var allJobs=[
{id:1,title:"Software Engineer",company:"Brain Station 23",location:"Dhaka, Bangladesh",type:"Onsite"},
{id:2,title:"Data Analyst",company:"BJIT Group",location:"Remote (Bangladesh)",type:"Remote"},
{id:3,title:"UX Designer",company:"Pathao",location:"Chattogram, Bangladesh",type:"Hybrid"},
{id:4,title:"Product Manager",company:"ShopUp",location:"Sylhet, Bangladesh",type:"Onsite"},
{id:5,title:"Technical Writer",company:"bKash",location:"Remote (Bangladesh)",type:"Remote"}
];

var locationInput=document.getElementById("location-input");
var jobTypeSelect=document.getElementById("job-type-select");
var applyFiltersButton=document.getElementById("apply-filters-button");
var detectLocationButton=document.getElementById("detect-location-button");
var jobResultsList=document.getElementById("job-results-list");
var resultCountEl=document.getElementById("result-count");

function filterJobs(){
var locationTerm=locationInput.value.toLowerCase().trim();
var jobType=jobTypeSelect.value;
var filteredJobs=[];
for(var i=0;i<allJobs.length;i++){
var job=allJobs[i];
var locationMatch=true;
var typeMatch=true;
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
var noResults=document.createElement("p");
noResults.textContent="No jobs match your current filters.";
jobResultsList.appendChild(noResults);
return;
}
for(var i=0;i<jobs.length;i++){
var job=jobs[i];
var item=document.createElement("div");
item.className="job-result-item";
item.setAttribute("data-job-id",job.id);

var title=document.createElement("h4");
title.textContent=job.title;

var details=document.createElement("p");
details.textContent=job.company+" | "+job.location;

var tagsDiv=document.createElement("div");
tagsDiv.className="job-tags";

var typeTag=document.createElement("span");
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
for(var i=0;i<allJobs.length;i++){
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
