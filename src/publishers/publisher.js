const amqp = require("amqplib");
async function connect() {
 const msgBuffer = Buffer.from(JSON.stringify({ number: 10 }));
 try {
   const connection = await amqp.connect("amqp://localhost:5672");
   const channel = await connection.createChannel();
   await channel.assertQueue("publiser");
   
   await channel.assertQueue("consumer01");
   await channel.sendToQueue("consumer01", msgBuffer);

   await channel.assertQueue("consumer02");
   await channel.sendToQueue("consumer02", msgBuffer);


   console.log("Sending message to consumer01 and consumer02 queues");
   await channel.close();
   await connection.close();
 } catch (ex) {
   console.error(ex);
 }
}
connect();