
// Notes

document.getElementById("noteForm").addEventListener("submit", function (event) {
  event.preventDefault();


  const noteText = document.getElementById("noteText").value;
  const noteDate = document.getElementById("noteDate").value;


  const note = document.createElement("div");
  note.classList.add("note");


  const formattedDate = new Date(noteDate).toLocaleString();

  note.innerHTML = `
        <p><strong>Note:</strong> ${noteText}</p>
        <time datetime="${noteDate}">${formattedDate}</time>
    `;


  document.getElementById("notesList").appendChild(note);

  document.getElementById("noteForm").reset();
});
