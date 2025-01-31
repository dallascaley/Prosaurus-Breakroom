#!/usr/bin/bash

# First, lets kill all the running processes
PID=$(lsof -t -i:3000)
if [ -n "$PID" ]; then
  kill -9 $PID
  echo "Process running on port 3000 has been killed."
else
  echo "No process is running on port 3000."
fi

PID=$(lsof -t -i:5000)
if [ -n "$PID" ]; then
  kill -9 $PID
  echo "Process running on port 5000 has been killed."
else
  echo "No process is running on port 5000."
fi

PID=$(lsof -t -i:5173)
if [ -n "$PID" ]; then
  kill -9 $PID
  echo "Process running on port 5173 has been killed."
else
  echo "No process is running on port 5173."
fi

# Then lets start them all up again...

cd /home/dallas/prosaurus/vue/Breakroom

npm run dev &

cd /home/dallas/prosaurus/node

nodemon index.js &

cd /home/dallas/prosaurus/python

. .venv/bin/activate

flask --app hello run --host=0.0.0.0 &