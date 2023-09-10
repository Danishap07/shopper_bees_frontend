import { Amplify, Storage } from 'aws-amplify';
import awsconfig from '../../aws-exports';
Amplify.configure(awsconfig);

export async function getImageURI(uri) {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob 
}

export default async function uploadImage(file) {
    console.log(file.uri) 
    const image = await getImageURI(file.uri);
    return Storage.put(file.name, image, {
        level: 'public',
        contentType: file.type,
        progressCallback(uploadProgress){
            console.log("Progress--", uploadProgress.loaded + '/'+ uploadProgress.total)
        }
    })
    .then((res)=> {
        Storage.get(res.key)
        .then((result) => {
            console.log("Result: ", result )
        })
        .catch((err) => {
            console.log(err)
        })
    })
    .catch((err) => {
        console.log(err)
    })
}