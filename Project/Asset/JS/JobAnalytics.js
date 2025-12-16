let jobData=[
{id:1,title:"Senior Backend Engineer",views:650,applications:45,conversionRatio:0},
{id:2,title:"Marketing Specialist",views:520,applications:30,conversionRatio:0},
{id:3,title:"HR Coordinator",views:370,applications:10,conversionRatio:0}
];

let chartData=[
{week:"Wk 1",count:15},
{week:"Wk 2",count:20},
{week:"Wk 3",count:35},
{week:"Wk 4",count:15}
];

let jobTableBody=document.querySelector("#job-analytics-table tbody");
let chartContainer=document.getElementById("application-chart");

function calculateMetrics(){
let totalViews=0,totalApplications=0;
for(let i=0;i<jobData.length;i++){
let job=jobData[i];
job.conversionRatio=job.views>0?(job.applications/job.views)*100:0;
totalViews+=job.views;
totalApplications+=job.applications;
}
let overallConversion=totalViews>0?(totalApplications/totalViews)*100:0;
document.getElementById("total-views").textContent=totalViews.toLocaleString();
document.getElementById("total-apps").textContent=totalApplications.toLocaleString();
document.getElementById("conversion-rate").textContent=overallConversion.toFixed(1)+"%";
}

function populateJobTable(){
jobTableBody.innerHTML="";
for(let i=0;i<jobData.length;i++){
let job=jobData[i];
let row=document.createElement("tr");

let titleCell=document.createElement("td");
titleCell.textContent=job.title;

let viewsCell=document.createElement("td");
viewsCell.textContent=job.views.toLocaleString();

let appsCell=document.createElement("td");
appsCell.textContent=job.applications.toLocaleString();

let ratioCell=document.createElement("td");
ratioCell.textContent=job.conversionRatio.toFixed(2)+"%";

let actionCell=document.createElement("td");
let btn=document.createElement("button");
btn.className="view-details-button";
btn.textContent="Details";
btn.setAttribute("data-job-id",job.id);
btn.addEventListener("click",function(){
viewJobSpecificAnalytics(parseInt(this.getAttribute("data-job-id")));
});

actionCell.appendChild(btn);
row.appendChild(titleCell);
row.appendChild(viewsCell);
row.appendChild(appsCell);
row.appendChild(ratioCell);
row.appendChild(actionCell);
jobTableBody.appendChild(row);
}
}

function drawSimpleChart(){
let maxCount=0;
for(let i=0;i<chartData.length;i++){
if(chartData[i].count>maxCount)maxCount=chartData[i].count;
}
chartContainer.innerHTML="";
for(let i=0;i<chartData.length;i++){
let d=chartData[i];
let height=Math.max(5,(d.count/maxCount)*100);
let bar=document.createElement("div");
bar.className="chart-bar";
bar.style.height=height+"%";

let value=document.createElement("span");
value.className="bar-value";
value.textContent=d.count;

let label=document.createElement("span");
label.className="bar-label";
label.textContent=d.week;

bar.appendChild(value);
bar.appendChild(label);
chartContainer.appendChild(bar);
}
}

function handleDownload(type){
alert("Generating "+type.toUpperCase()+" report...");
}

function viewJobSpecificAnalytics(jobId){
for(let i=0;i<jobData.length;i++){
if(jobData[i].id===jobId){
alert(
"Showing detailed analytics for: "+jobData[i].title+
"\nViews: "+jobData[i].views+
"\nApplications: "+jobData[i].applications
);
break;
}
}
}

document.getElementById("download-pdf-button").addEventListener("click",function(){
handleDownload("PDF Summary");
});

document.getElementById("download-csv-button").addEventListener("click",function(){
handleDownload("CSV Application Data");
});

document.addEventListener("DOMContentLoaded",function(){
calculateMetrics();
populateJobTable();
drawSimpleChart();
});
