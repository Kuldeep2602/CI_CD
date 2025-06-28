ssh -i "pem file" ubuntu@ipadressofinstance
mkdir test 
cd test
sudo apt update
sudo apt install nodejs

sudo npm i -g pm2
pm2 start app.js

lsof : gives you the processed
lsof -i :3000

pm2 examples

nodemon is in dev when


cat ~/.ssh/id_rsa

cat ~/.ssh/id_rsa.pub

test.yml
name: SSH Workflow

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: SSH into server
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.HOST }}
          username: ubuntu
          key: ${{ secrets.PRIVATE_SSH_KEY }}
          script: |
            echo "Connected successfully!"
            whoami
            pwd



View your private key with this command:

bash
cat deploy_key


2. Add the Public Key to Your Server
Add the public key to the authorized_keys file on your target server:

bash
cat deploy_key.pub >> ~/.ssh/authorized_keys


3.replace server ip
