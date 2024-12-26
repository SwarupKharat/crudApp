const { MongoClient } = require('mongodb');
const prompt = require('prompt-sync')(); // For reading user input in the terminal

const url = "mongodb://localhost:27017";  // MongoDB connection URL
const dbName = "Project111";  // Database name
const collectionName = "stud";  // Collection name

async function createData() {
    const client = new MongoClient(url);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        let rollNo = parseInt(prompt("Enter roll no: "));
        let name = prompt("Enter name: ");
        let marks = prompt("Enter Marks: ");

        const data = { "Roll No": rollNo, "Name": name, "Marks": marks };
        const result = await collection.insertOne(data);
        console.log("Record Inserted", result);
    } finally {
        await client.close();
    }
}

async function show() {
    const client = new MongoClient(url);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const cursor = collection.find();
        await cursor.forEach(doc => console.log(doc));
    } finally {
        await client.close();
    }
}

async function update() {
    const client = new MongoClient(url);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        let rollNo = parseInt(prompt("Enter roll no to Update: "));
        let marks = prompt("Enter Marks: ");
        const result = await collection.updateOne(
            { "Roll No": rollNo },
            { $set: { "Marks": marks } }
        );

        console.log(result.modifiedCount > 0 ? "Record Updated" : "No matching record found to update.");
    } finally {
        await client.close();
    }
}

async function deleteData() {
    const client = new MongoClient(url);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        let rollNo = parseInt(prompt("Enter roll no to Delete: "));
        const result = await collection.deleteOne({ "Roll No": rollNo });
        console.log(result.deletedCount > 0 ? "Record Deleted" : "No matching record found to delete.");
    } finally {
        await client.close();
    }
}

async function mainMenu() {
    while (true) {
        console.log("\nMAIN MENU");
        console.log("1. Insert");
        console.log("2. Update");
        console.log("3. Delete");
        console.log("4. Display");
        console.log("5. Exit");

        let choice = parseInt(prompt("Enter the Choice:"));

        if (choice === 1) {
            await createData();
        } else if (choice === 2) {
            await update();
        } else if (choice === 3) {
            await deleteData();
        } else if (choice === 4) {
            await show();
        } else if (choice === 5) {
            break;
        } else {
            console.log("Oops! Incorrect Choice.");
        }
    }
}

mainMenu();
