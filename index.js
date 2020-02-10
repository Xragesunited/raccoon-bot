const { Client } = require("discord.js");
const { config } = require("dotenv");

const client = new Client({
    disableEveryone: true
});

config({
    path: __dirname + "/.env"
});

client.on("ready", () =>{
    console.log(`I'm now online, my name is ${client.user.username}`);
    client.user.setPresence({
        status: "online",
        game: {
            name: "In developed raccoon bot",
            type: "WATCHING"
        }
    })
});
client.on("message", async message => {
        const prefix = "^";
        if(message.author.bot) return;
        if(!message.guild) return;
        if(!message.content.startsWith(prefix)) return;
        
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
        
        switch(cmd){
            case "ping" : 
                const msg = await message.channel.send(":joy: Pinging");
                msg.edit(`:flushed: Returned\nLatency is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}\nAPI Latency ${Math.round(client.ping)}ms `)
            break;
            case "github" :
                message.channel.send("this bot is hosted on: ")
            break;
            default:
                message.channel.send(":pensive: Could not recongnize that command");
                // msg.edit(`:flushed: Returned\nLatency is `)
            break;
        }

    });
client.login(process.env.TOKEN);



