window.ondragover = function(){
	console.log("You are dragginh!");

	// Show dropzone when image something is dragged inside browser
	
	document.getElementById("dropPopup").style.display = "block";
}

var dropzone = document.getElementById("dropzone");

// Something is dropped in the dropzone
dropzone.ondrop = function(e){
	e.preventDefault();

	// Send the file
	uploadFile(e.dataTransfer.files);
}

// Something is dragged over the dropzone
dropzone.ondragover = function(e){

	console.log('Something is dragged over the dropzone!');

	// Prevent browser from displaying the image
	return false;
}

// User left the dropzone
dropzone.ondragleave = function(e){

	e.preventDefault();
	console.log('Left the dropzone');

	// Prevent browser from displaying the image
	return false;
}

function uploadFile(file){

	// New FormData-instannce
	var fd = new FormData();

	// New XMLHttpRequest-instance
	var xhr = new XMLHttpRequest();

	var fileCount = 0;

	// Multiple files
	for(i = 0; i < file.length; i++){

		++fileCount;
		console.log('File: ' + file[i].name + 'File count: ' + fileCount);

		// Append file
		fd.append('file[]', file[i]);

		if(fileCount > 5){
			throw("You can't upload more than 5 files!");
		}
	}

	console.log(fd.length);

	// Display the upload progess
	xhr.upload.onprogress = function(e){

		// If the length can be calculated, calculate the percentage completed
		if(e.lengthComputable){

			var totalLoaded = e.loaded / e.total * 100;

			document.getElementById("uploadBar").childNodes[1].style.width = totalLoaded + "%";
			document.getElementById("uploadFeedback").innerHTML = "Your file(s) are " + totalLoaded + "% uploaded!";

			if(totalLoaded === 100){

				console.log("Loaded for 100%!");

				document.getElementById("uploadFeedback").innerHTML += "<div class='boxSuccess'>Your files are uploaded!</div>";

				setTimeout(function(){
					document.getElementById("uploadBar").childNodes[1].style.width = "0%";
					//document.getElementById("uploadFeedback").innerHTML = "";
				}, 1200);
				
			}
		}
	}

	// If the page has loaded
	xhr.onload = function(){
		console.log(xhr.responseText);
	}

	xhr.open("POST", 'upload.php');
	xhr.send(fd);

}
