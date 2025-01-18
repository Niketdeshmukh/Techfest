const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Event = require("./models/Event");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  await connectDB();

  const events = [
    {
      event_id: "1",
      event_name: "TechFest 2024",
      event_description: "Dive in wonderland with cool workshops, inspiring talks, and endless innovation! 🚀",
      event_image: "/events/techfest.jpeg",
      registered_users: ["1234567890", "0987654321"],
    },
    {
      event_id: "2",
      event_name: "Hackathon",
      event_description: "⚡ Code, compete, and create in this epic 24-hour hack fest! 💻🔥",
      event_image: "/competitons/c1.jpeg",
      registered_users: ["5551234567", "5557654321"],
    },
    {
      event_id: "3",
      event_name: "Robotics Challenge",
      event_description: "🤖 Build bots and unleash your robotics wizardry! Gear up for some robotic fun! ⚙️✨",
      event_image: "/events/robotics.jpg",
      registered_users: ["1111111111", "2222222222"],
    },
    {
      event_id: "4",
      event_name: "Basketball Tournament",
      event_description: "🏀 Slam dunk your way to victory in this high-energy basketball showdown! 🏆🔥",
      event_image: "/events/basketball.jpg",
      registered_users: ["3333333333", "4444444444"],
    },
    {
      event_id: "5",
      event_name: "Treasure Hunt",
      event_description: "🗺️ Gather your crew and uncover hidden treasures in this thrilling adventure! 🪙✨",
      event_image: "/events/hackathon.jpg",
      registered_users: ["5555555555", "6666666666"],
    },
    {
      event_id: "6",
      event_name: "Tug of War",
      event_description: "💪 Team up and pull for glory in this classic test of strength and strategy! 🔥",
      event_image: "/events/tugofwar.jpg",
      registered_users: ["7777777777", "8888888888"],
    },
    {
      event_id: "7",
      event_name: "DJ Night",
      event_description: "🎶 Groove to electrifying beats and party like never before under the stars! ✨🎧",
      event_image: "/competitons/c2.jpeg",
      registered_users: ["9999999999", "0000000000"],
    },
    {
      event_id: "8",
      event_name: "Game Competition",
      event_description: "🎮 Compete with gamers and level up your skills in this action-packed showdown! 🔥🏆",
      event_image: "/events/gamedev.jpg",
      registered_users: ["1212121212", "3434343434"],
    },
    {
      event_id: "9",
      event_name: "AR/VR Experience",
      event_description: "🌐 Step into immersive worlds and explore the future with AR/VR magic! 🚀🤩",
      event_image: "/events/ARVR.jpg",
      registered_users: ["5656565656", "7878787878"],
    },
    {
      event_id: "10",
      event_name: "Quantum Computing Talk",
      event_description: "🧠 Unlock the mysteries of quantum computing in this mind-bending talk! 🌌✨",
      event_image: "/events/QuantumTalk.jpg",
      registered_users: ["9090909090", "1010101010"],
    },
    {
      event_id: "11",
      event_name: "Chess Tournament",
      event_description: "♟️ Show off your strategy skills and checkmate your opponents in style! 🏆🔥",
      event_image: "/events/chess.jpg",
      registered_users: ["1112131415", "1617181920"],
    },
    {
      event_id: "12",
      event_name: "Carrom Competition",
      event_description: "🎯 Aim, strike, and pocket your way to victory in this classic carrom clash! ✨🔥",
      event_image: "/events/carrom.jpg",
      registered_users: ["2122232425", "2627282930"],
    },
  ]
  

  try {
    await Event.deleteMany({});
    await Event.insertMany(events);
    console.log("Data successfully seeded");
    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error.message);
    process.exit(1);
  }
};

seedData();