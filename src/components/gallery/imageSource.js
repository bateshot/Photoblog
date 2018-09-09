import firebase from 'firebase/app';
import 'firebase/firestore';

function imageSource() {
    const config = {
        projectId: "aaphotography-b504f"
    };
    firebase.initializeApp(config);

    const db = firebase.firestore();

    let images = [];

    db.collection('images').get().then((snapshot) => {
        snapshot.forEach((doc) => {
            images.push({
                id: doc.data().id,
                name: doc.data().name,
                url: doc.data().url,
                thumbFileUrl: doc.data().thumbFileUrl,
                category: doc.data().category,
                description: doc.data().description
            });
        });
    });

    return images;
}

export default imageSource;