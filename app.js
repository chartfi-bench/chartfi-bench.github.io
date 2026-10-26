const scoreTable=document.querySelector('#leaderboard table');
const rows=[...scoreTable.querySelectorAll('tbody tr')];
function sortScores(){
 const index=Number(document.querySelector('#sort').value)+1;
 const body=scoreTable.querySelector('tbody');
 rows.sort((a,b)=>Number(b.cells[index].textContent)-Number(a.cells[index].textContent)).forEach(row=>body.appendChild(row));
 rows.forEach(row=>[...row.cells].forEach((cell,i)=>cell.classList.toggle('sorted',i===index)));
}
for(let i=1;i<9;i++){
 const max=Math.max(...rows.map(row=>Number(row.cells[i].textContent)));
 rows.forEach(row=>row.cells[i].classList.toggle('best',Number(row.cells[i].textContent)===max));
}
document.querySelector('#sort').addEventListener('change',sortScores);sortScores();
document.querySelector('#copy-citation').addEventListener('click',async()=>{
 const text=document.querySelector('#bibtex').textContent;
 try{await navigator.clipboard.writeText(text);document.querySelector('#copy-status').textContent='BibTeX copied.';}
 catch{const selection=window.getSelection();const range=document.createRange();range.selectNodeContents(document.querySelector('#bibtex'));selection.removeAllRanges();selection.addRange(range);document.querySelector('#copy-status').textContent='Select and copy the highlighted BibTeX.';}
});
