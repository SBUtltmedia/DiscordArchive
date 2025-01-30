require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
var channelList = {};
let confirm=1;
client.on('ready', () => {
console.log(`Thunder bot is ready! Tag is ${client.user.tag}`);
});

client.on('messageCreate', (msg) => {
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
            if(confirm == 1 || 1){
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
                    //    await  channel.delete('making room for new channels').then(()=>
                        
                    //     {})
                    //     channel.edit({ name: channel.name })
//   .then(console.log)
//   .catch(console.error);
                        // newchannel.overwritePermissions(newchannel.guild.roles.everyone, { ViewChannel: false });
                   //     await channel
//   .permissionOverwrites.edit(everyone, { VIEW_CHANNEL: false })
// await channel
//   .permissionOverwrites.edit(msg.author, { VIEW_CHANNEL: true })
                        // newchannel.updateOverwrite(everyone, {
                        //     VIEW_CHANNEL: false
                        //   })
                        // newchannel.updateOverwrite(msg.author, {
                        //     VIEW_CHANNEL: true
                        //   })
                
                            let message = await channel.messages
                            .fetch({ limit: 1 })
                            .then(messagePage => (messagePage.size === 1 ? messagePage : null));

                            console.log(message.content);

                            while (message) {
                                await channel.messages
                                .fetch({ limit: 100, before: message.id })
                                .then(messagePage => {
                                    messagePage.forEach(msg => {
                                        msg.delete();
                                        if(msg.content) $messagelist.push(msg.content)
                                    });
                                    // Update our message pointer to be last message in page of messages
                                    message = 0 < messagePage.size ? messagePage[messagePage.size - 1] : null;
                                    channel.bulkDelete(messagePage,true)
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

client.login(process.env.TOKEN);