MONGO_URI='mongodb+srv://pepe3:Micheal123@cluster0.h0ojrix.mongodb.net/'

const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


  const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number },
    favoriteFoods: { type: [String] }
  });
  
  const Person = mongoose.model('Person', personSchema);
  
  // Creating and saving a record

  const person = new Person({
    name: 'Mary',
    age: 30,
    favoriteFoods: ['pizza', 'sushi']
  });
  
  person.save(function(err, data) {
    if (err) {
      console.error('Error saving person:', err);
    } else {
      console.log('Person saved:', data);
    }
  });

  
  // Create Many Records
  const arrayOfPeople = [
    { name: 'Barbara', age: 25, favoriteFoods: ['meat'] },
    { name: 'Charles', age: 35, favoriteFoods: ['potato', 'salmon'] },
    { name: 'Daniel', age: 40, favoriteFoods: ['spaghetti'] }
  ];
  
  Person.create(arrayOfPeople, function(err, data) {
    if (err) {
      console.error('Error creating people:', err);
    } else {
      console.log('People created:', data);
    }
  });

  
  // Find All Documents with a Given Name
  Person.find({ name: 'Mary' }, function(err, data) {
    if (err) {
      console.error('Error finding people by name:', err);
    } else {
      console.log('People found:', data);
    }
  });
  

  // Find One Document with a Certain Food
  Person.findQne({ favouriteFoods: 'meat' }, function(err, data) {
    if (err) {
      console.error('Error finding person by food:', err);
    } else {
      console.log('Person found:', data);
    }
  });


// Find document by ID

  const personId = 'some-valid-id';

Person.findById(personId, function(err, data) {
  if (err) {
    console.error('Error finding person by ID:', err);
  } else {
    console.log('Person found by ID:', data);
  }
});

// Perform Classic Updates

Person.findById(personId, function(err, person) {
  if (err) {
    console.error('Error finding person:', err);
  } else {
    person.favoriteFoods.push('hamburger');
    person.markModified('favoriteFoods');
    person.save(function(err, updatedPerson) {
      if (err) {
        console.error('Error saving updated person:', err);
      } else {
        console.log('Updated person:', updatedPerson);
      }
    });
  }
});


// New Updates Using findOneAndUpdate
const personName = 'Mary';

Person.findOneAndUpdate(
  { name: personName },
  { age: 20 },
  { new: true }, // Return the updated document
  function(err, updatedPerson) {
    if (err) {
      console.error('Error updating person:', err);
    } else {
      console.log('Updated person:', updatedPerson);
    }
  }
);


// Delete One Document Using findByIdAndRemove

Person.findByIdAndRemove(personId, function(err, removedPerson) {
  if (err) {
    console.error('Error removing person:', err);
  } else {
    console.log('Removed person:', removedPerson);
  }
});

// Delete Many Document
Person.remove({ name: 'Mary' }, function(err, result) {
  if (err) {
    console.error('Error removing people:', err);
  } else {
    console.log('Result of remove:', result);
  }
});


// Chain Search Query Helpers
Person.find({ favoriteFoods: 'spaghetti' })
  .sort({ name: 1 })
  .limit(2)
  .select('-age')
  .exec(function(err, data) {
    if (err) {
      console.error('Error finding and sorting people:', err);
    } else {
      console.log('Found people:', data);
    }
  });
