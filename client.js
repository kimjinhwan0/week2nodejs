const http = require('http');
const mongoose = require('mongoose');
const express = require('express');
const ioClient = require('socket.io-client');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const questions = [
    'Name: ',
    'Chat: '
];

let answers = [];

const askQuestion = (index, callback) => {
  if (index === questions.length) {
    callback(answers);
    answers = [];  // Reset answers for the next input
    askQuestion(0, callback); // Ask for the next chat message
    return;
  }

  rl.question(questions[index], (answer) => {
    answers.push(answer);
    askQuestion(index + 1, callback);
  });
};

function main() {
  
  const serverIp = 'http://localhost:3000';
  const socket = ioClient.connect(serverIp, {
    path: '/socket.io'
  });

  socket.on('connect', () => {
    console.log('Connected to server');

    socket.on('previousMessages', (msg) => {
      msg.forEach(item => {
        const chatname = item.username;
        const chatmessage = item.message;
        console.log(`${chatname}: ${chatmessage}`);
      });
    });

    socket.on('chatMessage', (msg) => {
      console.log(msg.username, ":", msg.message);
    });

    askQuestion(0, (answers) => {
      const [username, message] = answers;
      socket.emit('chatMessage', { username, message });
    });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
}

main();
