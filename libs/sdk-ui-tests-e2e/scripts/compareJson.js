// import * as fs from 'fs';
// let file1 = fs.readFileSync('test1.txt');
// let json1 = JSON.parse(file1);
//
// let file2 = fs.readFileSync('test2.txt');
// let json2 = JSON.parse(file2);
//
// if (json1.items.length == json2.items.length) {
//     for (let i=0; i< json1.items.length; i++) {
//         if (JSON.stringify(json1.items[i]) !== JSON.stringify(json2.items[i])) {
//             console.log("Object: " + i + " is different. Needed deep tracking !!! \n")
//             if (JSON.stringify(json1.items[i].displayForms) !== JSON.stringify(json2.items[i].displayForms) ) {
//                 console.log( "***Checking displayForms")
//                 if (!compareObject(json1.items[i].displayForms, json2.items[i].displayForms)) {
//                     throw new Error("--->DisplayForms does not match !");
//                 }
//             }
//
//             if (JSON.stringify(json1.items[i].attribute) !== JSON.stringify(json2.items[i].attribute) ) {
//                 console.log( "***Checking attribute displayForms")
//                 if (!compareObject(json1.items[i].attribute.displayForms, json2.items[i].attribute.displayForms)) {
//                     throw new Error("--->Attribute displayForms does not match !")
//                 }
//             }
//         } else {
//             console.log("Object: " + i + " are the same between 2 files \n")
//         }
//     }
// } else {
//     throw new Error("--->Request response miss match")
// }
//
// function compareObject(object1, object2) {
//     const numOfDisplayForm = object1.length;
//     console.log("numOfDisplayForm: " + numOfDisplayForm);
//     let resultMatch = 0;
//     for (let i=0; i < numOfDisplayForm; i++) {
//         for (let j=0; j < numOfDisplayForm; j++) {
//             if (JSON.stringify(object1[i]) === JSON.stringify(object2[j])) {
//                 resultMatch +=1;
//             }
//         }
//     }
//     return (resultMatch === numOfDisplayForm);
// }
//

// import * as fs from 'fs';
// let file1 = fs.readFileSync('test1.txt');
// let json1 = JSON.parse(file1);
//
// let file2 = fs.readFileSync('test2.txt');
// let json2 = JSON.parse(file2);
//
// function sortObject(json) {
//     for (let i=0; i< json.items.length; i++) {
//         const formCheck = json.items[i]?.displayForms;
//         if (formCheck) {
//             json.items[i].displayForms.sort((a, b) => a.id.localeCompare(b.id));
//         }
//         const attCheck = json.items[i]?.attribute?.displayForms;
//         if (attCheck) {
//             json.items[i].attribute.displayForms.sort((a, b) => a.id.localeCompare(b.id));
//         }
//     }
//     return json;
// }
//
// if (JSON.stringify(sortObject(json1)) !== JSON.stringify(sortObject(json2))) {
//     throw new Error("--->Request response miss match")
// }


// import * as fs from 'fs';
// let file1 = fs.readFileSync('test1.txt');
// let json1 = JSON.parse(file1);
//
// let file2 = fs.readFileSync('test2.txt');
// let json2 = JSON.parse(file2);
//
// function sortObject(json) {
//     for (let i=0; i< json.items.length; i++) {
//         const currentObject = json.items[i];
//         for (const [objectKeys, objectValues] of Object.entries(currentObject)) {
//             sortById(currentObject, objectKeys, objectValues)
//             if (objectKeys === "attribute") {
//                 for (const [keys, values] of Object.entries(currentObject["attribute"])) {
//                     sortById(currentObject["attribute"], keys, values)
//                 }
//             }
//         }
//     }
//     return json;
// }
//
// function sortById(object, key, value) {
//     if (value.length >= 2 && Array.isArray(value)) {
//         if (Object.keys(object[key][0]).includes("id")) {
//             object[key].sort((a, b) => a.id.localeCompare(b.id));
//         }
//     }
// }
//
// if (JSON.stringify(sortObject(json1)) !== JSON.stringify(sortObject(json2))) {
//     throw new Error("--->Request response miss match");
// }


import * as fs from 'fs';
let file1 = fs.readFileSync('test1.txt');
let json1 = JSON.parse(file1);

let file2 = fs.readFileSync('test2.txt');
let json2 = JSON.parse(file2);

function sortObject(json) {
    for (let i=0; i< json.items.length; i++) {
        const currentObject = json.items[i];
        for (const [objectKeys, objectValues] of Object.entries(currentObject)) {
            sortById(currentObject, objectKeys, objectValues)
            if (typeof objectValues === "object" && !Array.isArray(objectValues)) {
                for (const [keys, values] of Object.entries(currentObject[objectKeys])) {
                    sortById(currentObject[objectKeys], keys, values)
                }
            }
        }
    }
    return json;
}

function sortById(object, key, value) {
    if (value.length >= 2 && Array.isArray(value)) {
        if (Object.keys(object[key][0]).includes("id")) {
            object[key].sort((a, b) => a.id.localeCompare(b.id));
        }
    }
}

if (JSON.stringify(sortObject(json1)) !== JSON.stringify(sortObject(json2))) {
    throw new Error("--->Request response miss match");
}