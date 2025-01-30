require('dotenv').config(); //initialize dotenv
const Discord = require('discord.js'); //import discord.js

const Permissions = require('discord.js');
const bot = new Discord.Client(intents = 536946832); //create new client


bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);

});


// bot.on('message', function (user, userID, channelID, message, evt) {

//     // Our bot needs to know if it will execute a command

//     // It will listen for messages that will start with `!`

//     var confirming = 0;

//     var channelList = [];

//     if (message.substring(0, 1) == '!') {

//         var args = message.substring(1).split(' ');

//         var cmd = args[0];


//         args = args.splice(1);

//         switch(message) {

//             // !ping

//             case 'archive':

//                 bot.sendMessage({

//                     to: channelID,

//                     message: 'Are you sure? (type !confirm to continue)'

//                 });

//                 confirm = 1;

//             break;

//             case 'confirm':
//                 if(confirm == 1){
                    
//                 }
//                 break;

//             case 'add':
//                 break;


//             // Just add any case commands if you want to..

//         }

//     }
// });
var confirm = 0;

var channelList = {};


bot.on('messageCreate', msg => {;
    if(!msg.author.bot){
        console.log("input recieved")
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        const formattedToday = mm + '/' + dd + '/' + yyyy;


    switch(msg.content){
        case '!archive':
            msg.reply('are you sure? (type !confirm to continue)');
            confirm = 1;
            break;

        case '!confirm':
            if(confirm == 1){
                channelList[msg.guild.id].forEach(async channel=> {
                    let $messagelist = [];
                    // channel.messages.fetch({ limit: 1 }).then(messages => {
                    //     lastMessage = messages.first();
                    //     if (!lastMessage.author.bot) {
                    //     // The author of the last message wasn't a bot
                    //     console.log(lastMessage.content);
                    //     lastMessage.delete();
                    //     }
                    //     end = 1;
                
                     channel.clone({
                        "name": channel.name + ` ${formattedToday}`
                     }).then(async newchannel=>{
                        const everyone = msg.guild.roles.everyone
                        // newchannel.overwritePermissions(newchannel.guild.roles.everyone, { ViewChannel: false });
                        newchannel.updateOverwrite(everyone, {
                            VIEW_CHANNEL: false
                          })
                        newchannel.updateOverwrite(msg.author, {
                            VIEW_CHANNEL: true
                          })
                
                            let message = await channel.messages
                            .fetch({ limit: 1 })
                            .then(messagePage => (messagePage.size === 1 ? messagePage : null));

                            console.log(message.content);

                            while (message) {
                                await channel.messages
                                .fetch({ limit: 100, before: message.id })
                                .then(messagePage => {
                                    messagePage.forEach(msg => {
                                        if(msg.content) $messagelist.push(msg.content)
                                    });
                                    // Update our message pointer to be last message in page of messages
                                    message = 0 < messagePage.size ? messagePage[messagePage.size - 1] : null;
                                    channel.bulkDelete(messagePage)
                                });
                

                            // await channel.messages.fetch().then(async messages=>{
                            //     size = messages.size;
                            //     console.log(size);
                            //     messages.forEach(message=>{
                            //         $messagelist.push(message.content);
                            //     })
                            //     await channel.bulkDelete(messages)
                            // })
                        }
                        $messagelist.reverse().forEach(message=>{
                            console.log(message);
                            newchannel.send(message);
                        })
                    })
                })
                    // .catch(console.error);


                // });
            }else{
                confirm = 0;
            }
            break;

        case "!add":
            if(!channelList[msg.guild.id]) channelList[msg.guild.id] = [];
            if(channelList[msg.guild.id].includes(msg.channel)){
                msg.reply('Channel already in list');
            }else{
                channelList[msg.guild.id].push(msg.channel);
                msg.reply('Channel added');
            }
            break;

        case "!remove":
            var index = channelList[msg.guild.id].indexOf(msg.channel);
            if(index == -1){
                msg.reply('Channel not in list');
            }else{
                channelList[msg.guild.id].splice(index, 1);
                msg.reply('Channel removed');
            }
            break;

        case "!list":
            if(channelList[msg.guild.id].length > 0){
                channelList[msg.guild.id].forEach(channel=>{
                    msg.reply(channel.name);
                })
            }else{
                msg.reply("List is empty");
            }
            break;

        default:
            break;

    }
}
  });

//make sure this line is the last line
bot.login(process.env.TOKEN); //login bot using token