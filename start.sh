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

# Start the vue appp
cd /home/dallas/prosaurus/vue/Breakroom

npm run dev &

# Start the express app
cd /home/dallas/prosaurus/express

npm run devStart &

# Start the pyton app for some reason? (because i'm a fucking moron perhaps?)
cd /home/dallas/prosaurus/python

. .venv/bin/activate

flask --app hello run --host=0.0.0.0 &