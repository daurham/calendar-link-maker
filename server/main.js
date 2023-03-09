import { Meteor } from 'meteor/meteor';

Meteor.methods({
  log: (dateTime) => {
    console.log(dateTime);
  },
});

Meteor.startup(async () => {

});
