const mongoose = require("mongoose");
const Event = require("./models/Event");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://niketdeshmukh2002:mytechfest@cluster0.nyirc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
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
      event_description: "A grand technology festival with workshops, tech talks, and more!",
      event_image: "/competitons/c1.jpeg",
      registered_users: ["1234567890", "0987654321"],
    },
    {
      event_id: "2",
      event_name: "Hackathon",
      event_description: "A 24-hour coding competition to build innovative solutions.",
      event_image: "/competitons/c2.jpeg",
      registered_users: ["5551234567", "5557654321"],
    },
    {
      event_id: "3",
      event_name: "Robotics Workshop",
      event_description: "Learn the basics of robotics and build your own robot.",
      event_image: "/competitons/c3.jpeg",
      registered_users: ["1111111111", "2222222222"],
    },
    {
      event_id: "4",
      event_name: "AI Conference",
      event_description: "A conference on the latest advancements in artificial intelligence.",
      event_image: "/competitons/c4.jpeg",
      registered_users: ["3333333333", "4444444444"],
    },
    {
      event_id: "5",
      event_name: "Cybersecurity Seminar",
      event_description: "Learn about the latest trends in cybersecurity.",
      event_image: "/competitons/c5.jpeg",
      registered_users: ["5555555555", "6666666666"],
    },
    {
      event_id: "6",
      event_name: "Blockchain Symposium",
      event_description: "Explore the world of blockchain technology.",
      event_image: "/competitons/c6.jpeg",
      registered_users: ["7777777777", "8888888888"],
    },
    {
      event_id: "7",
      event_name: "IoT Expo",
      event_description: "Discover the latest innovations in the Internet of Things.",
      event_image: "/competitons/c7.jpeg",
      registered_users: ["9999999999", "0000000000"],
    },
    {
      event_id: "8",
      event_name: "Data Science Bootcamp",
      event_description: "A bootcamp to learn data science from scratch.",
      event_image: "/competitons/c8.jpeg",
      registered_users: ["1212121212", "3434343434"],
    },
    {
      event_id: "9",
      event_name: "AR/VR Workshop",
      event_description: "Hands-on workshop on augmented and virtual reality.",
      event_image: "/competitons/c9.jpeg",
      registered_users: ["5656565656", "7878787878"],
    },
    {
      event_id: "10",
      event_name: "Quantum Computing Talk",
      event_description: "An introduction to the world of quantum computing.",
      event_image: "/competitons/c10.jpeg",
      registered_users: ["9090909090", "1010101010"],
    },
    {
      event_id: "11",
      event_name: "Game Development Workshop",
      event_description: "Learn the basics of game development.",
      event_image: "/competitons/c11.jpeg",
      registered_users: ["1112131415", "1617181920"],
    },
    {
      event_id: "12",
      event_name: "Ethical Hacking Workshop",
      event_description: "Learn the techniques of ethical hacking.",
      event_image: "/competitons/c12.jpeg",
      registered_users: ["2122232425", "2627282930"],
    },
  ];

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