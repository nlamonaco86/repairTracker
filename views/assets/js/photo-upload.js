$.get("/api/user_data").then(cloudData => {
    
    var myWidget = cloudinary.createUploadWidget({
        cloudName: cloudData.cloudUploadName, 
        uploadPreset: cloudData.cloudUploadPreset}, (error, result) => {  
        if (!error && result && result.event === "success") { 
            console.log(result.info.secure_url);
            $("#photo").val(result.info.secure_url);
        }
        }
    )
    
    document.getElementById("upload_widget").addEventListener("click", function(){
        myWidget.open();
    }, false);

});