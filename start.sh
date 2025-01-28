#!/usr/bin/bash

cd /home/dallas/prosaurus/vue/Breakroom

npm run dev &

cd /home/dallas/prosaurus/node

node index.js &

cd /home/dallas/prosaurus/python

. .venv/bin/activate

flask --app hello run --host=0.0.0.0 &