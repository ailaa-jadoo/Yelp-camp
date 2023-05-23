const mongoose = require('mongoose');
const cities = require('./cities');
const images = require('./images');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb+srv://Jado0o0o:9871303646@cluster0.9uasfml.mongodb.net/?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 100; i++) {
        const random1000 = Math.floor(Math.random() * 406);
        const random9 = Math.floor(Math.random() * 6);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '62ef52349dd8b02f10df9a6d',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [cities[random1000].longitude,
                cities[random1000].latitude]
            },
            images: [
                {
                    url: images[random9].url,
                    filename: images[random9].filename
                },
                {
                    url: 'https://res.cloudinary.com/dpb0dc2u0/image/upload/v1660405466/YelpCamp/qqfyn5tktprtji5lmvyu.jpg',
                    filename: 'YelpCamp/qqfyn5tktprtji5lmvyu'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
