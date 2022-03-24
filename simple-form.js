var button_text = "";
    var success_text = "";
    var empty_text = "";
      
  
        document.getElementsByClassName("feedback_active")[0].innerHTML += ('<div class="form" id="zek-feedback-form"><form><div class="form-group"><textarea name="message" id="" cols="30" rows="10" placeholder=""></textarea></div><button type="submit" class="btn-feedback-form"></button></form></div>');
		
            if(document.documentElement.lang=="tr")
        {
    	document.getElementsByName("message")[0].placeholder = "Bu makale ile alakalı aklında başka soru var mı? Buraya yaz, ekleyelim.";
            document.getElementsByClassName("btn-feedback-form")[0].innerText = "Gönder";
            success_text = "Tesekkurler";
                empty_text="Mesajini yaz";
            success_placeholder="Mesajin iletildi.";
            failed_placeholder="Sayfayi yenileyip tekrar dener misin?";
        }else{
            document.getElementsByName("message")[0].placeholder =  "Do you have any other questions about this article? Write it here and we willl add it.";
            document.getElementsByClassName("btn-feedback-form")[0].innerText = "Send";
                        success_text = "Thank you";
                empty_text="Fill the form";
                        success_placeholder="We got your message";
            failed_placeholder="There should be a problem. Could you reload the page and try again?";
        }
    
    
    
    document.addEventListener('DOMContentLoaded', function () {
    const form  = document.getElementById('zek-feedback-form');
form.addEventListener('submit', (event) => {
    // stop form submission
    event.preventDefault();
    if (document.getElementsByName("message")[0].value.length != 0) {
    console.log("Message is empty");
        var url = "https://api.airtable.com/v0/appX1IQidFmeenim8/Content%20Feedback";

            var xhr = new XMLHttpRequest();
            xhr.open("POST", url);

            xhr.setRequestHeader("Authorization", "Bearer keyzOiIxJJ1NFfOTQ");
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    console.log(xhr.status);
                    console.log(xhr.responseText);
                }
            };

            var data = `{
                      "records": [
                        {
                          "fields": {
                            "Blog": "${location.hostname.replace("www.","")}",
                            "Feedback": "${document.getElementsByName("message")[0].value}",
                            "URL": "${document.URL}"
                          }
                        }
                      ]
                    }`;

            xhr.send(data);
            
			document.getElementsByName("message")[0].value = "";
        document.getElementsByName("message")[0].placeholder = success_placeholder;
        document.getElementsByClassName("btn-feedback-form")[0].innerText= success_text;
    }else {
    document.getElementsByClassName("btn-feedback-form")[0].innerText= empty_text;
    }
});
    });
