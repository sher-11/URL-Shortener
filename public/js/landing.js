
$(document).ready(() => {
    $("#submitOriginalurl").on('click', () =>{ 
    	$.post("/url-shortener", {
        "originalurl" : $("#original_url").val(),
        }, (data) =>{
        if(data){
        console.log(data)
        window.location.reload();
    	}else{
        console.log(error)
        }
    	})
	})
})
