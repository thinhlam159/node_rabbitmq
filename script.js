let myImage = document.querySelector('.my-img')
let myVideo = document.querySelector('#my_video')

fetch('http://localhost:8080/get_image/suni')
    .then(response => {
        // console.log(response.bodyUsed);
        var res = response.blob();
        console.log(res + 'suni');
        return res;
    })
    .then(function(response) {
        var objectURL = URL.createObjectURL(response);
        myImage.src = objectURL;
        console.log(objectURL)
});

// fetch('http://localhost:8080/lyly')
//     .then(response => {
//         console.log(response.body)
//         console.log(response.bodyUsed);
//         var res = response.blob();
//         console.log(response.bodyUsed);
//         return res;
//     })
//     .then(function(response) {
//         var objectURL = URL.createObjectURL(response);
//         myVideo.src = objectURL;
//         console.log(objectURL)
//     })
//     .catch(error => {console.log(error)})

    // const myMessage = 'hello thinh'

    // const b64 = btoa(myMessage)

    // console.log(b64)
    // const config = {
    //     headers: {
    //       "Access-Control-Allow-Origin": "*",
    //       "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    //     }
    // }
    // const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
    //     const byteCharacters = atob(b64Data);
    //     const byteArrays = [];

    //     for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    //         const slice = byteCharacters.slice(offset, offset + sliceSize);

    //         const byteNumbers = new Array(slice.length);
    //         for (let i = 0; i < slice.length; i++) {
    //             byteNumbers[i] = slice.charCodeAt(i);
    //         }

    //         const byteArray = new Uint8Array(byteNumbers);
    //         byteArrays.push(byteArray);
    //     }

    //     const blob = new Blob(byteArrays, {type: contentType});
    //     return blob;
    // };

    // const getURLImage = (stringImage64) => {
    //     const contentType = 'image/jpeg';
    //     const blob = b64toBlob(stringImage64, contentType);
    //     // return URL.createObjectURL(blob);
    //     return window.webkitURL.createObjectURL(blob);
    // }
fetch('http://localhost:8080/data')
    // .then(res=> res.body)
    .then(data => {
        var res = data.blob();
        console.log(res);
        return res;
    })
    .then(function(response) {
                var objectURL = URL.createObjectURL(response);
                myVideo.src = objectURL;
                console.log(objectURL)
    })
    .catch(error => {console.log(error)})