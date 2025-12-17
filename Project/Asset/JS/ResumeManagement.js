let savedResumes=[
{id:1,name:"Default Tech Resume",filename:"tech_resume_v1.pdf",uploadedDate:"2025-11-01"},
{id:2,name:"Creative Portfolio CV",filename:"creative_cv.docx",uploadedDate:"2025-12-10"}
];
let nextResumeId=3;

let uploadForm=document.getElementById("upload-form");
let resumeListContainer=document.getElementById("resume-list-container");
let resumeCountInfo=document.getElementById("resume-count-info");

function updateResumeCount(){
resumeCountInfo.textContent="You have "+savedResumes.length+" resumes saved.";
}

function createResumeItem(resume){
let item=document.createElement("div");
item.className="resume-item";
item.setAttribute("data-resume-id",resume.id);

let infoDiv=document.createElement("div");
infoDiv.className="resume-info";

let nameEl=document.createElement("h4");
nameEl.textContent=resume.name;

let fileInfoEl=document.createElement("p");
fileInfoEl.textContent="File: "+resume.filename+" | Uploaded: "+resume.uploadedDate;

infoDiv.appendChild(nameEl);
infoDiv.appendChild(fileInfoEl);

let actionsDiv=document.createElement("div");
actionsDiv.className="resume-actions";

let previewBtn=document.createElement("button");
previewBtn.className="action-preview";
previewBtn.textContent="Preview/Download";
previewBtn.setAttribute("onclick",'handleAction("preview",'+resume.id+',"'+resume.name+'")');

let deleteBtn=document.createElement("button");
deleteBtn.className="action-delete";
deleteBtn.textContent="Delete";
deleteBtn.setAttribute("onclick",'handleAction("delete",'+resume.id+',"'+resume.name+'")');

actionsDiv.appendChild(previewBtn);
actionsDiv.appendChild(deleteBtn);

item.appendChild(infoDiv);
item.appendChild(actionsDiv);
return item;
}

function populateResumeList(){
resumeListContainer.innerHTML="";
for(let i=0;i<savedResumes.length;i++){
resumeListContainer.appendChild(createResumeItem(savedResumes[i]));
}
updateResumeCount();
}

function handleAction(actionType,resumeId,resumeName){
if(actionType==="delete"){
if(confirm('Are you sure you want to delete the resume "'+resumeName+'"?')){
deleteResume(resumeId);
}
}else if(actionType==="preview"){
alert('Opening preview/download link for "'+resumeName+'" (ID: '+resumeId+').');
}
}

function deleteResume(resumeId){
let initialLength=savedResumes.length;
for(let i=0;i<savedResumes.length;i++){
if(savedResumes[i].id===resumeId){
savedResumes.splice(i,1);
break;
}
}
if(savedResumes.length<initialLength){
alert("Resume deleted successfully.");
populateResumeList();
}else{
alert("Error: Resume not found.");
}
}

function handleUpload(event){
event.preventDefault();

let fileInput=document.getElementById("resume-file");
let nameInput=document.getElementById("resume-name");

let file=fileInput.files[0];
let resumeName=nameInput.value.trim();

if(!file){
alert("Please select a file to upload.");
return;
}

let date=new Date();
let dateString=date.getFullYear()+"-"+(date.getMonth()+1).toString().padStart(2,"0")+"-"+date.getDate().toString().padStart(2,"0");

let newResume={
id:nextResumeId++,
name:resumeName,
filename:file.name,
uploadedDate:dateString
};

savedResumes.push(newResume);
alert('Resume "'+resumeName+'" uploaded successfully!');
populateResumeList();
uploadForm.reset();
}

uploadForm.addEventListener("submit",handleUpload);
document.addEventListener("DOMContentLoaded",populateResumeList);
