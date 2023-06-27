const amqp = require("amqplib");
async function connect02() {
 try {
   const connection = await amqp.connect("amqp://localhost:5672");
   const channel = await connection.createChannel();
   await channel.assertQueue("consumer02");
   channel.consume("consumer02", message => {
     const input = JSON.parse(message.content.toString());
     console.log(`CONSUMER02 Received number: ${input.number}`);
     channel.ack(message);
   });
   console.log(`Waiting for messages...`);
 } catch (ex) {
   console.error(ex);
 }
}
connect02();