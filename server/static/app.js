document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('file');
    const submitBtn = document.getElementById('submitBtn');

    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const reader = new FileReader();

            reader.onload = function(e) {
                const base64Image = e.target.result;
                sendImageToServer(base64Image);
                text[0].innerHTML = "drag and drop your image here or click to select an image!"
            };

            reader.readAsDataURL(file);
        } else {
            alert('Please select an image file.');
        }
    });
    const filein = document.getElementById('file')
    var text = document.getElementsByClassName('text' )
    filein.addEventListener('change', function(){
        if(filein.files.length>0){
            text[0].innerHTML = "File upload has been succesfull"
        }
    })
    function sendImageToServer(base64Image) {
        const formData = new FormData();
        formData.append('image_data', base64Image);
    
        fetch('http://localhost:5000/classify_image', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Server response:', data);
            if (data.error) {
                alert('Error: ' + data.error);
            } else {
                
                let resultText = '';
                data.forEach((result, index) => {
                    resultText += `Result :\n`;
                    resultText += `${result.class}\n`;
                    
                    
                });
                alert(resultText);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Please upload a better image ');
        });
    }
});