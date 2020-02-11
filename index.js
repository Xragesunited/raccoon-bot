const { Client, RichEmbed } = require("discord.js");
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
        const roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;
        switch(cmd){
            case "ping" : 
                const msg = await message.channel.send(":joy: Pinging");
                msg.edit(`:flushed: Returned\nLatency is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}\nAPI Latency ${Math.round(client.ping)}ms `)
            break;
            case "github" :
                message.channel.send("Github page: https://github.com/Xragesunited/raccoon-bot");
            break;
            case "8ball":
                const options = ["It is certain", "Reply hazy, try again", "It is decidedly", "Ask again later", "Without a doubt", "Better not tell you now", "Yes – definitely", "Cannot predict now",
                "You may rely on it", "Concentrate and ask again", "As I see it, yes",	"Don't count on it",	"Most likely", "My reply is no", "Outlook good", "My sources say no", "Yes", "Outlook not so good",	
                "Signs point to yes", "Very doubtful"];
                const question = args.join(" ");

                if(question == ""){ 
                    message.channel.send("No question has been asked :thinking:??");
                    return;
                }
                if(!question.endsWith("?")){
                    message.channel.send("This does not look like an question to me :angry:");
                    return;
                }
                const answer = options[Math.floor(Math.random() * options.length)];

                const embed = new RichEmbed()
                .setColor(roleColor)
                .setDescription(`You asked:\n${question}\n:8ball:\nMy answer?\n${answer}`)
                .setAuthor(client.user.username, client.user.displayAvatarURL)
                .setTimestamp();
                
                message.channel.send(embed);
            break;
            case "say":
                if(message.deletable) message.delete();
                if(args.length < 1) return message.reply("i have nothing to say?").then(m => m.delete(3500));
                
                

                if(args[0].toLowerCase() === "embed"){
                    const embed = new RichEmbed().setColor(roleColor).setDescription(args.slice(1).join(" ")).setTimestamp()
                    .setImage(client.user.displayAvatarURL)
                    .setAuthor(message.author.username, message.author.displayAvatarURL)
                    .setFooter(client.user.username, client.user.displayAvatarURL);

                    message.channel.send(embed);
                }else{
                    message.channel.send(args.slice(0).join(" "));
                }

            break;
            default:
                message.channel.send(":pensive: Could not recongnize that command");
            break;
        }

    });
client.login(process.env.TOKEN);



