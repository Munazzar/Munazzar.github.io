function sideBar(){

    var second=document.getElementById("second");
    var sidebar2=document.getElementById("mySidebar");
    if(second.classList.contains("second2")){
      second.classList.remove("second2");
      sidebar2.classList.remove("sidebar2");
    
    }
    else{
      second.classList.add("second2");
      sidebar2.classList.add("sidebar2");
    }
    }
    

    console.log(document.cookie);


if(window.XMLHttpRequest)
				{
					obj=new XMLHttpRequest();
				}
				else
				{
					obj=new ActiveXObject('Microsoft.XMLHTTP');
				}
				obj.open("GET","https://pea-green-mountain.000webhostapp.com/apicall.php",true);
				obj.send();
				obj.onreadystatechange=function()
				{
				if(obj.readyState==4 && obj.status==200)
				{
					value=obj.responseText;
                    op=JSON.stringify(JSON.parse(value),null,2)
                    // console.log(op);
                    document.getElementById("api_output").innerHTML=op;


                }
                }

                function banner(){
                    var banner = document.getElementById("banner");
                    
                    if(banner.classList.contains("banner-show")){
                      banner.classList.remove("banner-show");
                      banner.classList.add("banner-hide");
                      document.getElementById('apply-now').style.display="none";
                      document.getElementById('banner-txt').style.display="none";
                      document.getElementById('banner-hdr').style.display="none";
                      document.getElementById('nav-bar').style.display="none"
                      document.getElementById('banner-sh').style.transform="rotate(180deg)";
                    }
                    else{
                      banner.classList.remove("banner-hide");
                      banner.classList.add("banner-show");
                      document.getElementById('apply-now').style.display="block";
                      document.getElementById('banner-txt').style.display="block";
                      document.getElementById('banner-hdr').style.display="block";
                      document.getElementById('nav-bar').style.display="block";
                      document.getElementById('banner-sh').style.transform="rotate(360deg)";
                    }
                    }

                    function salary(){
                        range=document.getElementById("ann-inc").value;
                        document.getElementById("rangeval").innerHTML=range;
                    }
                        

                    function formNow(){
                      var form_now = document.getElementById("form-now");
                      if(form_now.classList.contains("show")){
                       form_now.classList.remove("show");
                      
                       
                           form_now.classList.add("hide-now");
                      
                       
                       
                      }
                      else{
                       form_now.classList.add("show");
                       form_now.classList.remove("hide-now");
                      
                      }
                   }

                 function firstform(){
                  var cookies = document.cookie.split(";");

                  for (var i = 0; i < cookies.length; i++) {
                      var cookie = cookies[i];
                      var eqPos = cookie.indexOf("=");
                      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
                  }
                  var firstform=document.getElementById("firstform");
                    var formlen =firstform.elements.length;
                    console.log(formlen);
                    var str=""
                    for(i=0;i<formlen;i++){
                      if(firstform.elements[i].value==""){
                        document.getElementById("alert_box").style.display="block";
                        window.adobeDataLayer.push({
                          "event":"applicationError",
                          "_spnam": {
                          "formDetails": {
                              "form": {
                                      "type":"application-form",
                                      "name":"creditcard-application-form"
                                               },
                              "formStep": {
                                      "name":"personal-details",
                                      "number":"1"
                                               },
                              "product": [ {
                                      "category":"creditcard",
                                      "name":"cashback-creditcard"
                                               } ]
                                        },
                              "errorInfo": [ {
                                  "type":"form-fieldvalidation-error",
                                  "fieldName":"last-name",
                                  "message":"last name cannot be empty",
                              "errors": {
                                                  "value":1
                                               }
                                  } ]    
                          }
                          });
                        document.getElementById(firstform.elements[i].id).focus();


                     

                        return 
                      }
                      document.cookie=firstform.elements[i].id+"="+firstform.elements[i].value+";";
                     
                    }
                    document.getElementById("alert_box").style.display="none";
                    window.location.href="secondpage.html";
                    
                   
                    

                   }

                   function secondform(){
              
                    var firstform=document.getElementById("secondform");
                      var formlen =firstform.elements.length;
                      console.log(formlen);
                      var str=""
                      for(i=0;i<formlen;i++){
                        
                        if(firstform.elements[i].type=="button"){
                          continue;
                          
                        }

                        if(firstform.elements[i].value==""){
                          document.getElementById("alert_box").style.display="block";
                          console.log(firstform.elements[i].type)
                          window.adobeDataLayer.push({
                            "event":"applicationError",
                            "_spnam": {
                            "formDetails": {
                                "form": {
                                        "type":"application-form",
                                        "name":"creditcard-application-form"
                                                 },
                                "formStep": {
                                        "name":"personal-details",
                                        "number":"1"
                                                 },
                                "product": [ {
                                        "category":"creditcard",
                                        "name":"cashback-creditcard"
                                                 } ]
                                          },
                                "errorInfo": [ {
                                    "type":"form-fieldvalidation-error",
                                    "fieldName":"last-name",
                                    "message":"last name cannot be empty",
                                "errors": {
                                                    "value":1
                                                 }
                                    } ]    
                            }
                            });
                          document.getElementById(firstform.elements[i].id).focus();




                          
                          return 
                        }
                        document.cookie=firstform.elements[i].name+"="+firstform.elements[i].value+";";
                       
                      }
                      
                      document.getElementById("alert_box").style.display="none";
                      window.location.href="thirdpage.html";
                     
                      
  
                     }

                     function thirdform(){
              
                      var firstform=document.getElementById("thirdform");
                        var formlen =firstform.elements.length;
                        console.log(formlen);
                        var str=""
                        for(i=0;i<formlen;i++){
                          if(firstform.elements[i].value==""){
                            console.log(firstform.elements[i].type);
                            document.getElementById("alert_box").style.display="block";

                            window.adobeDataLayer.push({
                              "event":"applicationError",
                              "_spnam": {
                              "formDetails": {
                                  "form": {
                                          "type":"application-form",
                                          "name":"creditcard-application-form"
                                                   },
                                  "formStep": {
                                          "name":"personal-details",
                                          "number":"1"
                                                   },
                                  "product": [ {
                                          "category":"creditcard",
                                          "name":"cashback-creditcard"
                                                   } ]
                                            },
                                  "errorInfo": [ {
                                      "type":"form-fieldvalidation-error",
                                      "fieldName":"last-name",
                                      "message":"last name cannot be empty",
                                  "errors": {
                                                      "value":1
                                                   }
                                      } ]    
                              }
                              });


                            document.getElementById(firstform.elements[i].id).focus();
                            return 
                          }
                          document.cookie=firstform.elements[i].name+"="+firstform.elements[i].value+";";
                         
                        }
                        
                        document.getElementById("alert_box").style.display="none";
                        window.location.href="fifthpage.html";
                       
                        
    
                       }

                       function collectData(){

                        var finalform=document.getElementById("finalform");
                                            var formlen =finalform.elements.length;
                                            console.log(formlen);
                                            var str=""
                                            for(i=0;i<formlen;i++){
                                              
                                              if(finalform.elements[i].type=="button" || finalform.elements[i].type=="submit"){
                                                continue;
                                                
                                              }
                                              console.log(finalform.elements[i].type);
                                              if(finalform.elements[i].type=="checkbox"){
                                                  if(finalform.elements[i].checked==false){
                                                    console.log(finalform.elements[i].type);
                                                    document.getElementById("alert_box").style.display="block";


                                                    window.adobeDataLayer.push({
                                                      "event":"applicationError",
                                                      "_spnam": {
                                                      "formDetails": {
                                                          "form": {
                                                                  "type":"application-form",
                                                                  "name":"creditcard-application-form"
                                                                           },
                                                          "formStep": {
                                                                  "name":"personal-details",
                                                                  "number":"1"
                                                                           },
                                                          "product": [ {
                                                                  "category":"creditcard",
                                                                  "name":"cashback-creditcard"
                                                                           } ]
                                                                    },
                                                          "errorInfo": [ {
                                                              "type":"form-fieldvalidation-error",
                                                              "fieldName":"last-name",
                                                              "message":"last name cannot be empty",
                                                          "errors": {
                                                                              "value":1
                                                                           }
                                                              } ]    
                                                      }
                                                      });

                                                    document.getElementById(finalform.elements[i].id).focus();
                                                    return 
                                                  }
                                              }
                                              else if(finalform.elements[i].value==""){
                                                console.log(finalform.elements[i].type);
                                                document.getElementById("alert_box").style.display="block";


                                                window.adobeDataLayer.push({
                                                  "event":"applicationError",
                                                  "_spnam": {
                                                  "formDetails": {
                                                      "form": {
                                                              "type":"application-form",
                                                              "name":"creditcard-application-form"
                                                                       },
                                                      "formStep": {
                                                              "name":"personal-details",
                                                              "number":"1"
                                                                       },
                                                      "product": [ {
                                                              "category":"creditcard",
                                                              "name":"cashback-creditcard"
                                                                       } ]
                                                                },
                                                      "errorInfo": [ {
                                                          "type":"form-fieldvalidation-error",
                                                          "fieldName":"last-name",
                                                          "message":"last name cannot be empty",
                                                      "errors": {
                                                                          "value":1
                                                                       }
                                                          } ]    
                                                  }
                                                  });
                                                  
                                                document.getElementById(finalform.elements[i].id).focus();
                                                return 
                                              }
                                              document.cookie=finalform.elements[i].name+"="+finalform.elements[i].value+";";
                                             
                                            }
                                            
                                            document.getElementById("alert_box").style.display="none";
                                            window.location.href="thankyou.html";
                    
                    
                    }

                  