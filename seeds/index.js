const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '62ea15b5d1f61981cb444d44',
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
                    url: 'https://res.cloudinary.com/dpb0dc2u0/image/upload/v1659505011/YelpCamp/jggjftqvi7arvczviat4.png',
                    filename: 'YelpCamp/jggjftqvi7arvczviat4'
                },
                {
                    url: 'https://res.cloudinary.com/dpb0dc2u0/image/upload/v1659505012/YelpCamp/l8nwgco37nmzlerd3lga.png',
                    filename: 'YelpCamp/l8nwgco37nmzlerd3lga'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})