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
                alert(err.message);
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
