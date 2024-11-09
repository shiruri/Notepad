//let username;
//document.getElementById("Submit").onclick = function() {
 //   username = document.getElementById("Firstname").value;
  //  displayaName(username);

//}
//function displayaName(username) {
//    if (username === "") {
//       username = "Guest";
//        document.getElementById("myh1").textContent = `Welcome ${username}`;
//
//  }
//    else {
//        document.getElementById("myh1").textContent = `Welcome ${username}`;

//    }



// will add it to the stack 
let undoStack = [];
let redoStack = [];

var input = document.getElementById("Notes");
let linetext = document.getElementById("Notes").value;

var input = document.getElementById("Notes");
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        let linetext = input.value;
        undoStack.push(linetext); // Add to undo stack
        redoStack = []; // Clear redo stack on new action
    }
});

   // toggle undo debug
function undoToggle() {
    var undo = document.getElementById("UndoDebug");
    if (undo.style.display==="none") {
        undo.style.display = "block";

    }
    else {
        undo.style.display ="none";
    }
};
//toggle redo debug
function toggleRedo() {
    var redo = document.getElementById("RedoDebug");
    if (redo.style.display === "none") {
        redo.style.display = "block";  
    } else {
        redo.style.display = "none";   
    }
};
// undo function


// Button for Undo action
var Undo = document.getElementById("undo").onclick = function (event) {
    let topElement = undoStack[undoStack.length - 1];
    redoStack.push(topElement); // will save the undo top part
    undoStack.pop();
    let notesInput = document.getElementById("Notes");
    if (undoStack.length > 0) {
        notesInput.value = undoStack[undoStack.length - 1]; // Show new top of undoStack
    } else {
        notesInput.value = ""; // Clear if undoStack is empty
    }
};

// Button for Redo action
// Redo button functionality
document.getElementById("redo").onclick = function(event) {
    // Access the input field to update it with redo action
    let notesInput = document.getElementById("Notes");

    // Check if `redoStack` has any elements to redo
    if (redoStack.length > 0) {
        // Step 1: Get the top element of `redoStack` (last action to redo)
        let topRedo = redoStack[redoStack.length - 1];

        // Step 2: Add the redone action back to `undoStack`
        undoStack.push(topRedo);

        // Step 3: Update the input field to display the redone action
        notesInput.value = topRedo;

        // Step 4: Remove the top element from `redoStack`
        redoStack.pop();
    } else {
        // If `redoStack` is empty, optionally clear the input field
        notesInput.value = ""; // Clear the input field if nothing to redo
    }
};
// Save button functionality (preserving undo history)
// Save button functionality (preserving undo history)
var Save = document.getElementById("save").onclick = function(event) {
    let inputSave = document.getElementById("Notes");
    undoStack.push(inputSave.value); // Save the current text to the undo stack 
};

// Accessing the Open button and file input
document.getElementById('open').onclick = function() {
    // Trigger the hidden file input click when the Open button is clicked
    document.getElementById('fileInput').click();
};

// When the user selects a file, read the file
document.getElementById('fileInput').addEventListener('change', function(event) {
    // Get the selected file
    const file = event.target.files[0];
    if (file && file.type === 'text/plain') {
        const reader = new FileReader();
        
        // Set the onload event of the FileReader to handle file reading
        reader.onload = function(e) {
            const fileContent = e.target.result;
            console.log("File content loaded:", fileContent);  // Debugging to check the content
            
            // Check if the content is correctly loaded and display it in the textarea
            document.getElementById('Notes').value = fileContent;
        };

        // Read the file as text
        reader.readAsText(file);
    } else {
        alert('Please select a valid .txt file');
    }
});

// Ensure file input event listener is active each time the file input is triggered
document.getElementById('fileInput').value = '';  // Reset file input after file is loaded
