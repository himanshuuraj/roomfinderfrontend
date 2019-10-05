import * as Api from "./api";
import {AsyncStorage} from 'react-native';

export let getApiCall = (url) => {
    return fetch(url, {
         method: 'GET'
      })
      .then((response) => response.json(), err => {
          console.log(err);
          return err;
      })
      .then((responseJson) => {
         console.log(responseJson);
         return responseJson;
      })
      .catch((error) => {
         console.error(error);
         return error;
      });
}

export let postApiCall = (url, bodyObj) => {
    //console.log("REQUEST", bodyObj);
    return fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyObj),
            }).then((response) => response.json(), 
            err => {
                console.log("ERR", err);
                // alert(err.message);
                return err;
            })
            .then((responseJson) => {
                return responseJson;
            })
            .catch((error) => {
                console.error("ERROR",error);
                return error;
            });
}

export let putApiCall = (url, bodyObj) => {
    //console.log("REQUEST", bodyObj);
    return fetch(url, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyObj),
            }).then((response) => response.json(), 
            err => {
                console.log("ERR", err);
                // alert(err.message);
                return err;
            })
            .then((responseJson) => {
                return responseJson;
            })
            .catch((error) => {
                console.error("ERROR",error);
                return error;
            });
}

export let deleteApiCall = (url) => {
    return fetch(url, {
        method: 'DELETE'
     })
     .then((response) => response.json(), err => {
         console.log(err);
         return err;
     })
     .then((responseJson) => {
        console.log(responseJson);
        return responseJson;
     })
     .catch((error) => {
        console.error(error);
        return error;
     });
}

export let uploadOnAWSRequest = (bodyObj) => {
    let url = Api.apiToUploadIntoAWS;
    let promise = new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if(this.status == 200){
                    if(this.responseText){
                        let message = this.responseText;
                        resolve(JSON.parse(message));
                    }
                }else{
                    reject("ERROR");
                }
            }
        });
        xhr.open("POST", url);
        xhr.onerror = function () { 
            reject("XHR ERROR"); 
        }; 
        xhr.send(bodyObj);
    });
    return promise;

    // return fetch(url, {
    //     method: 'POST',
    //     headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'multipart/form-data',
    //     },
    //     body: JSON.stringify(bodyObj),
    //     }).then((response) => response.json(), 
    //     err => {
    //         console.log("ERR", err);
    //         alert(err.message);
    //         return err;
    //     })
    //     .then((responseJson) => {
    //         return responseJson;
    //     })
    //     .catch((error) => {
    //         console.error("ERROR",error);
    //         return error;
    //     });
    
}