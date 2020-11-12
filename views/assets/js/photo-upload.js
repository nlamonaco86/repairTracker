fetch("/api/user_data/", {type: "GET"}).then((cloudData) => {
    return cloudData.json();
  })
.then(cloudData => {
    
    var myWidget = cloudinary.createUploadWidget({
        cloudName: cloudData.cloudUploadName, 
        uploadPreset: cloudData.cloudUploadPreset}, (error, result) => {  
        if (!error && result && result.event === "success") { 
            console.log(result.info.secure_url);
            $("#photo").val(result.info.secure_url);
        }
        }
    )
    
    let widget = document.getElementById("upload_widget")
    if (widget){ 
        widget.addEventListener("click", function(){
        myWidget.open();
    }, false);
    }
});