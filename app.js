const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();
const delay = 120000;
let lastMessage;

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
  //only respond to specific user
  if (msg.author.id !== "671139719127498794") return;

  //get current time
  let now = new Date().getTime();

  //only respond if previous message does not exist or time elapsed is greater than "delay"
  if (!lastMessage || now - lastMessage >= delay) {
    if (msg.content.length <= 150) {
      const messageArr = msg.content.toLowerCase().split(" ");

      fs.readFile("dictionary.json", (errDict, dataDict) => {
        if (errDict) throw errDict;

        const dictionary = JSON.parse(dataDict);

        let responseCategory = "";

        for (let i = 0; i < messageArr.length; i++) {
          for (let category in dictionary) {
            if (dictionary[category].indexOf(messageArr[i]) !== -1) {
              responseCategory = category;
              break;
            }
          }

          if (responseCategory) break;
        }

        fs.readFile("quotes.json", (errQuotes, dataQuotes) => {
          if (errQuotes) throw errQuotes;

          const quotes = JSON.parse(dataQuotes);
          let rng;

          switch (responseCategory) {
            case "greeting":
              rng = Math.floor(Math.random() * quotes.greeting.length);
              msg.channel.send(quotes.greeting[rng]);
              break;
            case "salutation":
              rng = Math.floor(Math.random() * quotes.salutation.length);
              msg.channel.send(quotes.salutation[rng]);
              break;
            case "violent":
              rng = Math.floor(Math.random() * quotes.violent.length);
              msg.channel.send(quotes.violent[rng]);
              break;
            case "nice":
              rng = Math.floor(Math.random() * quotes.nice.length);
              msg.channel.send(quotes.nice[rng]);
              break;
            case "random":
              rng = Math.floor(Math.random() * quotes.random.length);
              msg.channel.send(quotes.random[rng]);
              break;
            case "jim":
              rng = Math.floor(Math.random() * quotes.jim.length);
              msg.channel.send(quotes.jim[rng]);
              break;
          }
        });
      });
    } else {
      msg.channel.send("TLDR");
    }

    //record time when message was sent
    lastMessage = new Date().getTime();
  }
});

client.login("haha token go brrr");
