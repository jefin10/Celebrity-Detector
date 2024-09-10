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
            };

            reader.readAsDataURL(file);
        } else {
            alert('Please select an image file.');
        }
    });

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
                    resultText += `Result ${index + 1}:\n`;
                    resultText += `Class: ${result.class}\n`;
                    resultText += `Probabilities:\n`;
                    result.class_probability.forEach((prob, i) => {
                        const className = Object.keys(result.class_dictionary).find(key => result.class_dictionary[key] === i);
                        resultText += `  ${className}: ${prob}%\n`;
                    });
                    resultText += '\n';
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