var jobPostings=[
{id:101,title:"Backend Engineer (Go/AWS)",applicants:[
{id:1,name:"Mostofa Zakaria",status:"New"},
{id:2,name:"Aslam AHmed",status:"Shortlisted"},
{id:3,name:"Sajek Mollah",status:"Rejected"},
{id:4,name:"Sadik Kaiyum",status:"New"}
],status:"Active"},
{id:102,title:"Data Scientist (Python/ML)",applicants:[
{id:5,name:"Ahanaf Chowdhury",status:"New"},
{id:6,name:"Akkas ALi",status:"Shortlisted"}
],status:"Active"},
{id:103,title:"Nur nobi",applicants:[],status:"Closed"}
];

var dashboardView=document.getElementById("dashboard-view");
var applicantsView=document.getElementById("applicants-view");
var jobTableBody=document.querySelector("#posted-jobs-table tbody");
var backButton=document.getElementById("back-to-dashboard-button");
var jobDetailTitle=document.getElementById("job-detail-title");
var applicantCountEl=document.getElementById("applicant-count");
var applicantsListEl=document.getElementById("applicants-list");

function showDashboard(){
dashboardView.classList.remove("hidden");
applicantsView.classList.add("hidden");
}

function showJobDetailsView(jobId){
var job=findJobById(jobId);
if(job){
jobDetailTitle.textContent=job.title;
applicantCountEl.textContent=job.applicants.length;
populateApplicantsList(job.applicants);
dashboardView.classList.add("hidden");
applicantsView.classList.remove("hidden");
}else{
alert("Job not found.");
}
}

function findJobById(id){
for(var i=0;i<jobPostings.length;i++){
if(jobPostings[i].id===id)return jobPostings[i];
}
return null;
}

function createJobRow(job){
var row=document.createElement("tr");

var titleCell=document.createElement("td");
titleCell.textContent=job.title;

var applicantsCell=document.createElement("td");
applicantsCell.textContent=job.applicants.length;

var statusCell=document.createElement("td");
statusCell.textContent=job.status;

var actionCell=document.createElement("td");
var viewButton=document.createElement("button");
viewButton.className="view-applicants-button";
viewButton.textContent="View Applicants";
viewButton.setAttribute("data-job-id",job.id);
viewButton.addEventListener("click",function(){
showJobDetailsView(parseInt(this.getAttribute("data-job-id")));
});

actionCell.appendChild(viewButton);
row.appendChild(titleCell);
row.appendChild(applicantsCell);
row.appendChild(statusCell);
row.appendChild(actionCell);
jobTableBody.appendChild(row);
}

function populatePostedJobsSummary(){
jobTableBody.innerHTML="";
for(var i=0;i<jobPostings.length;i++){
createJobRow(jobPostings[i]);
}
}

function populateApplicantsList(applicants){
applicantsListEl.innerHTML="";
for(var i=0;i<applicants.length;i++){
var a=applicants[i];
var item=document.createElement("li");
item.className="applicant-item";

var info=document.createElement("div");
info.className="applicant-info";

var name=document.createElement("h4");
name.textContent=a.name;

var status=document.createElement("p");
status.textContent="Status: "+a.status;

info.appendChild(name);
info.appendChild(status);

var actions=document.createElement("div");
actions.className="applicant-actions";

["view","shortlist","reject"].forEach(function(type){
var btn=document.createElement("button");
btn.className="action-"+type;
btn.textContent=type.charAt(0).toUpperCase()+type.slice(1);
btn.setAttribute("onclick",'handleAction("'+type+'","'+a.name+'")');
actions.appendChild(btn);
});

item.appendChild(info);
item.appendChild(actions);
applicantsListEl.appendChild(item);
}
}

function handleAction(actionType,applicantName){
alert(actionType.toUpperCase()+" action executed for "+applicantName+". (Requires backend update.)");
}

backButton.addEventListener("click",showDashboard);

document.getElementById("create-job-button").addEventListener("click",function(){
alert("Redirecting to job creation form...");
});

document.addEventListener("DOMContentLoaded",function(){
populatePostedJobsSummary();
showDashboard();
});
